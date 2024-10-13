
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ClassMates = () => {

    const user = useSelector(state => state?.user) ;
    const axiosSecure = useAxiosSecure() ;

    const {data} = useQuery({
        queryKey : ['myClassMates' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/myClassMates?email=${user?.email}`) ;
            return data ;
        }
    })

    return (
        <div className="min-h-[70vh] flex flex-col items-center gap-5 w-full">

            <h1 className="play text-4xl mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2] text-center">Class Mates</h1>

            <div className={`w-full ${data?.length > 0 && "grid grid-cols-10 gap-5"} `}>
                {
                    data?.length > 0 ?
                    data?.map((data) => 
                        <Tooltip
                        placement="top-start"
                            key={data?._id}
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            }}
                            className={"bg-[#0F172A] border border-[#5d8eff85] "}
                            content={
                                <div className="text-black gro">
                                    <h1 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2]">Student Name : {data?.studentName}</h1>
                                    <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2]">Student Email : {data?.studentEmail}</p>
                                    <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2]">Click to send message...</p>
                                </div>
                            }
                        >
                            <Link to={`/message/${data?._id}`}>
                                <div className="border rounded-full p-1 duration-300 w-[125px] h-[125px] hover:p-0">
                                    <img src={data?.studentImage} alt="" className="w-[115px] h-[115px] mx-auto rounded-full cursor-pointer duration-300 hover:w-full hover:h-full"/>
                                </div>
                            </Link>
                        </Tooltip>
                    ) :
                    <div className="flex flex-col items-center justify-center gro w-full h-full">
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2] text-center text-4xl">Class Mates Not Found !</p>
                    </div>
                }
            </div>

        </div>
    );
};

export default ClassMates;
