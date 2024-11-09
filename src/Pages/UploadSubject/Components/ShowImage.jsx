
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ShowImage = () => {

    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const moduleId = pathname.split('/')[7] ;
    const imageNumber = pathname.split('/')[6] ;
    
    const {data} = useQuery({
        queryKey : ['moduleImage' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/moduleImage?moduleId=${moduleId}&imageIndexNumber=${imageNumber}`) ;
            return data ;
        }
    })

    return (
        <div className="w-full h-ful bg-[#010313] rounded overflow-hidden">
            <img src={data?.image?.moduleImage} alt="" className="w-full h-full rounded-md"/>
        </div>
    );
};

export default ShowImage;
