
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import useAuth from "../../Hooks/useAuth";
import loader from "../../../public/roundedLoader.json";

const MyModuleImage = () => {
    
    const {loading} = useAuth() ;
    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const moduleId = pathname.split('/')[6] ;
    const imageNumber = pathname.split('/')[5] ;
    
    const {data , isLoading} = useQuery({
        queryKey : ['moduleImage' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/moduleImage?moduleId=${moduleId}&imageIndexNumber=${imageNumber}`) ;
            return data ;
        }
    })

    if(isLoading , loading){
        return <div className="w-full h-[50vh] flex items-center justify-center"><Lottie className="w-40 h-40" animationData={loader} loop/></div>
    }

    return (
        <div className="w-full h-[60vh] p-[2px] bg-[#010313] rounded-md overflow-hidden">
            <img src={data?.image?.moduleImage} alt="" className="w-full h-full rounded-md"/>
        </div>
    );
};

export default MyModuleImage;
