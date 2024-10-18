
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
import loader from '../../../public/roundedLoader.json'
import axios from "axios";
import Lottie from "lottie-react";
import { FiCornerRightDown } from "react-icons/fi";
import Swal from "sweetalert2";

const MessagePage = () => {

  const messageEndRef = useRef(null) ;
  const { receiverUid } = useParams() ;
  const axiosSecure = useAxiosSecure() ;
  const {socket , setSocket} = useAuth() ;
  const currentUser = useSelector(state => state?.user) ;
  const [newMessage , setNewMessage] = useState({}) ;
  const [messages , setMessages] = useState([]) ;
  const [image , setImage] = useState("") ;
  const [video , setVideo] = useState("") ;
  const [loading , setLoading] = useState(false) ;
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
    
    socket?.on("getMessage" , (message) => {
      if(message?.message?.text || message?.message?.imageUrl || message?.message?.videoUrl){
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
    if(e){
      e.preventDefault() ;
    }
    if(message?.sender && message?.receiver){
      socket?.emit("sendMessage" , {message}) ;
      if(newMessage?.receiver === message?.receiver && message?.text || message?.imageUrl || message?.videoUrl){
        axiosSecure.post(`/createMessage` , message)
        .then((res) => {
          if(res?.data?._id){
            if(e){
              e.target.reset() ;
            }
            setMessage({
              text : "" ,
              imageUrl : "" ,
              videoUrl : "" ,
              seen : false ,
              sender : currentUser?.studentUid ,
              receiver : receiverUid ,
            })
            setImage("");
            setVideo("");
            getMessages() ;
          }
        })
        console.log(message)
      }
    }
  }

  const handleUploadImage = async (e) => {
    document.getElementById('customModalForUpload').showModal()
    const file = e.target.files[0] ;
    if(file){
      const formData = new FormData() ;
      formData.append('file' , file) ;
      formData.append('upload_preset', 'eduManage');
      setLoading(true) ;
      const {data} = await axios.post(import.meta.env.VITE_UPLOADING_ANYTHING_URL , formData) ;
      setImage(data?.url) ;
      setLoading(false) ;
    }
  }
  
  const handleUploadVideo = async (e) => {
    document.getElementById('customModalForUpload').showModal() ;
    const file = e.target.files[0] ;
    if(file){
      const maxSize = 25 * 1024 * 1024;
      const formData = new FormData() ;
      formData.append('file' , file) ;
      formData.append('upload_preset', 'eduManage');
      if(file.size <= maxSize){
        setLoading(true) ;
        const {data} = await axios.post(import.meta.env.VITE_UPLOADING_ANYTHING_URL , formData) ;
        setVideo(data?.url) ;
        setLoading(false) ;
      }
      else{
        document.getElementById('customModalForUpload').close() ;
        Swal.fire({
          title: "Oops Sorry !",
          html: "You can't send more than 25 mb <br/> size video rigth now !",
          icon: "error"
        });
      }
    }
  }

  const handleImageSend = async () => {
    setMessage((preve) => {
      return{
        ...preve ,
        text : "" ,
        imageUrl : image
      }
    }) ;
    document.getElementById('customModalForUpload').close() ;
  }

  const handleVideoSend = async () => {
    setMessage((preve) => {
      return{
        ...preve ,
        text : "" ,
        videoUrl : video
      }
    }) ;
    document.getElementById('customModalForUpload').close() ;
  }

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

      <div id="scrollDiv" className="w-full h-[69vh] overflow-y-auto flex flex-col items-start px-6 py-3 scrollbar-thin scrollbar-thumb-[#483064] scrollbar-track-transparent">
        
        {
          messages?.length > 0 ?
          messages?.map((data) => <div ref={messageEndRef} key={data?._id} className={`w-full mb-1 ${currentUser?.studentUid === data?.sender ? "flex flex-col items-end justify-end gap-3" : "flex flex-col gap-3"}`}>
            
            {
              data?.text &&
              <div className={`flex flex-col my-1 ${currentUser?.studentUid === data?.sender ? "text-end" : ""}`}>
                <p className={`inline-block max-w-xs ${currentUser?.studentUid === data?.sender ? "rounded-l-md rounded-br-md px-3 py-1 bg-[#3b3b3b] text-white" : "rounded-r-md w-fit rounded-bl-md px-3 py-1 bg-[#3c3c58] text-white"}`}>{data?.text}</p>
                <p className="text-[10px]">{new Date(data?.createdAt).getHours()} : {new Date(data?.createdAt).getMinutes()} : {new Date(data?.createdAt).getSeconds()}</p>
              </div>
            }

            {
              data?.imageUrl &&
              <div className={`flex flex-col my-3 ${currentUser?.studentUid === data?.sender ? "text-end" : ""}`}>
                <img src={data?.imageUrl} alt="image" className={`inline-block max-w-xs w-48 h-48 ${currentUser?.studentUid === data?.sender ? "rounded-lg bg-[#3b3b3b] text-white" : "bg-[#3c3c58] text-white rounded-lg"}`}/>
                <p className="text-[10px]">{new Date(data?.createdAt).getHours()} : {new Date(data?.createdAt).getMinutes()} : {new Date(data?.createdAt).getSeconds()}</p>
              </div>
            }

            {
              data?.videoUrl &&
              <div className={`flex flex-col my-3 ${currentUser?.studentUid === data?.sender ? "text-end" : ""}`}>
                <video src={data?.videoUrl} controls className={`inline-block max-w-xs ${currentUser?.studentUid === data?.sender ? "rounded-lg bg-[#3b3b3b] text-white" : "bg-[#3c3c58] text-white rounded-lg"}`}></video>
                <p className="text-[10px]">{new Date(data?.createdAt).getHours()} : {new Date(data?.createdAt).getMinutes()} : {new Date(data?.createdAt).getSeconds()}</p>
              </div>
            }

          </div>):
          <div className="flex flex-col items-center justify-center gro h-[75vh] w-full">
            <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2] text-center mt-3">No chats start yeat !</h1>
          </div>
        }

      </div>

      {
        image &&
        <div className="w-full h-12 border-t border-[#483064] flex items-center justify-between px-1 rounded-br-lg py-1 gap-2">
          <img className="h-full w-12 rounded ml-2 opacity-70" src={image} alt="" />
          <p className="flex items-center gap-3 mr-3">Click Here To Send <FiCornerRightDown className="text-xl"/></p>
        </div>
      }

      {
        video &&
        <div className="w-full h-16 border-t border-[#483064] flex items-center justify-between px-1 rounded-br-lg py-1 gap-2">
          <video className="h-12 w-fit rounded ml-2 opacity-50" src={video} alt="video"></video>
          <p className="flex items-center gap-3 mr-3">Click Here To Send <FiCornerRightDown className="text-xl"/></p>
        </div>
      }

      <div className="w-full h-12 border-t border-[#483064] flex items-center justify-between px-1 rounded-br-lg py-1 gap-2">

        <Menu 
          placement="top-start" 
          dismiss={{
            itemPress: false,
          }}  
          animate={{
            mount: { y: 0 },
            unmount: { y: 50 },
          }}>
          <MenuHandler>
            <Button className="text-white bg-transparent hover:bg-[#2f1f41] duration-300 h-full p-0 w-10 flex items-center justify-center text-xl"><PiLinkSimpleBold /></Button>
          </MenuHandler>
          <MenuList className="p-1 border border-[#b077f1] gro">
            
            <MenuItem className="py-0 h-9">
              <label htmlFor="image" className="cursor-pointer flex items-center justify-start gap-5 text-black font-semibold w-full h-full"><MdPhotoLibrary className="text-lg"/> Image </label>
              <input onChange={(e) => handleUploadImage(e)} type="file" className="hidden" id="image" name="image" accept="image/*"/>
            </MenuItem>

            <MenuItem className="py-0 h-9">
              <label htmlFor="video" className="cursor-pointer flex items-center justify-start gap-5 text-black font-semibold w-full h-full"><IoVideocam className="text-lg"/> Video </label>
              <input onChange={(e) => handleUploadVideo(e)} type="file" className="hidden" id="video" name="video" accept="video/*"/>
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

      <dialog id="customModalForUpload" className="modal">
        <div className="modal-box bg-[#010313] p-10">

          <form method="dialog">
            <button onClick={() => {
              setImage("");
              setVideo("");
            }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <div className="w-full flex flex-col items-center justify-center">
            
            {
              loading &&
              <Lottie animationData={loader} loop={true}/>
            }

            {
              video &&
              <div className="flex flex-col gap-3">
                <video className="w-full rounded-lg" controls src={video}></video>
                <button onClick={handleVideoSend} className="btn w-full bg-gradient-to-r from-purple-400 to-[#00FFB2] text-[#dccaff]">Continue</button>
              </div>
            }

            {
              image &&
              <div className="flex flex-col gap-3">
                <img className="w-full rounded-lg" src={image} alt="image" />
                <button onClick={handleImageSend} className="btn w-full bg-gradient-to-r from-purple-400 to-[#00FFB2] text-[#dccaff]">Continue</button>
              </div>
            }

          </div>

        </div>
      </dialog>

    </div>
  );
};

export default MessagePage;
