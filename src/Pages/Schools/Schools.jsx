
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Schools = () => {
  
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [schoolId , setSchoolId] = useState('') ;
  
    const { data : schoolsData } = useQuery({
        queryKey: ["allSchools", user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/allSchools`);
          return data;
        },
    });
  
    const { data : classesData } = useQuery({
        queryKey : ['classesData' , schoolId] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/classesData?schoolId=${schoolId}`) ;
            return data ;
        }
    })

  return (
    <div className="min-h-[70vh] mx-3 mb-10 lg:mb-0 lg:mx-0">
      <h1 className="gro text-4xl text-center font-semibold my-10">
        All Schools
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {schoolsData?.map((school) => (
          <div
            key={school?._id}
            onMouseEnter={() => setSchoolId(school?._id)}
            className="flex flex-col items-center justify-center bg-white rounded-lg gap-3 py-6 px-6"
          >
            <img src={school?.schoolLogo} alt="" className="h-52 w-52" />

            <div className="gro flex flex-col items-center justify-center lg:flex-row w-full lg:justify-between lg:items-start gap-2 mt-2">

              <div className="flex flex-col items-start gap-2">
                <h1 className="text-lg text-black font-semibold mx-auto lg:mx-0">
                  Name : {school?.schoolName}
                </h1>
                <p className="text-black font-semibold mx-auto lg:mx-0">
                  School Code : {school?.schoolCode}
                </p>
                <p className="text-black font-semibold mx-auto lg:mx-0">
                  Postal Code : {school?.postalCode}
                </p>
                <p className="text-black font-semibold mx-auto lg:mx-0">
                  Address :{" "}
                  {school?.address.length > 21
                    ? school?.address.slice(0, 18) + "..."
                    : school?.address}
                </p>
                <p className="text-black font-semibold capitalize mx-auto lg:mx-0">
                  School Phone : <span className="">{school?.phone}</span>
                </p>
                <p className="text-black font-semibold mx-auto lg:mx-0">
                  School Type : {school?.schoolType}
                </p>
              </div>

              <div className="flex flex-col items-start gap-2">

                <p className="text-black font-semibold capitalize mx-auto lg:mx-0">
                  Principal Name :{" "}
                  <span className="play text-sm">{school?.principalName}</span>
                </p>

                <p className="text-black font-semibold capitalize mx-auto lg:mx-0">
                  Principal Contact :{" "}
                  <span className="play text-sm">
                    {school?.principalContact}
                  </span>
                </p>

                <p className="text-black font-semibold mx-auto lg:mx-0">Id : {school?._id}</p>

                <div className="text-black font-semibold flex items-center justify-between mx-auto lg:mx-0">Grade Name :  
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="ml-5">Hover Here</div>
                        <div tabIndex={0} className="dropdown-content bg-[#1D232A] text-white w-max menu -ml-8 border rounded-box z-[10] p-2">
                            {
                              classesData?.length !== 0 ?
                                classesData?.map((classData) => 
                                  <div key={classData?._id}>
                                      <Tooltip placement={'left-end'} content={classData?.gradeName} animate={{
                                          mount: { scale: 1, y: 0 },
                                          unmount: { scale: 0, y: 25 },
                                      }}>
                                          <p className="border mt-1 cursor-pointer rounded p-1"> {classData?.gradeName?.length > 14 ? classData?.gradeName?.slice(0,14) + '...' : classData?.gradeName}</p>
                                      </Tooltip>
                                  </div>
                                ) :
                                "Grades Not available"
                            }
                        </div>
                    </div>
                </div>

                <div className="text-black font-semibold flex items-center gap-5 justify-between mx-auto lg:mx-0">
                    <span>Available Grades :</span>
                    <div className="flex items-center gap-3">
                        {   school?.availableGrades?.length > 0 ? 
                            school?.availableGrades?.map((data , index) => 
                              <Tooltip key={index} content={school?.availableGrades?.join(',')}>
                                <span className="flex items-center justify-center">
                                    {data}
                                    {index < data?.length && ','}
                                </span>
                              </Tooltip>
                            ):
                            (
                              "Grades Unavailable"
                            )
                        }
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Link to={`/addmissionForm/${school?._id}`} className="rounded-lg py-2 px-5 text-center ease-in-out border text-white hover:border-teal-500 capitalize  bg-teal-900 duration-500">Addmission</Link>
                  <Link to={`/viewClasses/${school?._id}`} className="rounded-lg py-2 px-5 text-center ease-in-out border text-white hover:border-teal-500 capitalize  bg-teal-900 duration-500">View Grades</Link>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schools;
