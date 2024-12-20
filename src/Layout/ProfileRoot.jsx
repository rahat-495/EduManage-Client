
import { Outlet } from "react-router-dom";
import ProfileNav from "../Shared/ProfileNav/ProfileNav";
import Nav from "../Shared/Navbar/Nav";
import Footer from "../Shared/Footer/Footer";

const ProfileRoot = () => {
    return (
        <div className="overflow-x-hidden lg:overflow-visible">
            
            <div className="sticky top-0 z-50 bg-opacity-0 backdrop-blur-md">
                <Nav/>
            </div>

            <div className="flex-col mx-3 lg:flex-row flex items-start justify-between my-14 gap-6 max-w-[1440px] lg:mx-auto overflow-hidden">

                <div className="w-full lg:w-80">
                    <ProfileNav/>
                </div>

                <div className="bg-[#170F21] w-full min-h-[60vh] rounded-lg px-5 py-10">
                    <Outlet/>
                </div>

            </div>

            <div className="">
                <Footer/>
            </div>
            
        </div>
    );
};

export default ProfileRoot;
