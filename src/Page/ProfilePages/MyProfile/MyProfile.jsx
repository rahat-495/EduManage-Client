
import { useQuery } from "@tanstack/react-query";
import { FaRegPenToSquare } from "react-icons/fa6";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Serial", "Platform", "Date", "Action"];

const MyProfile = () => {

    const axiosSecure = useAxiosSecure() ;
    const {user} = useAuth() ;

    const {data : userData} = useQuery({
        queryKey : ['userinfo' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/userData?email=${user?.email}`) ;
            return data ;
        }
    }) 
    console.log(userData?.devicesInfo)

    return (
        <div className="flex flex-col items-start gap-3 px-5">

            <div className="flex items-center justify-between w-full pb-5 border-dashed mb-3 border-b border-[#412E4D]">
                <h1 className="gro font-semibold text-xl text-transparent bg-gradient-to-r from-purple-500 via-teal-300 to-cyan-500 bg-clip-text">My Profile</h1>
                <button><FaRegPenToSquare /></button>
            </div>

            <div className="grid grid-cols-2 gap-5 w-full mt-3 mb-6">
                <div className="">
                    <h1 className="gro font-semibold text-xl text-[#5F556B]">Full Name</h1>
                    <h1 className="gro font-semibold text-xl text-[#CEC1DE]">{userData?.name}</h1>
                </div>
                <div className="">
                    <h1 className="gro font-semibold text-xl text-[#5F556B]">Email</h1>
                    <h1 className="gro font-semibold text-xl text-[#CEC1DE]">{userData?.email}</h1>
                </div>
                <div className="">
                    <h1 className="gro font-semibold text-xl text-[#5F556B]">{userData?.role === 'student' ? "Student Id" : "Teacher Id"}</h1>
                    <h1 className="gro font-semibold text-xl text-[#CEC1DE]">{userData?._id}</h1>
                </div>
                <div className="">
                    <h1 className="gro font-semibold text-xl text-[#5F556B]">User Type</h1>
                    <h1 className="gro font-semibold text-xl text-[#CEC1DE] capitalize">{userData?.role}</h1>
                </div>
            </div>

            <div className="flex items-center justify-between w-full pb-5 border-dashed mb-3 border-b border-[#412E4D]">
                <h1 className="gro font-semibold text-xl text-transparent bg-gradient-to-r from-purple-500 via-teal-300 to-cyan-500 bg-clip-text">Device Activity</h1>
            </div>

            <div className="w-full">
                <Card className="h-full w-full overflow-auto bg-transparent rounded-none gro">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead className="">
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="bg-[#231B2C] p-3"
                                >
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="leading-none text-[#EDDFFE] gro text-base font-semibold opacity-70"
                                    >
                                    {head}
                                    </Typography>
                                </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData?.devicesInfo?.map((device , index) => {
                                    return (
                                    <tr key={index} className="bg-[#160E1F]">
                                        <td>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal gro text-lg text-white ml-3"
                                            >
                                                {index}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {device}
                                            </Typography>
                                        </td>
                                        <td>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            
                                        </Typography>
                                        </td>
                                        <td>
                                        <Typography
                                            as="a"
                                            href="#"
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium"
                                        >
                                            Action
                                        </Typography>
                                        </td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                </Card>
            </div>

        </div>
    );
};

export default MyProfile;
