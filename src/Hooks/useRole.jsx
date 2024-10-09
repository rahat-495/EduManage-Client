
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import {useQuery} from "@tanstack/react-query";

const useRole = () => {
    
    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;

    const {data : role , isLoading} = useQuery({
        queryKey : ['userRole' , user],
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/userRole?email=${user?.email}`) ;
            if(data?.role){
                return data?.role ;
            }
        }
    })

    return { role , isLoading } ;

};

export default useRole;
