
import { Link, NavLink, useLocation } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks";
import { Menu, MenuHandler, MenuList, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useSelector } from "react-redux";

const NavLists = () => {

  const [dropdown, setDropDown] = useState(false);
  const { pathname } = useLocation();
  const role = useSelector(state => state?.user?.role) ;
  const userData = useSelector(state => state?.user) ;

  if (role === "admin") {
    return (
      <ul className="mt-2 gro mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography as="li" className="p-1 font-normal gro">
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-semibold underline transition-all ease-in-out duration-300"
                : ""
            }
          >
            <NavLinks path={"/"} label={"Home"} />
          </NavLink>
        </Typography>

        <Typography as="li" className="p-1 font-normal gro">
          <NavLink
            to={"/contact-us"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-semibold underline transition-all ease-in-out duration-300"
                : ""
            }
          >
            <NavLinks path={"/contact-us"} label={"Contact Us"} />
          </NavLink>
        </Typography>
      </ul>
    );
  }

  if (role === "teacher") {
    return (
      <ul className="mt-2 gro mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography as="li" className="p-1 font-normal gro">
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-semibold underline transition-all ease-in-out duration-300"
                : ""
            }
          >
            <NavLinks path={"/"} label={"Home"} />
          </NavLink>
        </Typography>

        <Typography
          as="li"
          onMouseEnter={() => setDropDown(!dropdown)}
          onMouseLeave={() => setDropDown(!dropdown)}
          className={`p-1 font-normal gro dropdown dropdown-hover hidden lg:flex ${
            pathname === "/addGrade" && "underline font-semibold"
          }`}
        >
          <ul
            tabIndex={0}
            className="dropdown-content text-black mt-10 menu bg-[#0F172A] rounded-box z-[10] w-52 border flex flex-col gap-3"
          >

            <Link
              to={"/addSchool"}
              className={`gro font-semibold px-3 py-2 rounded-lg ${
                pathname === "/addSchool"
                  ? "bg-white"
                  : "hover:text-black hover:bg-white text-white"
              }`}
            >
              Add School
            </Link>

            <Link
              to={"/addGrade"}
              className={`gro font-semibold px-3 py-2 rounded-lg ${
                pathname === "/addGrade"
                  ? "bg-white"
                  : "hover:text-black hover:bg-white text-white"
              }`}
            >
              Add Grade
            </Link>

          </ul>

          <NavLink
            to={"/addSchool"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-semibold underline transition-all ease-in-out duration-300"
                : ""
            }
          >
            <div className="flex items-center justify-center gap-1 link mt-2">
              <NavLinks path={"/addSchool"} label={"Add"} />
              {dropdown ? <FaAngleUp /> : <FaAngleDown />}
            </div>
          </NavLink>
          
        </Typography>

        <Menu placement="top-start">
          <MenuHandler>
            <Typography
              as="li"
              onMouseEnter={() => setDropDown(!dropdown)}
              onMouseLeave={() => setDropDown(!dropdown)}
              className={`p-1 font-normal gro dropdown dropdown-hover flex lg:hidden ${
                pathname === "/addGrade" && "underline font-semibold"
              }`}
            >
              <NavLink
                to={"/addSchool"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "font-semibold underline transition-all ease-in-out duration-300"
                    : ""
                }
              >
                <div className="flex items-center justify-center gap-1 link mt-2">
                  <NavLinks path={"/addSchool"} label={"Add"} />
                  {dropdown ? <FaAngleUp /> : <FaAngleDown />}
                </div>
              </NavLink>
            </Typography>
          </MenuHandler>

          <MenuList className="flex flex-col gap-3">

              <Link
                to={"/addSchool"}
                className={`gro font-semibold px-3 on w-full py-2 rounded-lg ${
                  pathname === "/addSchool"
                    ? "bg-gray-300 text-black"
                    : "bg-gray-300 text-black"
                }`}
              >
                Add School
              </Link>

              <Link
                to={"/addGrade"}
                className={`gro font-semibold px-3 on w-full py-2 rounded-lg ${
                  pathname === "/addGrade"
                    ? "bg-gray-300 text-black"
                    : "bg-gray-300 text-black"
                }`}
              >
                Add Grade
              </Link>

          </MenuList>

        </Menu>

        <Typography as="li" className="p-1 font-normal gro">
          <NavLink
            to={"/contact-us"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-semibold underline transition-all ease-in-out duration-300"
                : ""
            }
          >
            <NavLinks path={"/contact-us"} label={"Contact Us"} />
          </NavLink>
        </Typography>
      </ul>
    );
  }

  if (role === "student") {
    return (
      <ul className="mt-2 gro mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography as="li" className="p-1 font-normal gro">
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-semibold underline transition-all ease-in-out duration-300"
                : ""
            }
          >
            <NavLinks path={"/"} label={"Home"} />
          </NavLink>
        </Typography>

        <Typography as="li" className="p-1 font-normal gro">
          <NavLink
            to={"/myClasses"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-semibold underline transition-all ease-in-out duration-300"
                : ""
            }
          >
            <NavLinks path={"/myClasses"} label={"My Classes"} />
          </NavLink>
        </Typography>

        {
          !userData?.isjoined &&
          <Typography as="li" className="p-1 font-normal gro">
            <NavLink
              to={"/schools"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-semibold underline transition-all ease-in-out duration-300"
                  : ""
              }
            >
              <NavLinks path={"/schools"} label={"Schools"} />
            </NavLink>
          </Typography>
        }

        <Typography as="li" className="p-1 font-normal gro">
          <NavLink
            to={"/contact-us"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-semibold underline transition-all ease-in-out duration-300"
                : ""
            }
          >
            <NavLinks path={"/contact-us"} label={"Contact Us"} />
          </NavLink>
        </Typography>
      </ul>
    );
  }

  return <ul className="mt-2 gro mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <Typography as="li" className="p-1 font-normal gro">
      <NavLink
        to={"/"}
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-semibold underline transition-all ease-in-out duration-300"
            : ""
        }
      >
        <NavLinks path={"/"} label={"Home"} />
      </NavLink>
    </Typography>

    <Typography as="li" className="p-1 font-normal gro">
      <NavLink
        to={"/contact-us"}
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-semibold underline transition-all ease-in-out duration-300"
            : ""
        }
      >
        <NavLinks path={"/contact-us"} label={"Contact Us"} />
      </NavLink>
    </Typography>
  </ul>;
};

export default NavLists;
