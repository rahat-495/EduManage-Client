
import { Outlet } from "react-router-dom";
import Nav from "../Shared/Navbar/Nav";
import Footer from "../Shared/Footer/Footer";

const MyClassesRoot = () => {
    return (
        <div className="overflow-x-hidden lg:overflow-visible">

            <div className="sticky top-0 z-50 bg-opacity-0 backdrop-blur-md">
                <Nav/>
            </div>

            <div className="max-w-[1440px] min-h-[70vh] mx-auto overflow-hidden">
                <Outlet/>
            </div>

            <div className="">
                <Footer/>
            </div>
        </div>
    );
};

export default MyClassesRoot;
