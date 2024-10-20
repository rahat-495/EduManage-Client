
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import loader from "../../../public/roundedLoader.json";

const ClassMates = () => {

    const user = useSelector(state => state?.user) ;
    const axiosSecure = useAxiosSecure() ;

    const {data , isLoading} = useQuery({
        queryKey : ['myClassMates' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/myClassMates?email=${user?.email}`) ;
            return data ;
        }
    })

    return (
        <div className="min-h-[70vh] flex flex-col items-center gap-5 w-full mx-3 lg:mx-0">

            <h1 className="play text-4xl mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2] text-center">Class Mates</h1>

            <div className={`w-full ${data?.length > 0 && "grid grid-cols-1 lg:grid-cols-10 gap-5"} `}>
                {
                    !isLoading ?
                    data?.length > 0 ?
                    data?.map((data) => 
                        <Tooltip
                        placement="top-start"
                            key={data?._id}
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            }}
                            className={"bg-[#0F172A] border border-[#5d8eff85]"}
                            content={
                                <div className="text-black gro">
                                    <h1 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2]">Student Name : {data?.studentName}</h1>
                                    <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2]">Student Email : {data?.studentEmail}</p>
                                    <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2]">Click to send message...</p>
                                </div>
                            }
                        >
                            <Link to={`/message/${data?._id}`} className="">
                                <div className="border rounded-md duration-300 w-[94%] gap-3 mr-10 p-1 flex items-center lg:p-0 lg:rounded-full lg:w-[125px] lg:h-[125px] lg:block">
                                    <img src={data?.studentImage} alt="" className="w-[70px] h-[70px] lg:w-full lg:h-full rounded-full cursor-pointer duration-300"/>
                                    <div className="">
                                        <p className="gro text-xl capitalize font-medium">{data?.studentName}</p>
                                        <p className="gro text-base capitalize font-medium">{data?.studentEmail}</p>
                                        <p className="gro text-sm capitalize font-medium">{data?.studentUid}</p>
                                    </div>
                                </div>
                            </Link>
                        </Tooltip>
                    ) :
                    <div className="flex flex-col items-center justify-center gro w-full h-full">
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2] text-center text-4xl">Class Mates Not Found !</p>
                    </div>:
                    <Lottie animationData={loader} loop={true}/>
                }
            </div>

        </div>
    );
};

export default ClassMates;
