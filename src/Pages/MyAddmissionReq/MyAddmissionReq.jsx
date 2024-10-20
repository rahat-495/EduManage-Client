
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Tooltip, Typography } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const TABLE_HEAD = ["No", "Name", "Father Name", "Mother Name", "Student Number" , "Parent Number" , "Address" , "School Name" , "Status" , "Action"];
 
const MyAddmissionReq = () => {

    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;
    const userDetails = useSelector(state => state.user) ;

    useEffect(() => {
        if(userDetails?.isjoined && !userDetails?.isjoinedModalSeen && userDetails?._id){
            document.getElementById('congrassModal').showModal() ;
        }
    } , [user , userDetails])

    const { data } = useQuery({
        queryKey : ['addmissionsData' , user] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/addmissionsData?uid=${user?.uid}`) ;
            return data ;
        }
    })

    const {mutateAsync} = useMutation({
        mutationFn : async () => {
            const data = await axiosSecure.patch(`/updateIsSeenModal` , {_id : userDetails?._id}) ;
            return data ;
        },
        onSuccess : () => {
            window.location.reload() ;
        }
    })

    const handleCantUpdate = () => {
        Swal.fire({
            title: "Oops !",
            html: "Join Request Was Accepted <br/> You Can Update Now",
            icon: "warning"
        })
    }

    const handleIsjoinedModalSeen = async () => {
        const {data} = await mutateAsync() ;
        console.log(data) ;
    }

    return (
        <div className="min-h-[70vh] flex flex-col items-center gap-5 mb-10 mx-3 lg:mx-0">

            <h1 className="gro text-4xl font-semibold text-white my-14">Addmission Requests</h1>

            <div className="flex flex-col items-center justify-center w-full">

                <Card className="h-full w-full overflow-auto">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr className="gro">
                                {
                                    TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="leading-none opacity-70 gro font-semibold"
                                        >
                                        {head}
                                        </Typography>
                                    </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((data, index) => (
                                    <tr key={data?._id} className="even:bg-blue-gray-50/50">

                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal gro">
                                                {index + 1}
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal gro capitalize">
                                                {data?.studentName}
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal gro capitalize">
                                                {data?.fatherName}
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal gro capitalize">
                                                {data?.motherName}
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal gro capitalize">
                                                {data?.studentNumber}
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal gro capitalize">
                                                {data?.parentNumber}
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal gro capitalize cursor-pointer">
                                                <Tooltip content={data?.address} placement={'left'} animate={{
                                                    mount: { scale: 1, y: 0 },
                                                    unmount: { scale: 0, y: 25 },
                                                }}>
                                                    {data?.address.slice(0,13) + '...'}
                                                </Tooltip>
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal gro capitalize cursor-pointer">
                                                <Tooltip content={data?.schoolName} placement={'left'} animate={{
                                                    mount: { scale: 1, y: 0 },
                                                    unmount: { scale: 0, y: 25 },
                                                }}>
                                                    {data?.schoolName?.length > 11 ? data?.schoolName.slice(0,11) + '...' : data?.schoolName}
                                                </Tooltip>
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography className={`capitalize gro bg-transparent font-semibold ${data?.schoolJoiningStatus === 'accepted' && data?.gradeJoiningStatus === 'accepted' && 'text-green-700'} ${data?.schoolJoiningStatus === 'pending' && data?.gradeJoiningStatus === 'pending' && 'text-orange-700'} ${data?.schoolJoiningStatus === 'rejected' && data?.gradeJoiningStatus === 'rejected' && 'text-red-700'}`}>{data?.schoolJoiningStatus}</Typography>
                                        </td>

                                        <td className="p-4">
                                            {
                                                data?.schoolJoiningStatus !== 'pending' && data?.gradeJoiningStatus !== 'pending' ?
                                                <Button onClick={handleCantUpdate} className="capitalize w-full gro bg-transparent text-black shadow-none hover:shadow-none border hover:border-purple-500 duration-300">
                                                    Cant Update
                                                </Button>:
                                                <Link className="w-full" to={`/updateAddmissionForm/${data?._id}`}>
                                                    <Button className="capitalize w-full gro bg-transparent text-black shadow-none hover:shadow-none border hover:border-purple-500 duration-300">
                                                        Update
                                                    </Button>
                                                </Link> 
                                            }
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Card>

            </div>

            <dialog id="congrassModal" className="modal">
                <div className="modal-box bg-[#0F172A]">

                    <div className="gro flex flex-col items-center justify-center text-center gap-1">
                        <h3 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2] text-center">Congratulation</h3>
                        <p className="py-4 text-lg text-center text-[#C7ABFF]">Congratulation your addmission was accepted !</p>
                    </div>

                    <div className="modal-action w-full flex items-center justify-center">
                        <form method="dialog" className="w-full">
                            <button onClick={handleIsjoinedModalSeen} className="btn w-full bg-gradient-to-r from-purple-400 to-[#00FFB2] text-[#dccaff]">Close</button>
                        </form>
                    </div>

                </div>
            </dialog>

        </div>
    );
};

export default MyAddmissionReq;
