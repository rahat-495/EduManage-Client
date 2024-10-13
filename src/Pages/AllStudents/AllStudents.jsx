
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const AllStudents = () => {

    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;

    const {data} = useQuery({
        queryKey : ['allStudents' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/allStudents?email=${user?.email}`) ;
            return data ;
        }
    })
    console.log(data) 

    return (
        <div className="min-h-[70vh] flex flex-col items-center gap-5">

            <h1 className="gro text-white text-4xl mb-10">All Students</h1>

            <div className="w-full grid grid-cols-10 gap-5">
                {
                    data?.map((data) => 

                        <Tooltip
                        placement="top-start"
                            key={data?._id}
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            }}
                            className={"bg-white"}
                            content={
                                <div className="text-black gro">
                                    <h1 className="font-semibold">Student Name : {data?.studentName}</h1>
                                    <p className="font-semibold">Student Email : {data?.studentEmail}</p>
                                    <p className="font-semibold">Student Number : {data?.studentNumber}</p>
                                    <p className="font-semibold">Click To Show More...</p>
                                </div>
                            }
                        >
                            <Link to={`/joinedStudentInfo/${data?._id}`}>
                                <div className="border rounded-full p-1 duration-300 w-[125px] h-[125px] hover:p-0">
                                    <img src={data?.studentImage} alt="" className="w-[115px] h-[115px] mx-auto rounded-full cursor-pointer duration-300 hover:w-full hover:h-full"/>
                                </div>
                            </Link>
                        </Tooltip>
                    )
                }
            </div>

        </div>
    );
};

export default AllStudents;
