
import { Avatar } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MessagePage = () => {

    const { studentUid } = useParams() ;
    const axiosSecure = useAxiosSecure() ;

    const {data} = useQuery({
        queryKey : ['getReceiverDetails' , studentUid] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/receiverDetails?studentUid=${studentUid}`) ;
            return data ;
        }
    })
    
  return (
    <div className="flex flex-col items-start w-full">

      <div className="w-full border-b border-[#483064]">

        <div className="flex items-start gap-3 hover:bg-[#241833] w-full rounded-md cursor-pointer p-1 duration-200">
            <Avatar src={data?.image} className=""/>
            <div className="flex flex-col gro">
                <p className="capitalize">{data?.name}</p>
                <p className="">{data?.email}</p>
            </div>
        </div>

      </div>

    </div>
  );
};

export default MessagePage;
