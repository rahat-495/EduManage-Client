
import { Outlet } from "react-router-dom";
import Nav from "../Shared/Navbar/Nav";
import Footer from "../Shared/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ModuleData from "../Pages/UploadSubject/Components/ModuleData";

const MyClassesRoot = () => {

    const axiosSecure = useAxiosSecure() ;
    const {userData} = useSelector(state => state.user) ;
    const [moduleClick, setModuleClick] = useState(false) ;

    const {data : modules} = useQuery({
        queryKey : ['myClassModules' , userData] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/myClassModules?userData=${userData}`);
            return data ;
        }
    })

    return (
        <div className="overflow-x-hidden lg:overflow-visible">

            <div className="sticky top-0 z-50 bg-opacity-0 backdrop-blur-md">
                <Nav/>
            </div>

            <div className="max-w-[1440px] min-h-[70vh] mx-auto overflow-hidden lg:mb-10">
                <div className="lg:flex lg:items-start lg:justify-between gap-3 h-full">

                    <div className="w-full h-[60vh] rounded bg-[#010313]">
                        <Outlet />
                    </div>

                    <div className="bg-[#010313] w-[550px] h-[80vh] max-h-[100vh] rounded p-3 flex flex-col gap-3 overflow-y-auto scrollbar-thin">
                        <div className="h-[80vh] grid grid-rows-2 gap-1">
                            <div className="h-full w-full flex flex-col items-start gap-3 p-2 bg-[#160929] rounded overflow-auto scrollbar-none">
                                {
                                    modules?.length > 0 && modules?.map((data) => 
                                    <div key={data?._id} className={`bg-[#211336] w-full py-1 px-2 rounded duration-1000 cursor-pointer`}
                                    >
                                        <div onClick={() => {
                                            moduleClick === data?._id ?
                                            setModuleClick('') :
                                            setModuleClick(data?._id)
                                            }} className="cursor-pointer flex items-center justify-between">
                                            <div className="flex flex-col items-start">
                                                <p className="gro font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-[#5457FE]">{data?.moduleName}</p>
                                                <p className="gro text-sm text-[#C7ABFF]">{data?.time} {data?.date.split(' ').slice(2 , 3)} {data?.date.split(' ').slice(3)}</p>
                                            </div>

                                            {
                                                moduleClick === data?._id ? 
                                                <p className={`bg-gradient-to-br from-purple-500 p-[2px] to-[#5457FE] rounded ${moduleClick === data?._id && 'rotate-180 duration-500'}`}>
                                                    <FaMinus className={`text-lg bg-[#211336]`}/>
                                                </p> :
                                                <p className={`bg-gradient-to-br from-purple-500 p-[2px] to-[#5457FE] rounded ${moduleClick !== data?._id && '-rotate-90 duration-500'}`}>
                                                    <FaPlus className="text-lg"/>
                                                </p>
                                            }
                                        </div>

                                        <div className={`${moduleClick === data?._id && 'mt-5 border-t py-2 border-gray-700'}`}>

                                            {
                                                moduleClick === data?._id && data?.moduleData?.map((moduleData , index) => <ModuleData key={index} data={moduleData} id={data?._id}/>)
                                            }

                                        </div>

                                    </div>)
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="">
                <Footer/>
            </div>
        </div>
    );
};

export default MyClassesRoot;
