
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";

const YourClasses = () => {

    const axiosSecure = useAxiosSecure() ;
    const {user} = useAuth() ;

    const {data} = useQuery({
        queryKey : ['yourClasses' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/yourClasses?email=${user?.email}`)
            return data ;
        }
    })

    return (
        <div className="min-h-[70vh]">
            
            <h1 className="gro text-4xl text-center my-10">All Classes</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {
                    data?.length > 0 && data?.map((classD) => 
                        <Link to={`/yourClasses/subjects/${classD?._id}`} key={classD?._id}>
                            <Tooltip placement="top-end" content="Click to Show Subjects" animate={{mount: { scale: 1, y: 0 },unmount: { scale: 0, y: 25 },}}>
                                <div className="border grid grid-cols-1 bg-white duration-500 ease-linear hover:border-teal-500 rounded-lg gap-3 py-3 px-3">
                                    <div className="gro flex flex-col items-start gap-2 mt-2">
                                        <h1 className="text-black text-lg font-semibold ">Name : {classD?.className}</h1>
                                        <h1 className="text-black text-lg font-semibold ">Class Teacher : <span className="play text-sm">{classD?.classTeacherName}</span></h1>
                                        <p className="text-black font-semibold">Class ID : {classD?._id}</p>
                                        <p className="text-black font-semibold">School ID : {classD?.schoolId}</p>
                                        <p className="text-black font-semibold">Class Type : {classD?.classType}</p>
                                        <div className="flex items-center justify-between gap-28">
                                            <p className="text-black font-semibold">Class No : {classD?.classNumber}<sup>th</sup></p>
                                            <p className="text-black font-semibold">Students: {classD?.totalStudent}</p>
                                        </div>
                                        <p className="text-black font-semibold">Subjects : {classD?.subjectsArray?.map((sub , index) => <span className="mx-1" key={index}>{sub}</span>)}</p>
                                    </div>
                                </div>
                            </Tooltip>
                        </Link>
                    )
                }
            </div>

        </div>
    );
};

export default YourClasses;
