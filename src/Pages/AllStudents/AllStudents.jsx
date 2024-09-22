
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllStudents = () => {

    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;

    const {data} = useQuery({
        queryKey : ['allStudents' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/allStudents?email=${user?.email}`) ;
            return data ;
        }
    })
    console.log(data) 

    return (
        <div className="min-h-[70vh] flex flex-col items-center gap-5">

            <h1 className="gro text-white text-4xl">All Students</h1>

        </div>
    );
};

export default AllStudents;
