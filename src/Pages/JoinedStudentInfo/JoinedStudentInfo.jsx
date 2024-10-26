
import { Tooltip } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const JoinedStudentInfo = () => {

    const {id} = useParams() ;
    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;

    const {data} = useQuery({
        queryKey : ['joinedStudentInfo' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/joinedStudentInfo?id=${id}`) ;
            return data ;
        }
    })

    return (
        <div className="min-h-[70vh] mx-3 mb-10 lg:mb-0 lg:mx-0 flex flex-col items-center gap-5 mt-10">
            <div className="flex flex-col items-center justify-center gap-3">
                <Tooltip content={data?.studentName} animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                }}>
                    <img className="w-40 h-40 rounded-full mb-5 cursor-pointer" src={data?.studentImage} alt="" />
                </Tooltip>
                <div className="flex flex-col gap-1 text-center lg:text-start lg:flex-row lg:gap-10">
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Student Name :</span> {data?.studentName}</p>
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Student Email :</span> {data?.studentEmail}</p>
                </div>
                <div className="flex flex-col gap-1 text-center lg:text-start lg:flex-row lg:gap-10">
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Student Number :</span> {data?.studentNumber}</p>
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Student Uid :</span> {data?.studentUid}</p>
                </div>
                <div className="flex flex-col gap-1 text-center lg:text-start lg:flex-row lg:gap-10">
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Father Name :</span> {data?.fatherName}</p>
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Mother Name :</span> {data?.motherName}</p>
                </div>
                <div className="flex flex-col gap-1 text-center lg:text-start lg:flex-row lg:gap-10">
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Parent Number :</span> {data?.parentNumber}</p>
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Address :</span> {data?.address}</p>
                </div>
                <div className="flex flex-col gap-1 text-center lg:text-start lg:flex-row lg:gap-10">
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Joined On : </span> {data?.schoolName}</p>
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Joined Grade :</span> {data?.gradeNumber}</p>
                </div>
                <div className="flex flex-col gap-1 text-center lg:text-start lg:flex-row lg:gap-10">
                    <p className="gro font-normal text-blue-500 text-lg"><span className="font-semibold text-white">Joined School Status : </span> {data?.schoolJoiningStatus && "Joined"}</p>
                </div>
            </div>
        </div>
    );
};

export default JoinedStudentInfo;
