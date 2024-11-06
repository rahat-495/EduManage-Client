
import { Outlet } from "react-router-dom";
import Nav from "../Shared/Navbar/Nav";
import Footer from "../Shared/Footer/Footer";

const MyClassesRoot = () => {
    return (
        <div className="overflow-x-hidden lg:overflow-visible">

            <div className="sticky top-0 z-50 bg-opacity-0 backdrop-blur-md">
                <Nav/>
            </div>

            <div className="max-w-[1440px] min-h-[70vh] mx-auto overflow-hidden lg:mb-10">
                <div className="lg:flex lg:items-start lg:justify-between gap-3 h-full">

                    <div className="w-full h-[60vh] rounded bg-[#010313]">
                        <Outlet />
                    </div>

                    <div className="bg-[#010313] w-[550px] h-[70vh] max-h-[100vh] rounded p-3 flex flex-col gap-3 overflow-y-auto scrollbar-thin">
                        <div className="h-[70vh] grid grid-rows-2 gap-1">
                            
                        </div>
                    </div>

                </div>
            </div>

            <div className="">
                <Footer/>
            </div>
        </div>
    );
};

export default MyClassesRoot;
