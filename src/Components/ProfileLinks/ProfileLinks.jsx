
import { Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import useRole from "../../Hooks/useRole";

const ProfileLinks = () => {

  const {role} = useRole() ;

  if(role === 'admin'){
    return (
      <div className="my-5 flex flex-col gap-1">
        <NavLink
          to={"/yourSchools"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-bold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
              : "text-white border-b hover:border-b-purple-500"
          }
        >
          <Typography
            as="p"
            className="p-1 font-normal hover:text-purple-500 hover:border-b-purple-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro "
          >
            Your Schools
          </Typography>
        </NavLink>
  
        <NavLink
          to={"/yourClasses"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-bold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
              : "text-white border-b hover:border-b-purple-500"
          }
        >
          <Typography
            as="p"
            className="p-1 font-normal hover:text-purple-500 hover:border-b-purple-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro "
          >
            Your Classes
          </Typography>
        </NavLink>
      </div>
    );
  }

  if(role === 'teacher'){
    return (
      <div className="my-5 flex flex-col gap-1">
        <NavLink
          to={"/yourSchools"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-bold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
              : "text-white border-b hover:border-b-purple-500"
          }
        >
          <Typography
            as="p"
            className="p-1 font-normal hover:text-purple-500 hover:border-b-purple-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro "
          >
            Your Schools
          </Typography>
        </NavLink>
  
        <NavLink
          to={"/yourClasses"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-bold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
              : "text-white border-b hover:border-b-purple-500"
          }
        >
          <Typography
            as="p"
            className="p-1 font-normal hover:text-purple-500 hover:border-b-purple-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro "
          >
            Your Classes
          </Typography>
        </NavLink>
  
        <NavLink
          to={"/school&GradesAddReqs"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-bold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
              : "text-white border-b hover:border-b-purple-500"
          }
        >
          <Typography
            as="p"
            className="p-1 font-normal hover:text-purple-500 hover:border-b-purple-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro "
          >
            Addmission Requets
          </Typography>
        </NavLink>
      </div>
    );
  }

  if(role === 'student'){
    return (
      <div className="my-5 flex flex-col gap-1">
        <NavLink
          to={"/myAddmissionRequests"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-bold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
              : "text-white border-b hover:border-b-purple-500"
          }
        >
          <Typography
            as="p"
            className="p-1 font-normal hover:text-purple-500 hover:border-b-purple-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro "
          >
            My Addmission Requests
          </Typography>
        </NavLink>
  
        <NavLink
          to={"/yourClasses"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-bold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
              : "text-white border-b hover:border-b-purple-500"
          }
        >
          <Typography
            as="p"
            className="p-1 font-normal hover:text-purple-500 hover:border-b-purple-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro "
          >
            Your Classes
          </Typography>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="my-5 flex flex-col gap-1">
    </div>
  );
};

export default ProfileLinks;
