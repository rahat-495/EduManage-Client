
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ShowVideo = () => {

    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const moduleId = pathname.split('/')[7] ;
    const videoNumber = pathname.split('/')[6] ;
    
    const {data} = useQuery({
        queryKey : ['moduleVideo' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/moduleVideo?moduleId=${moduleId}&videoIndexNumber=${videoNumber}`) ;
            return data ;
        }
    })

    return (
        <div className="flex items-center justify-center h-[60vh] overflow-hidden p-1 w-full bg-[#010313] rounded">
            <video autoPlay controls src={data?.video?.moduleVideo} className="w-full h-full rounded"></video>
        </div>
    );
};

export default ShowVideo;
