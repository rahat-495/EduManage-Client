
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  Avatar,
  MenuList,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link , useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import NavLists from "../../Components/NavLists/Navlists";
import ProfileLinks from "../../Components/ProfileLinks/ProfileLinks";

const Nav = () => {

  const {pathname} = useLocation() ;
  const { user , logOut } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  
  useEffect(() => {
    if(pathname.includes('/profile')){
      document.body.style.backgroundColor = '#010313';
    }
    else if(pathname.includes('/addmissionForm')){
      document.body.style.backgroundColor = '#010313';
    }
    else{
      document.body.style.backgroundColor = '';
    }
  } , [pathname])

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className="sticky top-0 z-10 mx-auto max-w-[1440px]">
      <div className="sticky top-0 z-10">
        <Navbar className="sticky top-0 z-10 h-max max-w-full bg-opacity-0 backdrop-blur-md shadow-none border-none rounded-none px-4 py-2 lg:px-0 lg:py-2">
          <div className="flex items-center justify-between text-white">
            <Typography
              as="a"
              className="mr-4 play font-semibold cursor-pointer py-1.5"
            >
              <span className="gro text-xl font-medium"></span> EduManage
            </Typography>
            <div className="flex items-center gap-4 gro">
              <div className="mr-4 hidden lg:block">
                <NavLists/>
              </div>

              <div className="flex items-center gap-x-1">
                {user ? (
                  <div className="flex items-center justify-between">

                    <Menu>
                      
                      <MenuHandler>
                        <Avatar
                          className="cursor-pointer w-[45px] border border-teal-500 h-[45px] rounded-full hidden lg:flex"
                          src={user?.photoURL}
                        />
                      </MenuHandler>

                      <MenuList className="p-0 -ml-24 bg-transparent border-none rounded-2xl">
                        <div className="border border-purple-500 menu p-2 shadow bg-[#0F172A] rounded-box w-60">
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

                            <ProfileLinks/>

                            <Button onClick={() => logOut()} className="border border-teal-500 text-white hover:border-purple-500 bg-gradient-to-r from-purple-500 to-teal-500 duration-500">
                              Log Out
                            </Button>
                        </div>
                      </MenuList>

                    </Menu>

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
            <NavLists/>
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
