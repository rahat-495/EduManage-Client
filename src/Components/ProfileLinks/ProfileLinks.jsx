
import { Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileLinks = () => {

  const currentUserData = useSelector(state => state.user) ;
  const role = useSelector(state => state?.user?.role) ;

  if(role === 'admin'){
    return (
      <div className="my-5 flex flex-col gap-1">
        <NavLink
          to={"/yourSchools"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-semibold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
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
              ? "font-semibold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
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
          to={"/yourGrades"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-semibold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
              : "text-white border-b hover:border-b-purple-500"
          }
        >
          <Typography
            as="p"
            className="p-1 font-normal hover:text-purple-500 hover:border-b-purple-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro "
          >
            Your Grades
          </Typography>
        </NavLink>

        <NavLink
          to={"/yourSchools"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-semibold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
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
          to={"/allStudents"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-semibold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
              : "text-white border-b hover:border-b-purple-500"
          }
        >
          <Typography
            as="p"
            className="p-1 font-normal hover:text-purple-500 hover:border-b-purple-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro "
          >
            All Students
          </Typography>
        </NavLink>
        
        <NavLink
          to={"/school&GradesAddReqs"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-semibold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
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

        {
          currentUserData?.isjoined && 
          <>
            <NavLink
              to={"/myClasses"}
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "font-semibold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
                  : "text-white border-b hover:border-b-purple-500"
              }
            >
              <Typography
                as="p"
                className="p-1 font-normal hover:text-purple-500 hover:border-b-purple-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro "
              >
                My Classes
              </Typography>
            </NavLink>

            <NavLink
              to={"/classMates"}
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "font-semibold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
                  : "text-white border-b hover:border-b-purple-500"
              }
            >
              <Typography
                as="p"
                className="p-1 font-normal hover:text-purple-500 hover:border-b-purple-500 pb-3 px-3 duration-300 ease-in-out cursor-pointer text-sm gro "
              >
                Class Mates
              </Typography>
            </NavLink>
          </>
        }
        
        <NavLink
          to={"/myAddmissionRequests"}
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "font-semibold border-b border-purple-500 transition-all text-purple-500 ease-in-out duration-300"
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

      </div>
    );
  }

  return (
    <div className="my-5 flex flex-col gap-1">
    </div>
  );
};

export default ProfileLinks;
