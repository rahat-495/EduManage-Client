
import { BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@material-tailwind/react";
import { useState } from "react";
import {Link} from 'react-router-dom'

const MessagesSiteNav = () => {

    const axiosSecure = useAxiosSecure() ;
    const [search , setSearch] = useState("") ;
    const userData = useSelector(state => state?.user) ;

    const {data : conversations , refetch} = useQuery({
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
            document.getElementById('searchUsersModal').showModal() ;
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
            participants : [ userData?.studentUid , receiverData?.studentUid ] ,
            lastMessage : "" ,
        }
        const {data} = await axiosSecure.post(`/conversation` , conversationData)
        if(data?._id){
            refetch() ;
            document.getElementById("searchUsersModal").close() ;
        }
    }

    return (
        <div className="bg-[#170F21] w-64 min-h-[80vh] rounded-l-lg flex flex-col">
            
            <h1 className="border-[#483064] border-b rounded-tl-lg px-2 py-3 text-xl mx-2 my-1">Chats</h1>

            <form onSubmit={handleSearch} className="mt-3 px-2 relative">
                <input onChange={(e) => setSearch(e.target.value)} name="search" type="text" className="bg-transparent border border-b-[#00FFB2] border-gray-700 outline-none border-b-2 rounded-[4px] w-full py-1 pr-6 pl-1 gro" placeholder="Name / Email"/>
                <button className="absolute top-[10px] right-[14px]"><BiSearchAlt className=""/></button>
            </form>

            <div className="flex flex-col items-start gap-4 px-2 mt-5 w-full">
                {
                    conversations?.length > 0 ?
                    conversations?.map((user) => <Link to={`/message/${user?.receiver}`} key={user?._id} className="w-full">
                        <div className="flex items-start gap-3 hover:bg-[#241833] w-full rounded-md cursor-pointer p-1 duration-200">
                            <Avatar src={user?.receiverImage}/>
                            <div className="flex flex-col gro">
                                <p className="capitalize">{user?.receiverName}</p>
                                <p className="">{user?.receiverEmail?.length > 16 ? user?.receiverEmail : user?.receiverEmail?.slice(0,20)+"..."}</p>
                            </div>
                        </div>
                    </Link>):
                    <div className="w-full mt-64">
                        <p className="gro font-semibold text-center">No Conversation Found Yet !</p>
                    </div>
                }
            </div>

            <dialog id="searchUsersModal" className="modal">
                <div className="modal-box bg-[#0F172A]">

                    <div className="gro flex flex-col gap-2">
                        {
                            students?.length > 0 ? students?.map((data) => <Link onClick={() => handleConversation(data)} to={`/message/${data?.studentUid}`} key={data?._id}>
                                <div className="flex border-b duration-300 text-white hover:text-[#C7ABFF] hover:border-[#C7ABFF] hover:rounded rounded-none p-2 gap-3 cursor-pointer">
                                    <Avatar src={data?.image} className="border border-[#C7ABFF]"/>
                                    <div className="flex flex-col gro ">
                                        <p className="capitalize">{data?.name}</p>
                                        <p className="">{data?.email}</p>
                                    </div>
                                </div>
                            </Link>) :
                            <div className="w-full">
                                <p className="gro font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2] text-4xl mb-3">Oops</p>
                                <p className="gro font-semibold text-center text-[#C7ABFF]">No Students Found In This Name !</p>
                            </div>
                        }
                    </div>

                    <div className="modal-action w-full flex items-center justify-center">
                        <form method="dialog" className="w-full">
                            <button className="btn w-full bg-gradient-to-r from-purple-400 to-[#00FFB2] text-[#dccaff]">Close</button>
                        </form>
                    </div>

                </div>
            </dialog>

        </div>
    );
};

export default MessagesSiteNav;
