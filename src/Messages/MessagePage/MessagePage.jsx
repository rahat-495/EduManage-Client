
/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiSendPlaneLine } from "react-icons/ri";
import { PiLinkSimpleBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../../Hooks/useAuth";
import { MdPhotoLibrary } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";

const MessagePage = () => {

  const messageEndRef = useRef(null) ;
  const { receiverUid } = useParams() ;
  const axiosSecure = useAxiosSecure() ;
  const {socket , setSocket} = useAuth() ;
  const currentUser = useSelector(state => state?.user) ;
  const [newMessage , setNewMessage] = useState({}) ;
  const [messages , setMessages] = useState([]) ;
  const [message , setMessage] = useState({
    text : "" ,
    imageUrl : "" ,
    videoUrl : "" ,
    seen : false ,
    sender : currentUser?.studentUid ,
    receiver : receiverUid ,
  })
  
  const {data : receiverData} = useQuery({
    queryKey : ['getReceiverDetails' , receiverUid] ,
    queryFn : async () => {
      const {data} = await axiosSecure.get(`/receiverDetails?studentUid=${receiverUid}`) ;
      return data ;
    }
  })

  const getMessages = () => {
    axiosSecure.get(`/messages?receiver=${receiverUid}&sender=${currentUser?.studentUid}`) 
    .then((res) => {
      setMessages(res?.data) ;
    })
  }

  useEffect(() => {
    getMessages() ;
  } , [receiverUid , currentUser , newMessage , axiosSecure])

  useEffect(() => {
    setNewMessage((preve) => {
      return{
        ...preve ,
        sender : currentUser?.studentUid ,
        receiver : receiverUid ,
      }
    })
  } , [receiverUid , currentUser])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  } , [newMessage])

  useEffect(() => {
    setSocket(io('http://localhost:5555')) ;
  } , [setSocket])

  useEffect(() => {

    socket?.emit("addUser" , currentUser?.studentUid) ;

    socket?.on("getUsers" , (users) => {
      // console.log("active users" , users) ;
      return users ;
    })
    
    socket?.on("getMessage" , (message) => {
      if(message?.message?.text){
        setNewMessage(() => {
          return{
            ...message?.message ,
            sender : currentUser?.studentUid ,
            receiver : receiverUid ,
          }
        }) ;
        setMessages([...messages , message?.message]) ;
      }
    })
    
    socket?.on("disconnect" , (users) => {
      // console.log(users) ;
      return users ;
    })

  } , [socket , currentUser , messages])

  useEffect(() => {
    setMessage((preve) => {
      return{
        ...preve ,
        sender : currentUser?.studentUid ,
        receiver : receiverUid
      }
    })
  } , [currentUser , receiverUid])

  useEffect(() => {
    if(newMessage?.text || newMessage?.imageUrl || newMessage?.videoUrl || newMessage?.sender || newMessage?.receiver ){
      getMessages() ;
    }
  } , [newMessage])

  const handleSubmitMessage = async (e) => {
    e.preventDefault() ;
    if(message?.sender && message?.receiver){

      socket?.emit("sendMessage" , {message}) ;

      if(newMessage?.receiver === message?.receiver){
        axiosSecure.post(`/createMessage` , message)
        .then((res) => {
          if(res?.data?._id){
            e.target.reset() ;
            getMessages() ;
          }
        })
      }

    }
  }

  console.log(newMessage?.sender , newMessage?.receiver)

  return (
    <div className="flex flex-col items-start justify-between w-full min-h-[80vh]"> 

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

      <div id="scrollDiv" className="w-full h-[65vh] overflow-y-auto flex flex-col items-start px-6 py-3">
        
        {
          messages?.length > 0 ?
          messages?.map((data) => <div ref={messageEndRef} key={data?._id} className={`w-full mb-1 ${currentUser?.studentUid === data?.sender ? "flex items-end justify-end" : ""}`}>
            {
              data?.text &&
              <p className={`inline-block max-w-xs ${currentUser?.studentUid === data?.sender ? "rounded-l-md rounded-br-md px-3 py-1 bg-[#3b3b3b] text-white" : "rounded-r-md rounded-bl-md px-3 py-1 bg-[#3c3c58] text-white"}`}>{data?.text}</p>
            }
          </div>):
          <div className="flex flex-col items-center justify-center gro h-[75vh] w-full">
            <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2] text-center mt-3">No chats start yeat !</h1>
          </div>
        }

      </div>

      <div className="w-full h-12 border-t border-[#483064] flex items-center justify-between px-1 rounded-br-lg py-1 gap-2">

        <Menu placement="top-start">
          <MenuHandler>
            <Button className="text-white bg-transparent hover:bg-[#2f1f41] duration-300 h-full p-0 w-10 flex items-center justify-center text-xl"><PiLinkSimpleBold /></Button>
          </MenuHandler>
          <MenuList className="p-1 border border-[#b077f1] gro">
            
            <MenuItem className="">
              <label htmlFor="image" className="cursor-pointer flex items-center justify-start gap-5 text-black font-semibold w-full"><MdPhotoLibrary className="text-lg"/> Image </label>
              <input type="file" className="hidden" id="image" name="image" accept="image/*"/>
            </MenuItem>

            <MenuItem className="">
              <label htmlFor="video" className="cursor-pointer flex items-center justify-start gap-5 text-black font-semibold w-full"><IoVideocam className="text-lg"/> Video </label>
              <input type="file" className="hidden" id="video" name="video" accept="video/*"/>
            </MenuItem>

          </MenuList>
        </Menu>

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
