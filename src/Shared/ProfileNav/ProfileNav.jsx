
import { Button, Typography } from "@material-tailwind/react";
import { NavLink, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { SlLocationPin } from "react-icons/sl";
import { useSelector } from "react-redux";
import useAuth from "../../Hooks/useAuth";

const ProfileNav = () => {

    const {pathname} = useLocation() ;
    const userData = useSelector(state => state?.user) ;
    const {user} = useAuth() ;

    const navLinks = <ul className="flex flex-col items-start gap-3">

        <Typography as="li" className={`font-normal gro w-full ${pathname === '/profile/myProfile' && "w-full rounded-r-xl bg-gradient-to-t pl-[2px] from-teal-500 to-purple-500 rounded-l-lg"}`}>
            <NavLink
                to={"myProfile"}
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "rounded-lg bg-gradient-to-r from-[#221b2c] to-[#180F21] px-3 py-3 text-xl duration-400 flex items-center gap-3" : "flex items-center gap-3 text-xl hover:bg-[#231B2C] px-3 rounded-lg py-3 duration-300"
                }
                >
                    {
                        pathname === '/profile/myProfile' ? 
                        <>
                            <CgProfile className="bg-gradient-to-br text-white from-purple-700 to-teal-700 rounded-full text-xl"/> <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-white font-semibold">My Profile</p>
                        </> :
                        <>
                            <CgProfile /> My Profile
                        </>
                    }
            </NavLink>
        </Typography>

        <Typography as="li" className={`font-normal gro w-full ${pathname === '/profile/additional-info' && "w-full rounded-r-xl bg-gradient-to-t pl-[2px] from-teal-500 to-purple-500 rounded-l-lg"}`}>
            <NavLink
                to={"additional-info"}
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "rounded-lg bg-gradient-to-r from-[#221B2C] to-[#180F21] px-3 py-3 text-xl duration-400 flex items-center gap-3" : "flex items-center gap-3 text-xl hover:bg-[#231B2C] px-3 rounded-lg py-3 duration-300"
                }
                >
                    {
                        pathname === '/profile/additional-info' ? 
                        <>
                            <span className="play border rounded-full w-5 flex items-center justify-center text-sm h-5 text-white bg-gradient-to-br from-purple-700 to-teal-700">i</span>
                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-white font-semibold">Additional Info</p>
                        </> :
                        <>
                            <span className="play border rounded-full w-5 flex items-center justify-center text-sm h-5">i</span> Additional Info
                        </>
                    }
            </NavLink>
        </Typography>

        <Typography as="li" className={`font-normal gro w-full ${pathname === '/profile/address' && "w-full rounded-r-xl bg-gradient-to-t pl-[2px] from-teal-500 to-purple-500 rounded-l-lg"}`}>
            <NavLink
                to={"address"}
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "rounded-lg bg-gradient-to-r from-[#221b2c] to-[#180F21] px-3 py-3 text-xl duration-400 flex items-center gap-3" : "flex items-center gap-3 text-xl hover:bg-[#231B2C] px-3 rounded-lg py-3 duration-300"
                }
                >
                    {
                        pathname === '/profile/address' ? 
                        <>
                            <SlLocationPin className="bg-gradient-to-br text-white from-purple-700 to-teal-700 rounded-full text-xl p-[1px]"/> <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-white font-semibold">Address</p>
                        </> :
                        <>
                            <SlLocationPin /> Address
                        </>
                    }
            </NavLink>
        </Typography>

    </ul>

    const handleTeacApply = async () => {
        document.getElementById('my_modal_7').showModal() ;
    }

    return (
        <div className="bg-[#170F21] w-full lg:w-80 min-h-[80vh] rounded-lg px-5 py-10 flex flex-col">
                
            <div className="flex flex-col items-center justify-center gap-5 border-dashed border-b pb-5 border-[#412E4D]">
                <img className="w-20 h-20 rounded-full p-1 border-teal-500 border" src={userData?.image ? userData?.image : user?.photoURL} alt="" />
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-[#C7ABFF] gro font-semibold text-lg text-center">{userData?.name}</h1>
                    <h1 className="text-[#bcacce] gro font-semibold text-base text-center">{userData?.email}</h1>
                    <h1 className="text-[#bcacce] gro font-semibold text-base text-center">{userData?._id}</h1>
                    <Button onClick={() => handleTeacApply()} className="border border-teal-500 w-fit mt-3 capitalize text-sm text-white hover:border-purple-500 bg-gradient-to-r from-purple-500 to-teal-500 duration-500">
                        Apply For Teacher
                    </Button>
                </div>
            </div>
            
            <div className="mt-5">
                { navLinks }
            </div>

            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Hello!</h3>
                    <p className="py-4">This modal works with a hidden checkbox!</p>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>

        </div>
    );
};

export default ProfileNav;
