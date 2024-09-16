
import { Outlet } from "react-router-dom";
import Nav from "../Shared/Navbar/Nav";
import Footer from "../Shared/Footer/Footer";

const Root = () => {
    return (
        <div className="">

            <div className="sticky top-0 z-50 bg-opacity-0 backdrop-blur-md">
                <Nav/>
            </div>

            <div className="max-w-[1440px] mx-auto overflow-hidden">
                <Outlet/>
            </div>

            <div className="">
                <Footer/>
            </div>

        </div>
    );
};

export default Root;
