
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

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

    console.log(data?.subjectsArray?.length)

    return (
        <div className="min-h-[70vh]">
            
            <h1 className="gro text-4xl text-center my-10">My Classes</h1>
            
            <div className={`grid ${data?.subjectsArray?.length <= 5 && 'grid-cols-'+data?.subjectsArray?.length || data?.subjectsArray?.length === 6 && 'grid-cols-3' || data?.subjectsArray?.length === 7 && 'grid-cols-3' || data?.subjectsArray?.length === 8 && 'grid-cols-4' || data?.subjectsArray?.length === 9 && 'grid-cols-5' || data?.subjectsArray?.length >= 10 && 'grid-cols-5'} gap-3`}>
                {
                    data?.subjectsArray?.length > 0 && data?.subjectsArray?.map((sub , index) => 
                    <div key={index} className="px-5 py-10 bg-white rounded-md border hover:border-purple-500 bg-gradient-to-r from-purple-500 to-teal-500 duration-500 cursor-pointer">
                        <h1 className="text-white text-center text-xl gro capitalize">{sub}</h1>
                    </div>
                    )
                }
            </div>

        </div>
    );
};

export default MyClasses;
