
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const YourClassSubs = () => {

    const {id} = useParams() ;
    const axiosSecure = useAxiosSecure() ;
    const {user} = useAuth() ;

    const {data} = useQuery({
        queryKey : ['yourClasses' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/subjects?id=${id}`)
            return data ;
        }
    })
    console.log(data?.subjectsArray)

    return (
        <div className="min-h-[70vh]">
            <h1 className="gro text-4xl text-center my-20 text-white">{data?.className}</h1>
            <div className="grid grid-cols-5 gap-5">
                {
                    data?.subjectsArray?.map((sub , index) => 
                    <div key={index} className="px-5 py-10 bg-white rounded-md">
                        <h1 className="gro text-xl text-black font-semibold capitalize text-center">{sub}</h1>
                    </div>)
                }
            </div>
        </div>
    );
};

export default YourClassSubs;
