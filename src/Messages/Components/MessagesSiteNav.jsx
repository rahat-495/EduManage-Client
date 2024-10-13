
import { BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@material-tailwind/react";

const MessagesSiteNav = () => {

    const userData = useSelector(state => state?.user) ;
    const axiosSecure = useAxiosSecure() ;

    const {data} = useQuery({
        queryKey : ['myClassMates' , userData?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/myClassMates?email=${userData?.email}`) ;
            return data ;
        }
    })

    const handleSearch = async (e) => {
        e.preventDefault() ;
        const search = e.target.search.value ;
        console.log(search) ;
    } 

    return (
        <div className="bg-[#170F21] w-64 min-h-[80vh] rounded-l-lg flex flex-col">
            
            <h1 className=" border-b rounded-tl-lg px-5 py-2 text-xl mx-2">Chats</h1>

            <form onSubmit={handleSearch} className="mt-3 px-2 relative">
                <input name="search" type="text" className="bg-transparent border border-b-[#00FFB2] border-gray-700 outline-none border-b-2 rounded-[4px] w-full py-1 pr-6 pl-1 gro" placeholder="Search Users..."/>
                <button className="absolute top-[10px] right-[14px]"><BiSearchAlt className=""/></button>
            </form>

            <div className="flex flex-col items-start gap-4 px-2 mt-5">
                {
                    data?.length > 0 &&
                    data?.map((user) => <div key={user?._id} className="flex items-start gap-3 hover:bg-[#241833] w-full rounded-md cursor-pointer p-1 duration-200">
                        <Avatar src={user?.studentImage}/>
                        <div className="flex flex-col gro">
                            <p className="capitalize">{user?.studentName}</p>
                            <p className="">{user?.studentEmail?.length < 8 ? user?.studentEmail : user?.studentEmail?.slice(0,20)+"..."}</p>
                        </div>
                    </div>) 
                }
            </div>

        </div>
    );
};

export default MessagesSiteNav;
