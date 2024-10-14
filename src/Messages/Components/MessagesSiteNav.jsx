
import { BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@material-tailwind/react";
import { useState } from "react";

const MessagesSiteNav = () => {

    const axiosSecure = useAxiosSecure() ;
    const userData = useSelector(state => state?.user) ;
    const [search , setSearch] = useState("")

    const {data : conversations} = useQuery({
        queryKey : ['myClassMates' , userData?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/myClassMates?email=${userData?.email}`) ;
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
        if(search){
            document.getElementById('searchUsersModal').showModal() ;
        }
    } 

    return (
        <div className="bg-[#170F21] w-64 min-h-[80vh] rounded-l-lg flex flex-col">
            
            <h1 className=" border-b rounded-tl-lg px-5 py-2 text-xl mx-2">Chats</h1>

            <form onSubmit={handleSearch} className="mt-3 px-2 relative">
                <input onChange={(e) => setSearch(e.target.value)} name="search" type="text" className="bg-transparent border border-b-[#00FFB2] border-gray-700 outline-none border-b-2 rounded-[4px] w-full py-1 pr-6 pl-1 gro" placeholder="Name / Email"/>
                <button className="absolute top-[10px] right-[14px]"><BiSearchAlt className=""/></button>
            </form>

            <div className="flex flex-col items-start gap-4 px-2 mt-5">
                {
                    conversations?.length > 0 &&
                    conversations?.map((user) => <div key={user?._id} className="flex items-start gap-3 hover:bg-[#241833] w-full rounded-md cursor-pointer p-1 duration-200">
                        <Avatar src={user?.studentImage}/>
                        <div className="flex flex-col gro">
                            <p className="capitalize">{user?.studentName}</p>
                            <p className="">{user?.studentEmail?.length < 8 ? user?.studentEmail : user?.studentEmail?.slice(0,20)+"..."}</p>
                        </div>
                    </div>) 
                }
            </div>

            <dialog id="searchUsersModal" className="modal">
                <div className="modal-box bg-[#0F172A]">

                    <div className="gro flex flex-col gap-2">
                        {
                            students?.length > 0 && students?.map((data) => <div key={data?._id} className="flex border-b duration-300 text-white hover:text-[#C7ABFF] hover:border-[#C7ABFF] hover:rounded rounded-none p-2 gap-3 cursor-pointer">
                                <Avatar src={data?.image} className="border border-[#C7ABFF]"/>
                                <div className="flex flex-col gro ">
                                    <p className="capitalize">{data?.name}</p>
                                    <p className="">{data?.email}</p>
                                </div>
                            </div>)
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
