
/* eslint-disable react-hooks/exhaustive-deps */
import { BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Avatar , Dialog , IconButton } from "@material-tailwind/react";
import { useState } from "react";
import {NavLink, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

const usersSkelatonArr = [1,2,3,4,5,6,7,8] ;

const MessagesSiteNav = ({isResponsive , closeDrawer}) => {

    const navigate = useNavigate() ;
    const axiosSecure = useAxiosSecure() ;
    const [search , setSearch] = useState("") ;
    const userData = useSelector(state => state?.user) ;
    const [open, setOpen] = useState(false);

    const {data : conversations , refetch , isLoading} = useQuery({
        queryKey : ['conversations' , userData?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/conversations?uid=${userData?.studentUid}`) ;
            return data ;
        }
    })

    const {data : students} = useQuery({
        queryKey : ['studentsForConversation' , search] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/studentsForConversation?email=${userData?.email}&search=${search}`) ;
            return data ;
        }
    })

    const handleSearch = async (e) => {
        e.preventDefault() ;
        e.target.reset() ;
        if(search){
            handleOpen() ;
        }
    } 

    const handleConversation = async (receiverData) => {
        const conversationData = { 
            sender : userData?.studentUid , 
            senderName : userData?.name ,
            senderEmail : userData?.email ,
            senderImage : userData?.image ,
            receiver : receiverData?.studentUid , 
            receiverName : receiverData?.name , 
            receiverEmail : receiverData?.email , 
            receiverImage : receiverData?.image , 
            isSenderOnline : false ,
            isReceiverOnline : false ,
            participants : [ userData?.studentUid , receiverData?.studentUid ] ,
            lastMessage : "" ,
        }
        const {data} = await axiosSecure.post(`/conversation` , conversationData)
        if(data?._id){
            refetch() ;
            navigate(`/message/${receiverData?.studentUid}`) ;
            handleOpen() ;
        }
        else{
            handleOpen() ;
            Swal.fire({
                title: "Oops!",
                text: "You Already Start Conversation With Him !",
                icon: "warning"
            });
        }
    }

    const handleOpen = () => setOpen(!open);

    return (
        <div className={`bg-[#170F21] w-64 min-h-[80vh] rounded-l-lg ${isResponsive === "mobile" ? "flex w-full" : "hidden"} flex-col lg:flex`}>
            
            <h1 className={`border-[#483064] border-b rounded-tl-lg lg:px-2 py-3 text-xl mx-2 my-1 ${isResponsive === "mobile" ? "flex items-center justify-between px-0 mx-0" : ""}`}>
                Chats 
                {
                    isResponsive === "mobile" && 
                    <IconButton variant="text" color="white" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                } 
            </h1>

            <form onSubmit={handleSearch} className="mt-3 px-2 relative">
                <input onPaste={(e) => setSearch(e.target.value)} onChange={(e) => setSearch(e.target.value)} name="search" type="text" className="bg-transparent border border-b-[#00FFB2] border-gray-700 outline-none border-b-2 rounded-[4px] w-full py-1 pr-6 pl-1 gro" placeholder="Name / Email"/>
                <button className="absolute top-[10px] right-[14px]"><BiSearchAlt className=""/></button>
            </form>

            <div className="flex flex-col items-start gap-4 px-2 mt-5 w-full overflow-y-auto h-[65vh]">
                {
                    isLoading ?
                    usersSkelatonArr?.map((user) => <div key={user} className="flex w-60 flex-col p-1 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="skeleton h-12 w-12 shrink-0 rounded-full bg-[#241833]"></div>
                            <div className="flex flex-col gap-4">
                                <div className="skeleton h-4 w-20 bg-[#241833]"></div>
                                <div className="skeleton h-4 w-28 bg-[#241833]"></div>
                            </div>
                        </div>
                    </div>):
                    conversations?.length > 0 ?
                    conversations?.map((user) => <NavLink onClick={closeDrawer} to={`/message/${userData?.studentUid === user?.receiver ? user?.sender : user?.receiver}`} key={user?._id} className={({ isActive, isPending }) =>
                        isPending ? "pending w-full" : isActive ? "active w-full bg-[#241833] rounded-md" : "w-full"
                      }>
                        <div className={`flex items-start gap-3 hover:bg-[#241833] w-full rounded-md cursor-pointer p-1 duration-200 `}>
                            <div className="relative">
                                <Avatar src={userData?.studentUid === user?.receiver ? user?.senderImage : user?.receiverImage}/>
                                {
                                    userData?.studentUid === user?.sender?
                                    user?.isReceiverOnline ?
                                    <div className="absolute w-[10px] h-[10px] bg-[#00FF00] border border-white rounded-full bottom-1 right-0"></div>:
                                    <div className="absolute w-[10px] h-[10px] bg-[#808080] border border-white rounded-full bottom-1 right-0"></div>:
                                    user?.isSenderOnline ?
                                    <div className="absolute w-[10px] h-[10px] bg-[#00FF00] border border-white rounded-full bottom-1 right-0"></div>:
                                    <div className="absolute w-[10px] h-[10px] bg-[#808080] border border-white rounded-full bottom-1 right-0"></div>
                                }
                            </div>
                            <div className="flex flex-col gro">
                                <p className="capitalize">{userData?.studentUid === user?.receiver ? user?.senderName : user?.receiverName}</p>
                                <p className="text-base flex items-center">
                                    {   !user?.lastMessage ?
                                        userData?.studentUid === user?.receiver ? user?.senderEmail?.length > 16 ? user?.senderEmail : user?.senderEmail?.slice(0,20)+"..." : user?.receiverEmail?.length > 16 ? user?.receiverEmail : user?.receiverEmail?.slice(0,20)+"..."  :
                                        user?.lastMessage?.length > 12 ? user?.lastMessage?.slice(0,12) + "..." : user?.lastMessage
                                    }
                                </p>
                            </div>
                        </div>
                    </NavLink>):
                    <div className="w-full mt-64">
                        <p className="gro font-semibold text-center">No Conversation Start Yet !</p>
                    </div>
                }
            </div>

            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
                }}
                className="flex items-center justify-center"
            >
                <div className="modal-box bg-[#0F172A] w-full h-full">

                    <div className="gro flex flex-col gap-2">
                        {
                            students?.length > 0 ? students?.map((data) => <div key={data?._id} onClick={() => handleConversation(data)} className="flex border-b border-white duration-300 text-white hover:text-[#C7ABFF] hover:border-[#C7ABFF] p-2 gap-3 cursor-pointer">
                                <Avatar src={data?.image} className="border border-[#C7ABFF]"/>
                                <div className="flex flex-col gro ">
                                    <p className="capitalize">{data?.name}</p>
                                    <p className="">{data?.email}</p>
                                </div>
                            </div>) :
                            <div className="w-full">
                                <p className="gro font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2] text-4xl mb-3">Oops</p>
                                <p className="gro font-semibold text-center text-[#C7ABFF]">No Students Found In This Name / Email !</p>
                            </div>
                        }
                    </div>

                    <div className="modal-action w-full flex items-center justify-center">
                        <button className="btn w-full text-white gro bg-gradient-to-r from-purple-400 to-[#00FFB2]" onClick={handleOpen}>Close</button>
                    </div>

                </div>
            </Dialog>

        </div>
    );
};

export default MessagesSiteNav;
