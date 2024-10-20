
import { Outlet } from "react-router-dom";
import Nav from "../Shared/Navbar/Nav";
import MessagesSiteNav from "../Messages/Components/MessagesSiteNav";

const MessageRoot = () => {
    return (
        <div className="min-h-screen overflow-x-hidden lg:overflow-visible">
            
            <div className="sticky top-0 z-50 bg-opacity-0 backdrop-blur-md">
                <Nav/>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between my-14 max-w-[1440px] gap-1 mx-3 lg:mx-auto overflow-hidden">

                <div className="lg:min-h-[80vh]">
                    <MessagesSiteNav/>
                </div>

                <div className="bg-[#170F21] w-full min-h-[80vh] rounded-lg lg:rounded-l-none lg:rounded-r-lg">
                    <Outlet/>
                </div>

            </div>
            
        </div>
    );
};

export default MessageRoot;
