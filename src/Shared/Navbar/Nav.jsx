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
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import NavLists from "../../Components/NavLists/Navlists";
import ProfileLinks from "../../Components/ProfileLinks/ProfileLinks";
import messageLogo from "../../../public/images/messageLogo.png";
import { useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";

const Nav = () => {
  const { pathname } = useLocation();
  const { user, logOut } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const userData = useSelector((state) => state?.user);

  useEffect(() => {
    if (pathname.includes("/profile")) {
      document.body.style.backgroundColor = "#010313";
    } else if (pathname.includes("/addmissionForm")) {
      document.body.style.backgroundColor = "#010313";
    } else if (pathname.includes("/message")) {
      document.body.style.backgroundColor = "#010313";
    } else {
      document.body.style.backgroundColor = "";
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className={`sticky top-0 z-10 mx-auto max-w-[1440px]`}>
      <div className="sticky top-0 z-10">
        <Navbar className="sticky top-0 z-10 h-max max-w-full bg-opacity-0 backdrop-blur-md shadow-none border-none rounded-none px-2 py-1 lg:px-0 lg:py-2">
          <div className="flex items-center justify-between text-white">
            <Typography
              as="a"
              className="mr-4 play font-semibold cursor-pointer py-1.5 hidden lg:flex"
            >
              <span className="gro text-xl font-medium"></span> EduManage
            </Typography>

            <div className="flex items-center justify-between w-full gap-4 gro lg:justify-normal lg:w-auto">
              <div className="mr-4 hidden lg:block">
                <NavLists />
              </div>

              <div className="flex items-center gap-x-1">
                {user ? (
                  <div className="flex items-center justify-between">
                    <Menu>
                      {pathname?.includes("/message") ? (
                        <></>
                      ) : (
                        <Link to={"/message"}>
                          <Tooltip
                            placement="bottom-center"
                            content={
                              pathname?.includes("/message") ? "" : "Chats"
                            }
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: -25 },
                            }}
                            className={"bg-transparent"}
                          >
                            <Avatar
                              className="cursor-pointer w-[42px] h-[42px] rounded-full hidden lg:flex lg:mr-3"
                              src={messageLogo}
                            />
                          </Tooltip>
                        </Link>
                      )}

                      <MenuHandler>
                        <Avatar
                          className="cursor-pointer w-[40px] border border-teal-500 h-[40px] rounded-full hidden lg:flex"
                          src={
                            userData?.image ? userData?.image : user?.photoURL
                          }
                        />
                      </MenuHandler>

                      <MenuList className="p-0 -ml-24 bg-transparent border-none rounded-2xl">
                        <div className="border border-purple-500 menu p-2 shadow bg-[#0F172A] rounded-box w-60">
                          <Avatar
                            className="cursor-pointer w-[45px] border border-teal-500 h-[45px] rounded-full hidden lg:flex mx-auto"
                            src={
                              userData?.image ? userData?.image : user?.photoURL
                            }
                          />
                          <h1 className="mx-1 text-[#f5f6fa] p-1 text-center rounded-md font-semibold">
                            {user?.displayName}
                          </h1>
                          <h1 className="mx-1 text-[#f5f6fa] p-1 text-center rounded-md font-semibold">
                            {user?.email}
                          </h1>
                          <h1 className="mx-1 text-[#f5f6fa] p-1 text-center rounded-md font-semibold">
                            {user?.uid.slice(0, 20) + "..."}
                          </h1>
                          <Link
                            to={"/profile"}
                            className="rounded-lg py-2 text-center border border-teal-500 text-white hover:border-purple-500 bg-gradient-to-r from-purple-500 to-teal-500 duration-1000"
                          >
                            View Profile
                          </Link>

                          <ProfileLinks />

                          <Button
                            onClick={() => logOut()}
                            className="border flex items-center justify-center gap-3 border-teal-500 text-white hover:border-purple-500 bg-gradient-to-r from-purple-500 to-teal-500 duration-500"
                          >
                            Log Out <MdLogout className="text-lg font-bold" />
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
                className="-ml-2 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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

              {user ? (
                  <Menu>

                    {/* {pathname?.includes("/message") ? (
                      <></>
                    ) : (
                      <Link to={"/message"}>
                        <Tooltip
                          placement="bottom-center"
                          content={
                            pathname?.includes("/message") ? "" : "Chats"
                          }
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: -25 },
                          }}
                          className={"bg-transparent"}
                        >
                          <Avatar
                            className="cursor-pointer w-[42px] h-[42px] rounded-full hidden lg:flex lg:mr-3"
                            src={messageLogo}
                          />
                        </Tooltip>
                      </Link>
                    )} */}

                    <MenuHandler>
                      <Avatar
                        className="cursor-pointer w-[40px] border border-teal-500 h-[40px] rounded-full flex ml-auto mr-2 lg:hidden"
                        src={userData?.image ? userData?.image : user?.photoURL}
                      />
                    </MenuHandler>

                    <MenuList className="p-0 -ml-24 bg-transparent border-none rounded-2xl">
                      <div className="border border-purple-500 menu p-2 shadow bg-[#0F172A] rounded-box w-60">
                        <Avatar
                          className="cursor-pointer w-[45px] border border-teal-500 h-[45px] rounded-full flex lg:hidden mx-auto"
                          src={
                            userData?.image ? userData?.image : user?.photoURL
                          }
                        />
                        <h1 className="mx-1 text-[#f5f6fa] p-1 text-center rounded-md font-semibold">
                          {user?.displayName}
                        </h1>
                        <h1 className="mx-1 text-[#f5f6fa] p-1 text-center rounded-md font-semibold">
                          {user?.email}
                        </h1>
                        <h1 className="mx-1 text-[#f5f6fa] p-1 text-center rounded-md font-semibold">
                          {user?.uid.slice(0, 20) + "..."}
                        </h1>
                        <Link
                          to={"/profile"}
                          className="rounded-lg py-2 text-center border border-teal-500 text-white hover:border-purple-500 bg-gradient-to-r from-purple-500 to-teal-500 duration-1000"
                        >
                          View Profile
                        </Link>

                        <ProfileLinks />

                        <Button
                          onClick={() => logOut()}
                          className="border flex items-center justify-center gap-3 border-teal-500 text-white hover:border-purple-500 bg-gradient-to-r from-purple-500 to-teal-500 duration-500"
                        >
                          Log Out <MdLogout className="text-lg font-bold" />
                        </Button>
                      </div>
                    </MenuList>
                  </Menu>
              ) : (
                <Typography
                  as="a"
                  className="ml-auto mr-1 play text-base font-medium cursor-pointer py-1.5 flex lg:hidden"
                >
                  EduManage
                </Typography>
              )}
            </div>
          </div>

          <MobileNav open={openNav} className="px-2">
            <NavLists />

            {user ? (
              <div className=""></div>
            ) : (
              <div className="flex items-center gap-3 w-full justify-between">
                <Link to={"/login"} className="w-full">
                  <Button
                    variant="text"
                    size="sm"
                    className="flex w-full items-center justify-center lg:hidden border border-[#FFFFFF] text-white hover:shadow-none hover:bg-transparent"
                  >
                    Login
                  </Button>
                </Link>

                <Link to={"/signUp"} className="w-full">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="flex w-full items-center justify-center lg:hidden border border-[#282828] hover:shadow-none"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </MobileNav>
        </Navbar>
      </div>
    </div>
  );
};

export default Nav;
