
import { Outlet } from "react-router-dom";
import Nav from "../Shared/Navbar/Nav";
import Footer from "../Shared/Footer/Footer";
import MessagesSiteNav from "../Messages/Components/MessagesSiteNav";

const MessageRoot = () => {
    return (
        <div className="">
            
            <div className="sticky top-0 z-50 bg-opacity-0 backdrop-blur-md">
                <Nav/>
            </div>

            <div className="flex items-start justify-between my-14 max-w-[1440px] gap-1 mx-auto overflow-hidden">

                <div className="">
                    <MessagesSiteNav/>
                </div>

                <div className="bg-[#170F21] w-full min-h-[80vh] rounded-r-lg">
                    <Outlet/>
                </div>

            </div>

            <div className="">
                <Footer/>
            </div>
            
        </div>
    );
};

export default MessageRoot;
