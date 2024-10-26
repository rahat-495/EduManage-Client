
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SchoolsDetails = () => {

    const {id} = useParams() ;
    const axiosSecure = useAxiosSecure() ;

    const {data} = useQuery({
        queryKey : ['schoolDetails'] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/schoolsDetails?id=${id}`)
            return data ;
        }
    })

    return (
        <div className="min-h-[70vh] mx-3 lg:mx-0">

            <h1 className="play text-4xl text-white text-center mt-20 mb-10">Schools Details</h1>

            <div className="lg:w-4/5 mx-auto py-3 flex flex-col items-center justify-center lg:py-0 lg:h-[500px] rounded-md bg-white lg:grid grid-cols-5 gap-3 px-3">
                <img src={data?.schoolLogo} alt="" className="my-auto w-80 h-80 col-span-2"/>
                <div className="col-span-3 gro my-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 border border-teal-500 my-2 rounded-md w-full py-1 px-3">
                        <h1 className="text-xl text-black font-semibold ">Name: {data?.schoolName}</h1>
                        <h1 className="text-xl text-black font-semibold ">School Code: {data?.schoolCode}</h1>
                    </div>
                    <div className="grid grid-cols-1 border border-teal-500 my-2 rounded-md w-full py-1 px-3">
                        <p className="text-xl text-black font-semibold">School ID: {data?._id}</p>
                    </div>
                    <div className="grid grid-cols-1 border border-teal-500 my-2 rounded-md w-full py-1 px-3">
                        <p className="text-xl text-black font-semibold">School Type : {data?.schoolType}</p>
                    </div>
                    <div className="grid grid-cols-1 border border-teal-500 my-2 rounded-md w-full py-1 px-3">
                        <p className="text-xl text-black font-semibold">Address: {data?.address}</p>
                    </div>
                    <div className="grid grid-cols-1 border border-teal-500 my-2 rounded-md w-full py-1 px-3">
                        <p className="text-xl text-black font-semibold capitalize">Principal Name: <span className="play text-lg">{data?.principalName}</span></p>
                    </div>
                    <div className="grid grid-cols-1 border border-teal-500 my-2 rounded-md w-full py-1 px-3">
                        <p className="text-xl text-black font-semibold capitalize">Postal Code : {data?.postalCode}</p>
                    </div>
                    <div className="grid grid-cols-1 border border-teal-500 my-2 rounded-md w-full py-1 px-3">
                        <p className="text-xl text-black font-semibold capitalize">School Contact : {data?.phone}</p>
                    </div>
                    <div className="grid grid-cols-1 border border-teal-500 my-2 rounded-md w-full py-1 px-3">
                        <p className="text-xl text-black font-semibold capitalize">Principal Contact : {data?.principalContact}</p>
                    </div>
                    <div className="grid grid-cols-2 border border-teal-500 my-2 rounded-md w-full py-1 px-3 gap-3">
                        <Link to={`/update/${data?._id}`} className="rounded-lg py-2 text-center ease-in-out border border-teal-500 text-white hover:border-purple-500 capitalize  bg-teal-500 duration-500">Update</Link>
                        <Link to={`/viewClasses/${data?._id}`} className="rounded-lg py-2 text-center ease-in-out border border-teal-500 text-white hover:border-purple-500 capitalize  bg-teal-500 duration-500">View Classes</Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SchoolsDetails;
