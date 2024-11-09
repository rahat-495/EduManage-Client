
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyModuleImage = () => {
    
    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const moduleId = pathname.split('/')[6] ;
    const imageNumber = pathname.split('/')[5] ;
    
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

export default MyModuleImage;
