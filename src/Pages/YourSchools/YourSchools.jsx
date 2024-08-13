
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";

const YourSchools = () => {

    const axiosSecure = useAxiosSecure() ;
    const {user} = useAuth() ;

    const {data} = useQuery({
        queryKey : ['yourSchools' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/yourSchools?email=${user?.email}`)
            return data ;
        }
    })

    return (
        <div className="min-h-[70vh]">
            
            <h1 className="gro text-4xl text-center my-10">Your Schools</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {
                    data?.map((school) => 
                        <Link to={`/schoolsDetails/${school._id}`} key={school?._id}>
                            <Tooltip placement="top-end" content="Click to Show Details" animate={{mount: { scale: 1, y: 0 },unmount: { scale: 0, y: 25 },}}>
                                <div className="border grid grid-cols-5 bg-white max-h-52 rounded-lg gap-3 py-3 px-3">
                                    <img src={school?.schoolLogo} alt="" className="h-44 w-44 col-span-2" />
                                    <div className="col-span-3 gro flex flex-col items-start gap-2 mt-2">
                                        <h1 className="text-lg text-black font-semibold ">Name: {school?.schoolName}</h1>
                                        <p className="text-black font-semibold">ID: {school?._id}</p>
                                        <p className="text-black font-semibold">Address: {school?.address.length > 21 ? school?.address.slice(0,18) + "..." : school?.address}</p>
                                        <p className="text-black font-semibold capitalize">Principal Name: <span className="play text-sm">{school?.principalName}</span></p>
                                        <p className="text-black font-semibold">School Type : {school?.schoolType}</p>
                                    </div>
                                </div>
                            </Tooltip>
                        </Link>
                    )
                }
            </div>

        </div>
    );
};

export default YourSchools;
