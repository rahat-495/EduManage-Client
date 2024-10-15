
import { Avatar, Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiSendPlaneLine } from "react-icons/ri";
import { PiLinkSimpleBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const MessagePage = () => {

  const { receiverUid } = useParams() ;
  const axiosSecure = useAxiosSecure() ;
  const currentUser = useSelector(state => state?.user) ;
  const [message , setMessage] = useState({
    text : "" ,
    imageUrl : "" ,
    videoUrl : "" ,
    seen : false ,
    sender : currentUser?.studentUid ,
    receiver : receiverUid ,
  })

  useEffect(() => {
    setMessage((preve) => {
      return{
        ...preve ,
        sender : currentUser?.studentUid ,
      }
    })
  } , [currentUser])

  const {data : receiverData} = useQuery({
    queryKey : ['getReceiverDetails' , receiverUid] ,
    queryFn : async () => {
      const {data} = await axiosSecure.get(`/receiverDetails?studentUid=${receiverUid}`) ;
      return data ;
    }
  })

  const {data : messages , refetch} = useQuery({
    queryKey : ['messages' , receiverUid , currentUser] ,
    queryFn : async () => {
      const {data} = await axiosSecure.get(`/messages?receiver=${receiverUid}&sender=${currentUser?.studentUid}`) ;
      return data ;
    }
  })

  const handleSubmitMessage = async (e) => {
    e.preventDefault() ;
    if(currentUser?.studentUid && receiverUid){
      const {data} = await axiosSecure.post(`/createMessage` , message) ;
      if(data?._id){
        refetch() ;
        e.target.reset() ;
      }
    }
  }
  
  return (
    <div className="flex flex-col items-start justify-between w-full h-[80vh]"> 

      <div className="w-full border-b border-[#483064] flex items-start justify-between px-3 rounded-tr-lg">

        <div className="flex items-start gap-3 w-full rounded-md p-1">
            <Avatar src={receiverData?.image} className=""/>
            <div className="flex flex-col gro">
                <p className="capitalize">{receiverData?.name}</p>
                <p className="">{receiverData?.email}</p>
            </div>
        </div>

        <div className="my-auto">
          <Button className="rounded-md p-0 w-10 h-10 flex items-center justify-center bg-transparent hover:bg-[#2f1f41]">
            <HiOutlineDotsVertical className="text-2xl"/>
          </Button>
        </div>

      </div>

      <div className="w-full h-[70vh] overflow-y-auto flex items-start justify-between">
        
        {
          messages?.map((data) => <div key={data?._id}>

          </div>)
        }

      </div>

      <div className="w-full h-12 border-t border-[#483064] flex items-center justify-between px-1 rounded-br-lg py-1 gap-2">
        <Button className="text-white bg-transparent hover:bg-[#2f1f41] duration-300 h-full p-0 w-10 flex items-center justify-center text-xl"><PiLinkSimpleBold /></Button>
        <form onSubmit={handleSubmitMessage} className="w-full h-full flex gap-2">
          <input 
            onChange={(e) => setMessage((preve) => {
              return{
                ...preve ,
                text : e.target.value ,
              }
            })} 
            type="text" name="text" placeholder="Type a message" className="bg-transparent gro font-normal w-full h-full rounded outline-none px-3 duration-300 focus:bg-[#2f1f41]"/>
          <button className="w-10 flex items-center justify-center rounded text-xl hover:bg-[#2f1f41] duration-300"><RiSendPlaneLine /></button>
        </form>
      </div>

    </div>
  );
};

export default MessagePage;
