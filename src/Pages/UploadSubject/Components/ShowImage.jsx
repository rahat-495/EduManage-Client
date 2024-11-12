
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Lottie from "lottie-react";
import loader from '../../../../public/roundedLoader.json'
import useAuth from "../../../Hooks/useAuth";

const ShowImage = () => {

    const {loading} = useAuth() ;
    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const moduleId = pathname.split('/')[7] ;
    const imageNumber = pathname.split('/')[6] ;
    
    const {data , isLoading} = useQuery({
        queryKey : ['moduleImage' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/moduleImage?moduleId=${moduleId}&imageIndexNumber=${imageNumber}`) ;
            return data ;
        }
    })

    if(isLoading , loading){
        return <Lottie animationData={loader} loop/>
    }

    return (
        <div className="w-full h-[60vh] bg-[#010313] rounded overflow-hidden p-1">
            <img src={data?.image?.moduleImage} alt="" className="w-full h-full rounded-md"/>
        </div>
    );
};

export default ShowImage;
