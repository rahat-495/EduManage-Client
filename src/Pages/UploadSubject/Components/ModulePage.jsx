
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ModulePage = () => {

    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;

    const {data} = useQuery({
        queryKey : ['moduleData' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/moduleDetails?id=${pathname.split('/')[6]}`) ;
            return data ;
        }
    })
    console.log(data)

    return (
        <div className="w-full flex flex-col gap-3">
            
        </div>
    );
};

export default ModulePage;
