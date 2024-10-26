
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button, Tooltip } from "@material-tailwind/react";
import Swal from "sweetalert2";

const StudentInfo = () => {

    const {id} = useParams() ;
    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;

    const {data : addmissionData , refetch} = useQuery({
        queryKey : ['studentAddmissionInfo' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/studentAddmissionInfo?id=${id}`) ;
            return data ;
        }
    })

    const handleSchoolJoinStatus = async () => {
        const id = addmissionData?._id ;

        Swal.fire({
            title: "Are you sure ?",
            text: "You won't be able to join him ?",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Accept It" ,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Reject It`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/updateSchoolJoinStatus` , {id , schoolJoiningStatus : 'accepted'})
                .then((res) => {
                    if(res?.data?.modifiedCount){
                        refetch() ;
                        Swal.fire({
                            title: "Accepted",
                            text: "Joining Request are Accepted !",
                            icon: "success"
                        });
                    }
                    if(res?.data?.status === 'error'){
                        Swal.fire({
                            title: "Oops Sorry",
                            html: "You Can't Accept Him Now Beacause <br/> He Already Joined Another One",
                            icon: "success"
                        });
                    }
                })
            } else if (result.isDenied) {
                axiosSecure.patch(`/updateSchoolJoinStatus` , {id , schoolJoiningStatus : 'rejected'})
                .then((res) => {
                    if(res?.data?.modifiedCount){
                        refetch() ;
                        Swal.fire({
                            title: "Rejected",
                            text: "Joining Request are Rejected !",
                            icon: "error"
                        });
                    }
                })
            }
        });
    }

    const handleGradeJoinStatus = async () => {
        const id = addmissionData?._id ;
        
        Swal.fire({
            title: "Are you sure ?",
            text: "You won't be able to join him ?",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Accept It" ,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Reject It`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/updateGradeJoinStatus` , {id , gradeJoiningStatus : 'accepted'})
                .then((res) => {
                    if(res?.data?.modifiedCount){
                        refetch() ;
                        Swal.fire({
                            title: "Accepted",
                            text: "Joining Request are Accepted !",
                            icon: "success"
                        });
                    }
                    if(res?.data?.status === 'error'){
                        Swal.fire({
                            title: "Oops Sorry",
                            html: "You Can't Accept Him Now Beacause <br/> He Already Joined Another One",
                            icon: "success"
                        });
                    }
                })
            } else if (result.isDenied) {
                axiosSecure.patch(`/updateGradeJoinStatus` , {id , gradeJoiningStatus : 'rejected'})
                .then((res) => {
                    if(res?.data?.modifiedCount){
                        refetch() ;
                        Swal.fire({
                            title: "Rejected",
                            text: "Joining Request are Rejected !",
                            icon: "error"
                        });
                    }
                })
            }
        });
    }

    return (
        <div className="min-h-[70vh] mx-3 lg:mx-0 flex flex-col items-center gap-5 mt-10">
            <div className="flex flex-col items-center justify-center gap-3">
                <Tooltip content={addmissionData?.studentName} animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                }}>
                    <img className="w-40 h-40 rounded-full mb-5 cursor-pointer" src={addmissionData?.studentImage} alt="" />
                </Tooltip>
                <div className="flex flex-col gap-1 text-center lg:text-start lg:flex-row lg:gap-10">
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Student Name :</span> {addmissionData?.studentName}</p>
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Student Email :</span> {addmissionData?.studentEmail}</p>
                </div>
                <div className="flex flex-col gap-1 text-center lg:text-start lg:flex-row lg:gap-10">
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Student Number :</span> {addmissionData?.studentNumber}</p>
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Student Uid :</span> {addmissionData?.studentUid}</p>
                </div>
                <div className="flex flex-col gap-1 text-center lg:text-start lg:flex-row lg:gap-10">
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Father Name :</span> {addmissionData?.fatherName}</p>
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Mother Name :</span> {addmissionData?.motherName}</p>
                </div>
                <div className="flex flex-col gap-1 text-center lg:text-start lg:flex-row lg:gap-10">
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Parent Number :</span> {addmissionData?.parentNumber}</p>
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Address :</span> {addmissionData?.address}</p>
                </div>
                <div className="flex flex-col gap-1 text-center lg:text-start lg:flex-row lg:gap-10">
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Addmission On : </span> {addmissionData?.schoolName}</p>
                    <p className="gro font-normal text-white text-lg"><span className="font-semibold">Addmission Grade :</span> {addmissionData?.gradeNumber}</p>
                </div>
                <div className="flex flex-col gap-3 text-center lg:text-start lg:flex-row lg:gap-10 w-full mt-5">

                    <Button onClick={handleSchoolJoinStatus} className={`capitalize gro w-full text-sm bg-white shadow-none ${addmissionData?.schoolJoiningStatus === 'rejected' && 'text-red-700'} ${addmissionData?.schoolJoiningStatus === 'pending' && 'text-orange-700'}  ${addmissionData?.schoolJoiningStatus === 'accepted' && 'text-green-700'} border`}>School Status : {addmissionData?.schoolJoiningStatus}</Button>

                    <Button onClick={handleGradeJoinStatus} className={`capitalize gro w-full text-sm bg-white shadow-none ${addmissionData?.gradeJoiningStatus === 'rejected' && 'text-red-700'} ${addmissionData?.gradeJoiningStatus === 'pending' && 'text-orange-700'}  ${addmissionData?.gradeJoiningStatus === 'accepted' && 'text-green-700'} border`}>Grade Status : {addmissionData?.gradeJoiningStatus}</Button>

                </div>
            </div>
        </div>
    );
};

export default StudentInfo;
