
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "@material-tailwind/react";

const YourGradeDetails = () => {

    const {id} = useParams() ;
    const axiosSecure = useAxiosSecure() ;
    const {user} = useAuth() ;

    const {data} = useQuery({
        queryKey : ['yourGradeSubs' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/subjects?id=${id}`)
            return data ;
        }
    })

    const {data : gradeStudents} = useQuery({
        queryKey : ['gradeStudents' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/gradeStudents?id=${id}`)
            return data ;
        }
    })

    return (
        <div className="min-h-[70vh] mx-3 mb-10 lg:mx-0 lg:mb-0">

            <h1 className="gro text-4xl text-center my-10 text-white">{data?.gradeName}</h1>

            <div className="grid lg:grid-cols-5 gap-5">
                {
                    data?.subjectsArray?.map((sub , index) => 
                        <div key={index} className="px-5 py-10 bg-white rounded-md border hover:border-purple-500 bg-gradient-to-r from-purple-500 to-teal-500 duration-500 cursor-pointer">
                        <h1 className="text-white text-center text-xl gro capitalize">{sub}</h1>
                    </div>
                    )
                }
            </div>

            <h1 className="gro text-4xl text-center mt-20 text-white">All Students</h1>

            <div className="w-full grid grid-cols-3 lg:grid-cols-10 gap-5 my-10">
                {
                    gradeStudents?.map((data) => 
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

export default YourGradeDetails;
