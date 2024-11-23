
import { Button, CardBody, CardFooter, Checkbox, Input, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { ToastContainer , toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UAParser from 'ua-parser-js';
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/userSlice";

const LoginC = ({location}) => {

    const dispatch = useDispatch() ;
    const axiosSecure = useAxiosSecure() ;
    const { signIn , googleLogin } = useAuth() ;
    const navigate = useNavigate() ;
    const [eye , setEye] = useState(false) ;
    const [remember , setRemember] = useState(false) ;
    const [loading , setLoading] = useState(false) ;
    const [errorText , setErrorText] = useState('') ;
    const parser = new UAParser();
    const deviceInfo = parser.getResult();

    const handleSubmit = async (e) => {
        e.preventDefault() ;
    
        const form = e.target ;
        const email = form.email.value ;
        const pass = form.password.value ;
    
        if(remember){
          setLoading(true) ;
          signIn(email , pass) 
          .then((result) => {
            console.log(result);
            form.reset() ;
            toast.success('Login Success Fully !') ;
            
            setLoading(false) ;
            
            const userInfo = {
              name : result?.user?.displayName ,
              email : result?.user?.email ,
              studentUid : result?.user?.uid ,
              image: result?.user?.photoURL,
              role : "student" ,
              isBlock : false ,
              isFired : false ,
              isjoined : '' ,
              isjoinedModalSeen : false ,
              applyForTeacher : "No" ,
              schools : [] ,
              grades : [] ,
              isOnline : false,
              removedDevice : [] ,
              devicesInfo : [
                {
                  deviceName : deviceInfo?.os?.name +' '+deviceInfo?.os?.version  ,
                  loginDate : new Date().toLocaleDateString() ,
                  loginTime : new Date().toLocaleTimeString() ,
                  loginShift : new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).split(' ')[1] ,
                  isRemoved : false ,
                },
              ],
            }

            axiosSecure.put('/createUser' , userInfo)
            .then((result) => {
              dispatch(setUser(result?.data)) ;
            })
  
            setTimeout(() => {
              if(location.state){
                navigate(location.state) ;
              }
              else{
                navigate('/') ;
              }
            }, 1000);
  
          })
          .catch((error) => {
            console.log(error.message);
            if(error.message.includes('Firebase: Error (auth/invalid-credential).')){
              toast.error("Password Isn't Match") ;
            }
            else if(error.message.includes("Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).")){
              toast.error("This account has been temporarily disabled !") ;
            }
          })
        }
        else{
          setErrorText('Please Accept Our Turms & Condition !') ;
        }
    }

    const handleGoogleLogin = () => {
      setLoading(true) ;
      googleLogin()
      .then( async (result) => {
        
        console.log(result);  
        toast.success('Login Success Fully !') ;
        setLoading(false) ;
        
        const userInfo = {
          name : result?.user?.displayName ,
          email : result?.user?.email ,
          image: result?.user?.photoURL,
          studentUid : result?.user?.uid ,
          role : "student" ,
          isBlock : false ,
          isFired : false ,
          isjoined : '' ,
          isjoinedModalSeen : false ,
          applyForTeacher : "No" ,
          schools : [] ,
          grades : [] ,
          isOnline : false,
          removedDevice : [] ,
          devicesInfo : [
            {
              deviceName :  deviceInfo?.os?.name +' '+deviceInfo?.os?.version  ,
              loginDate : new Date().toLocaleDateString() ,
              loginTime : new Date().toLocaleTimeString() ,
              loginShift : new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).split(' ')[1] ,
              isRemoved : false ,
            },
          ],
        }

        axiosSecure.put('/createUser' , userInfo)
        .then((result) => {
          dispatch(setUser(result?.data)) ;
        })

        setTimeout(() => {
          if(location.state){
            navigate(location.state) ;
          }
          else{
            navigate('/') ;
          }
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      })
    }

  return (
    <div>
      <CardBody className="flex px-0 flex-col">
        <form onSubmit={handleSubmit} className="flex mx-0 flex-col gap-3">
          <Input required name="email" label="Email" size="lg" />
          <div className="relative">
            {eye ? (
              <IoMdEyeOff
                onClick={() => setEye(!eye)}
                className="cursor-pointer text-2xl absolute z-10 top-[10px] right-2"
              />
            ) : (
              <IoMdEye
                onClick={() => setEye(!eye)}
                className="cursor-pointer text-2xl absolute z-10 top-[10px] right-2"
              />
            )}
            <Input
              className="z-0"
              type={eye ? "text" : "password"}
              name="password"
              label="Password"
              size="lg"
              required
            />
          </div>

            <div className="-ml-2.5">
              <Checkbox
                onClick={() => setRemember(!remember)}
                label="Turms & Condition"
              />
            </div>

            <div>
              {remember ? (
                <p></p>
              ) : (
                <p className="text-red-800 font-semibold">{errorText}</p>
              )}
            </div>

          {
            !loading ?
            <input
              type="submit"
              className="w-full btn text-gray-800 hover:text-white btn-outline hover:bg-[#393939]"
              value={"Log In"}
            />:
            <button className="w-full btn text-gray-800 hover:text-white btn-outline hover:bg-[#393939]">
              <span className="loading loading-dots loading-sm"></span>
            </button>
          }

          <div className="divider">OR</div>

          {
            !loading ? 
            <Button onClick={handleGoogleLogin} className="text-lg gap-3 justify-center flex items-center bg-transparent text-black border border-[#343434] hover:shadow-none">
                <FcGoogle  className="text-2xl"/>
                <p className="text-base capitalize">Login With Google</p>
            </Button> :
            <Button className="text-lg gap-3 justify-center flex items-center bg-transparent text-black border border-[#343434] hover:shadow-none">
              <span className="loading loading-dots loading-sm"></span>
            </Button>
          }

        </form>
      </CardBody>

      <CardFooter className="pt-0 mx-0">
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Link
            className="text-blue-gray-900 font-bold mx-1 hover:underline"
            to={"/signUp"}
          >
            Sign Up
          </Link>
        </Typography>
      </CardFooter>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginC;
