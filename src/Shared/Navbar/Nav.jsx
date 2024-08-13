
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import NavLinks from "../../Components/NavLinks/NavLinks";

const Nav = () => {

  const { user , logOut } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const [dropdown , setDropDown] = useState(false) ;
  const {pathname} = useLocation() ;

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  
  const navList = (
    <ul className="mt-2 gro mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" className="p-1 font-normal gro">
        <NavLink
          to={"/"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "font-semibold underline transition-all ease-in-out duration-300" : ""
          }
        >
          <NavLinks path={'/'} label={"Home"}/>
        </NavLink>
      </Typography>

      <Typography as="li" onMouseEnter={() => setDropDown(!dropdown)} onMouseLeave={() => setDropDown(!dropdown)} className={`p-1 font-normal gro dropdown dropdown-hover ${pathname === '/addClass' && "underline font-semibold"}`}>

        <ul tabIndex={0} className="dropdown-content mt-10 menu bg-[#1D232A] rounded-box z-[10] w-52 border flex flex-col gap-3">
          <Link to={'/addSchool'} className={`gro font-semibold px-3 py-2 rounded-lg ${pathname === "/addSchool" ? "bg-white" : "hover:text-black hover:bg-white text-white"}`}>Add School</Link>
          <Link to={'/addClass'} className={`gro font-semibold px-3 py-2 rounded-lg ${pathname === "/addClass" ? "bg-white" : "hover:text-black hover:bg-white text-white"}`}>Add Class</Link>
        </ul>

        <NavLink
          to={'/addSchool'}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "font-semibold underline transition-all ease-in-out duration-300" : ""
          }
        >
          
          <div className="flex items-center justify-center gap-1 link mt-2">
            <NavLinks path={'/addSchool'} label={"Add"}/>
            {
              dropdown ? <FaAngleUp /> : <FaAngleDown />
            }
          </div>

        </NavLink>
      </Typography>

      <Typography as="li" className="p-1 font-normal gro">
        <NavLink
          to={"/contact-us"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "font-semibold underline transition-all ease-in-out duration-300" : ""
          }
        >
          <NavLinks path={'/contact-us'} label={"Contact Us"}/>
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <div className="sticky top-0 z-10 mx-auto max-w-[1440px]">
      <div className="sticky top-0 z-10">
        <Navbar className="sticky top-0 z-10 h-max max-w-full bg-[#D1D3D6] shadow-none border-none rounded-none px-4 py-2 lg:px-0 lg:py-2">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              className="mr-4 play font-semibold cursor-pointer py-1.5"
            >
              <span className="gro text-xl font-medium"></span> EduManage
            </Typography>
            <div className="flex items-center gap-4 gro">
              <div className="mr-4 hidden lg:block">{navList}</div>

              <div className="flex items-center gap-x-1">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="dropdown dropdown-hover z-30">
                      <div
                        tabIndex={0}
                        role="button"
                        className="m-1 hidden lg:flex"
                      >
                        <img
                          className="w-[45px] border border-teal-500 h-[45px] rounded-full hidden lg:flex"
                          src={user?.photoURL}
                          alt=""
                        />
                      </div>

                      <div
                        tabIndex={0}
                        className="dropdown-content z-50 border border-teal-500 menu p-2 shadow bg-[#353b48] rounded-box w-60"
                      >
                        <img
                          className="w-[45px] border border-teal-500 h-[45px] rounded-full hidden lg:flex mx-auto mt-2 mb-1"
                          src={user?.photoURL}
                          alt=""
                        />
                        <h1 className="mx-1 text-[#f5f6fa] p-1 text-center rounded-md font-semibold">
                          {user?.displayName}
                        </h1>
                        <h1 className="mx-1 text-[#f5f6fa] p-1 text-center rounded-md font-semibold">
                          {user?.email}
                        </h1>
                        <h1 className="mx-1 text-[#f5f6fa] p-1 text-center rounded-md font-semibold">
                          {
                            user?.uid.slice(0,20) + "..."
                          }
                        </h1>
                        <Link to={'/profile'} className="rounded-lg py-2 text-center border border-teal-500 text-white hover:border-purple-500 bg-gradient-to-r from-purple-500 to-teal-500 duration-1000">View Profile</Link>

                        <div className="my-5 flex flex-col gap-1">

                          <NavLink
                            to={"/yourSchools"}
                              className={({ isActive, isPending }) =>
                              isPending ? "" : isActive ? "font-bold border-b border-teal-500 transition-all text-teal-500 ease-in-out duration-300" : "text-white border-b hover:border-b-teal-500"
                            }
                            >
                            <Typography as="p" className="p-1 font-normal hover:text-teal-500 hover:border-b-teal-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro ">
                              Your Schools
                            </Typography>
                          </NavLink>

                          <NavLink
                            to={"/yourClasses"}
                              className={({ isActive, isPending }) =>
                              isPending ? "" : isActive ? "font-bold border-b border-teal-500 transition-all text-teal-500 ease-in-out duration-300" : "text-white border-b hover:border-b-teal-500"
                            }
                            >
                            <Typography as="p" className="p-1 font-normal hover:text-teal-500 hover:border-b-teal-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro ">
                              Your Classes
                            </Typography>
                          </NavLink>

                        </div>

                        <Button onClick={() => logOut()} className="border border-teal-500 text-white hover:border-purple-500 bg-gradient-to-r from-purple-500 to-teal-500 duration-500">
                          Log Out
                        </Button>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link to={"/login"}>
                      <Button
                        variant="text"
                        size="sm"
                        className="hidden lg:inline-block border border-[#282828] hover:shadow-none hover:bg-transparent"
                      >
                        Login
                      </Button>
                    </Link>

                    <Link to={"/signUp"}>
                      <Button
                        variant="gradient"
                        size="sm"
                        className="hidden lg:inline-block border border-[#282828] hover:shadow-none"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <MobileNav open={openNav}>
            {navList}
            <div className="flex items-center gap-x-1">
              <Button fullWidth variant="text" size="sm" className="">
                <span>Log In</span>
              </Button>
              <Button fullWidth variant="gradient" size="sm" className="">
                <span>Sign in</span>
              </Button>
            </div>
          </MobileNav>
        </Navbar>
      </div>
    </div>
  );
};

export default Nav;
