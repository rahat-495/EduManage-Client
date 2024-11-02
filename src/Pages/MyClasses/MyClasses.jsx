
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";

const MyClasses = () => {

    const axiosSecure = useAxiosSecure() ;
    const {user} = useAuth() ;

    const {data} = useQuery({
        queryKey : ['myClasses' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/myClasses?email=${user?.email}&userUid=${user?.uid}`)
            return data ;
        }
    })

    return (
        <div className="min-h-[70vh] mx-3 mb-10 lg:mx-0 lg:mb-0">
            
            <h1 className="gro text-4xl text-center my-10">My Classes</h1>
            
            <div className={`grid grid-cols-1 ${data?.subjectsArray?.length <= 5 && 'lg:grid-cols-'+data?.subjectsArray?.length || data?.subjectsArray?.length === 6 && 'lg:grid-cols-3' || data?.subjectsArray?.length === 7 && 'lg:grid-cols-3' || data?.subjectsArray?.length === 8 && 'lg:grid-cols-4' || data?.subjectsArray?.length === 9 && 'lg:grid-cols-5' || data?.subjectsArray?.length >= 10 && 'lg:grid-cols-5'} gap-3`}>
                {
                    data?.subjectsArray?.length > 0 && data?.subjectsArray?.map((sub , index) => 
                    <Link to={`/myClasses/details/${sub}`} key={index} className="px-5 py-10 bg-white rounded-md border hover:border-purple-500 bg-gradient-to-r from-purple-500 to-teal-500 duration-500 cursor-pointer">
                        <h1 className="text-white text-center text-xl gro capitalize">{sub}</h1>
                    </Link>
                    )
                }
            </div>

        </div>
    );
};

export default MyClasses;
