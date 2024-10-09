
import { CardBody, CardFooter, Checkbox, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from 'axios' ;
import useAuth from "../../Hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UAParser from 'ua-parser-js';
import { setUser } from "../../Redux/userSlice";
import { useDispatch } from "react-redux";

const key = import.meta.env.VITE_IMAGE_HOISTING_API_KEY;
const apiUrl = `https://api.imgbb.com/1/upload?key=${key}`;

const SignUpC = ({remember , setRemember}) => {

  const dispatch = useDispatch() ;
  const axiosSecure = useAxiosSecure() ;
  const {createUser , setProfile} = useAuth() ;
  const navigate = useNavigate() ;
  const [eye , setEye] = useState(false) ;
  const [errorText , setErrorText] = useState('') ;
  const [passInt, setPassInt] = useState("");
  const parser = new UAParser();
  const deviceInfo = parser.getResult();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const email = form.email.value;
    const pass = form.password.value;
    
    const formData = new FormData();
    formData.append("image", image);

    const { data: imageUrl } = await axios.post(apiUrl, formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    if (remember && imageUrl?.success) {
      if (passInt.length >= 6) {
        if (/[!@#$%^&*(),.?":{}|<>]/.test(passInt)) {
          if (/[a-z]/.test(passInt) && /[A-Z]/.test(passInt)) {
            createUser(email, pass)
              .then((result) => {
                console.log(result.user);
                toast.success("Register Success Fully !");
                form.reset();

                const userInfo = {
                  name ,
                  email ,
                  studentUid : result?.user?.uid ,
                  image: imageUrl?.data?.display_url,
                  role : "student" ,
                  isBlock : false ,
                  isFired : false ,
                  isJoinedASchool : '' ,
                  isJoinedAGrade : '' ,
                  applyForTeacher : "No" ,
                  schools : [] ,
                  classes : [] ,
                  removedDevice : [] ,
                  devicesInfo : [
                    {
                      deviceName :  deviceInfo?.os?.name +' '+deviceInfo?.os?.version   ,
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
                  navigate("/");
                }, 1000);

                setProfile(name, imageUrl?.data?.display_url);
              })
              .catch((error) => {
                console.log(error.message);
                if (
                  error.message.includes(
                    "Firebase: Error (auth/email-already-in-use)."
                  )
                ) {
                  toast.error("This Email Already in Use !");
                }
              });
          } else {
            toast.warning(
              "Your Password Have UpperCase or LowerCase Charecter's !"
            );
          }
        } else {
          toast.warning("Your password must have a specail charecter !");
        }
      } else {
        toast.warning("Your Password must have 6 Charecter's !");
      }
    } else {
      setErrorText("Please Accept Our Turms & Condition !");
    }
  };

  return (
    <div>
      <CardBody className="flex flex-col px-0 gap-4">
      <form onSubmit={handleSubmit} className="gap-3 flex flex-col">
            <Input className="h-full" required type="text" name="name" label="Name" size="lg" />

            <Input required type="email" name="email" label="Email" size="lg" />

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
                  onChange={(e) => setPassInt(e.target.value)}
                  type={eye ? "text" : "password"}
                  name="password"
                  label="Password"
                  size="lg"
                  required
                />
            </div>
            
            <div className="border bg-transparent border-[#B0BEC5] p-0 rounded-md">
              <input
                className="file-input bg-transparent cursor-pointer w-full"
                type="file"
                name="image"
                id=""
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

              <div className="col-span-2">
                <input  
                  type="submit"
                  className="w-full btn text-gray-800 hover:text-white btn-outline hover:bg-[#393939]"
                  value={"Sign Up"}
                />
              </div>
          </form>
      </CardBody>

      <CardFooter className="pt-0">
        <Typography variant="small" className="mt-6 flex justify-center">
          Already have an account?
          <Link
            className="text-blue-gray-900 font-bold mx-1 hover:underline"
            to={"/login"}
          >
            Login
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

export default SignUpC;
