
import { Button, Card, Tooltip, Typography } from "@material-tailwind/react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const TABLE_HEAD = ["No", "Name", "Father Name", "Mother Name", "Student Number" , "Parent Number" , "Address" , "School Name" , "Status" , "Action"];
 
const AddmissionReq = () => {

    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;

    const { data } = useQuery({
        queryKey : ['addmissionsData' , user] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/addmissionsData?uid=${user?.uid}`) ;
            return data ;
        }
    })

    const handleCantUpdate = () => {
        Swal.fire({
            title: "Oops !",
            html: "Join Request Was Accepted <br/> You Can Update Now",
            icon: "warning"
          })
    }

    return (
        <div className="min-h-[70vh] flex flex-col items-center gap-5 mb-10">

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
                                            <Typography className="capitalize gro bg-transparent text-orange-600 font-semibold">{data?.schoolJoiningStatus === 'pending' || data?.gradeJoiningStatus === 'pending' ? "Pending" : "Accepted"}</Typography>
                                        </td>

                                        <td className="p-4">
                                            {
                                                data?.schoolJoiningStatus !== 'pending' && data?.gradeJoiningStatus !== 'pending' ?
                                                <Button onClick={handleCantUpdate} className="capitalize gro bg-transparent text-black shadow-none hover:shadow-none border hover:border-purple-500 duration-300">
                                                    Cant Update
                                                </Button>:
                                                <Link to={`/updateAddmissionForm/${data?._id}`}>
                                                    <Button className="capitalize gro bg-transparent text-black shadow-none hover:shadow-none border hover:border-purple-500 duration-300">
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

        </div>
    );
};

export default AddmissionReq;
