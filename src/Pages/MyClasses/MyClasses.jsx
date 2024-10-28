
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const MyClasses = () => {

    const axiosSecure = useAxiosSecure() ;
    const {user} = useAuth() ;

    const {data} = useQuery({
        queryKey : ['yourClasses' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/yourClasses?email=${user?.email}&userUid=${user?.uid}`)
            return data ;
        }
    })

    console.log(data)

    return (
        <div className="min-h-[70vh]">
            
            <h1 className="gro text-4xl text-center my-10">My Classes</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {
                    data?.lenght > 0 && data?.subjectsArray?.map((sub , index) => 
                    <div key={index} className="px-5 py-10 bg-white rounded-md">
                        <h1 className="gro text-xl text-black font-semibold capitalize text-center">{sub}</h1>
                    </div>
                    )
                }
            </div>

        </div>
    );
};

export default MyClasses;
