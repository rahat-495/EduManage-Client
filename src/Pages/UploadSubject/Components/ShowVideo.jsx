
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Lottie from "lottie-react";
import useAuth from "../../../Hooks/useAuth";
import loader from "../../../../public/roundedLoader.json";

const ShowVideo = () => {

    const {loading} = useAuth() ;
    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const moduleId = pathname.split('/')[7] ;
    const videoNumber = pathname.split('/')[6] ;
    
    const {data , isLoading} = useQuery({
        queryKey : ['moduleVideo' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/moduleVideo?moduleId=${moduleId}&videoIndexNumber=${videoNumber}`) ;
            return data ;
        }
    })

    if(isLoading , loading){
        return <Lottie animationData={loader} loop/>
    }

    return (
        <div className="flex items-center justify-center h-[60vh] overflow-hidden p-[2px] w-full bg-[#010313] rounded-md">
            <video autoPlay controls src={data?.video?.moduleVideo} className="w-full h-full rounded"></video>
        </div>
    );
};

export default ShowVideo;
