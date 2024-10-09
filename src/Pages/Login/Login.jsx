
import {
    Card,
    CardHeader,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import LoginC from "../../Components/LoginComponents/LoginC";
import SignUpC from "../../Components/SignUpComponents/SignUpC";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const location = useLocation() ;
    const [tabs , setTabs] = useState('login') ;
    const [remember , setRemember] = useState(false) ;

    const data = [
        {
          label: "Login",
          value: "login",
        },
        {
          label: "Sign Up",
          value: "signUp",
        }
    ];

    return (
        <div className="mx-auto flex items-center justify-center flex-col min-h-screen">
            <div className="bg-white rounded-lg my-10">
                
                <Card className="w-96 gro pt-1 shadow-none border my-20 lg:my-0">
            
                <Tabs value="login" className="">

                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-10 mx-4 rounded-lg mt-5 grid h-28 place-items-center"
                    >
                        <Typography className="capitalize gro" variant="h3" color="white">
                            {
                                tabs
                            }
                        </Typography>
                    </CardHeader>

                    <TabsHeader className="mx-4 gro bg-[#000000]">
                        {data.map(({ label, value }) => (
                            <Tab key={value} value={value} onClick={() => setTabs(value)}>
                                <p className={`gro font-semibold ${tabs !== value ? "text-gray-50" : "text-gray-900"}`}>{label}</p>
                            </Tab>
                        ))}
                    </TabsHeader>

                    <TabsBody>
                        {data.map(({ value }) => (
                            <TabPanel key={value} value={value}>
                                {
                                    value === 'login' ?
                                    <LoginC location={location}/> : <SignUpC setRemember={setRemember} remember={remember}/>
                                }
                            </TabPanel>
                        ))}
                    </TabsBody>

                </Tabs>
        
                </Card>
            </div>
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

export default Login;
