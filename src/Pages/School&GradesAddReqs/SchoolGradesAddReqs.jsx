
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import { FaTableList } from "react-icons/fa6";
import { FiBox } from "react-icons/fi";
import { Button, Card, Tooltip, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TABLE_HEAD = ["No .", "Image", "Student Name", "Student Email" , "Student Number" , "School Status" , "Grade Status" , "Status" , "View"];

const SchoolGradesAddReqs = () => {

    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;
    const [columnType , setColumnType] = useState(false) ;

    const {data : addmissionReqData , refetch} = useQuery({
        queryKey : ['schoolsAddmissionReqs' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/schoolsAndGradesAddReqs?email=${user?.email}`) ; 
            return data ;
        }
    })

    const handleSchoolJoinStatus = async (id) => {
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
                    if(res?.data?.status === 'warning'){
                        Swal.fire({
                            title: "Oops",
                            html: "You Already Joined Him !",
                            icon: "error"
                        });
                    }
                    if(res?.data?.status === 'alreadyJoined'){
                        Swal.fire({
                            title: "Already Joined",
                            html: "He Already Joined Another One !",
                            icon: "warning"
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
                            icon: "success"
                        });
                    }
                    if(res?.data?.status === 'error'){
                        Swal.fire({
                            title: "Oops Sorry",
                            html: "You Can't Reject Him Now Beacause <br/> You Already Joined Him",
                            icon: "error"
                        });
                    }
                    if(res?.data?.status === 'alreadyJoined'){
                        Swal.fire({
                            title: "Already Joined",
                            html: "He Already Joined Another One !",
                            icon: "warning"
                        });
                    }
                })
            }
        });
    }

    const handleGradeJoinStatus = async (id) => {
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
                    if(res?.data?.status === 'warning'){
                        Swal.fire({
                            title: "Oops",
                            html: "You Already Joined Him !",
                            icon: "error"
                        });
                    }
                    if(res?.data?.status === 'alreadyJoined'){
                        Swal.fire({
                            title: "Already Joined",
                            html: "He Already Joined Another One !",
                            icon: "warning"
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
                            icon: "success"
                        });
                    }
                    if(res?.data?.status === 'error'){
                        Swal.fire({
                            title: "Oops Sorry",
                            html: "You Can't Reject Him Now Beacause <br/> You Already Joined Him",
                            icon: "error"
                        });
                    }
                    if(res?.data?.status === 'alreadyJoined'){
                        Swal.fire({
                            title: "Already Joined",
                            html: "He Already Joined Another One !",
                            icon: "warning"
                        });
                    }
                })
            }
        });
    }

    const handleAllJoinStatusP = (id) => {
        Swal.fire({
            title: "Are you sure ?",
            text: "You won't be change into pending ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/changeAllJoinStatusP` , {id})
                .then((res) => { 
                    if(res?.data?.modifiedCount > 0){
                        refetch() ;
                        Swal.fire({
                            title: "Status Changed !",
                            text: "Status Changed To Pending Successfull !",
                            icon: "success"
                        });
                    }
                    else{
                        Swal.fire({
                            title: "Oops",
                            text: "Status Can't Change !",
                            icon: "error"
                        });
                    }
                })
            }
        });
    }

    return (
        <div className="min-h-[70vh] flex flex-col items-end my-8">
            
            {
                columnType ? 
                <FiBox className="cursor-pointer text-4xl duration-300" onClick={() => setColumnType(!columnType)}/> :
                <FaTableList className="cursor-pointer text-4xl duration-300" onClick={() => setColumnType(!columnType)}/> 
            }

            <div className="w-full flex flex-col items-center justify-center mt-5">
                {
                    columnType ? 
                    <div className="grid grid-cols-3 gap-5 w-full">
                        {
                            addmissionReqData?.map((data) => <Tooltip key={data?._id} content="Click To Show Details" animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            }}>
                                <Link to={`/studentInfoForAddmission/${data?._id}`}>
                                    <div className="border rounded-md p-5 duration-200 cursor-pointer flex flex-col items-center gap-2 gro">
                                        <img className="w-40 h-40 rounded-full" src={data?.studentImage} alt="" />
                                        <div className="flex flex-col gap-1 mt-3 w-full items-center">
                                            <h1 className="">Student Name : {data?.studentName}</h1>
                                            <p className="">Student Email : {data?.studentEmail}</p>
                                            <p className="">Student Number : {data?.studentNumber}</p>
                                        </div>
                                    </div>
                                </Link>
                            </Tooltip>)
                        }
                    </div> :
                    <div className="w-full">
                        <Card className="h-full w-full overflow-auto">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                        >
                                            <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                            >
                                            {head}
                                            </Typography>
                                        </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {addmissionReqData?.map((data , index) => <tr key={data?._id} className="even:bg-blue-gray-50/50 gro">
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal gro">
                                                        {index+1}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal gro">
                                                        <img src={data?.studentImage} className="w-12 h-12 border rounded-md" alt="" />
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal gro">
                                                        <p className="">{data?.studentName}</p>
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal gro">
                                                        <p className="">{data?.studentEmail}</p>
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal gro">
                                                        <p className="">{data?.studentNumber}</p>
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal gro">
                                                        <Tooltip className={"text-white gro bg-[#0F172A]"} content={data?.schoolName}animate={{
                                                            mount: { scale: 1, y: 0 },
                                                            unmount: { scale: 0, y: 25 },
                                                        }}>
                                                            <Button onClick={() => handleSchoolJoinStatus(data?._id)} className={`capitalize gro w-3/4 text-sm bg-white shadow-none ${data?.schoolJoiningStatus === 'pending' && 'text-orange-700'}  ${data?.   schoolJoiningStatus === 'accepted' && 'text-green-700'} ${data?.   schoolJoiningStatus === 'rejected' && 'text-red-700'} border`}>{data?.schoolJoiningStatus}</Button>
                                                        </Tooltip>
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal gro">
                                                        <Tooltip className={"text-white gro bg-[#0F172A]"} content={"Grade Number : " + data?.gradeNumber}animate={{
                                                            mount: { scale: 1, y: 0 },
                                                            unmount: { scale: 0, y: 25 },
                                                        }}>
                                                            <Button onClick={() => handleGradeJoinStatus(data?._id)} className={`capitalize gro w-3/4 text-sm bg-white shadow-none ${data?.   gradeJoiningStatus === 'rejected' && 'text-red-700'} ${data?.gradeJoiningStatus === 'pending' && 'text-orange-700'}  ${data?.gradeJoiningStatus === 'accepted' && 'text-green-700'} border`}>{data?.gradeJoiningStatus}</Button>
                                                        </Tooltip>
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal gro">
                                                        <Button onClick={() => handleAllJoinStatusP(data?._id)} className={`capitalize gro text-sm bg-white shadow-none text-black border`}>Set Status Pending</Button>
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal gro">
                                                        <Link to={`/studentInfoForAddmission/${data?._id}`}>
                                                            <Button className="capitalize gro text-sm bg-transparent text-black border shadow-none">Details</Button>
                                                        </Link>
                                                    </Typography>
                                                </td>
                                            </tr>
                                    )}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                }
            </div>

        </div>
    );
};

export default SchoolGradesAddReqs;
