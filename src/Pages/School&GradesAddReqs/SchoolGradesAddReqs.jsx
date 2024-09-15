
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import { FaTableList } from "react-icons/fa6";
import { FiBox } from "react-icons/fi";
import { Button, Card, Tooltip, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["No .", "Image", "Student Name", "Student Email" , "Student Number" , "School Status" , "Grade Status" , "View"];

const SchoolGradesAddReqs = () => {

    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;
    const [columnType , setColumnType] = useState(false) ;

    const {data : addmissionReqData} = useQuery({
        queryKey : ['schoolsAddmissionReqs' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/schoolsAndGradesAddReqs?email=${user?.email}`) ; 
            return data ;
        }
    })

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
                                                        <Button className={`capitalize gro text-sm bg-white shadow-none ${data?.schoolJoiningStatus === 'pending' && 'text-orange-700'}  ${data?.schoolJoiningStatus === 'accepted' && 'text-green-700'} border`}>{data?.schoolJoiningStatus}</Button>
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal gro">
                                                        <Button className={`capitalize gro text-sm bg-white shadow-none ${data?.gradeJoiningStatus === 'pending' && 'text-orange-700'}  ${data?.gradeJoiningStatus === 'accepted' && 'text-green-700'} border`}>{data?.gradeJoiningStatus}</Button>
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
