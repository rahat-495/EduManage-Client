
import { Link, Outlet, useLocation } from "react-router-dom";
import Nav from "../Shared/Navbar/Nav";
import Footer from "../Shared/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useState } from "react";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa6";
import ModuleData from "../Pages/UploadSubject/Components/ModuleData";

const MyClassesRoot = () => {

    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const userData = useSelector(state => state?.user) ;
    const [moduleClick, setModuleClick] = useState(false) ;

    const {data : modules} = useQuery({
        queryKey : ['myClassModules' , pathname , userData] ,
        queryFn : async () => {
            if(userData){
                const {data} = await axiosSecure.get(`/myClassModules?userUid=${userData?.studentUid}&subject=${pathname.split('/')[3]}`);
                return data ;
            }
        }
    })

    const {data : moduleDetails} = useQuery({
        queryKey : ['moduleData' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/moduleDetails?id=${pathname.split('/')[6].length < 10 ? pathname.split('/')[5] : pathname.split('/')[6]}`) ;
            return data ;
        }
    })

    console.log(moduleDetails?.moduleName)

    return (
        <div className="overflow-x-hidden lg:overflow-visible">

            <div className="sticky top-0 z-50 bg-opacity-0 backdrop-blur-md">
                <Nav/>
            </div>

            <div className="max-w-[1440px] min-h-[70vh] mx-auto overflow-hidden lg:mb-10">

                {
                    moduleDetails?.moduleName && 
                    <div className="flex items-center gap-3 border-b border-[#302442] mb-2 pb-1">
                        <Link to={`/myClasses`} className="bg-gradient-to-r from-[#CC45E1] to-[#6B0DEC] rounded-full p-[2px] text-[#0F172A]">
                            <FaArrowLeft className=""/>
                        </Link>
                        <h1 className="gro text-xl font-semibold text-[#EAAAFF] w-full">
                            {pathname.split('/')[4] === 'textInstruction' && 'Text Instruction : ' + moduleDetails?.moduleName}
                            {pathname.split('/')[4] === 'images' && moduleDetails?.moduleData[1]?.moduleImages[pathname.split('/')[5]]?.imageName}
                            {pathname.split('/')[4] === 'videos' && moduleDetails?.moduleData[2]?.moduleVideos[pathname.split('/')[5]]?.videoName}
                        </h1>
                    </div>
                }

                <div className="lg:flex lg:items-start lg:justify-between gap-3 h-full">

                    <div className="w-full h-[60vh] rounded bg-[#010313]">
                        <Outlet />
                    </div>

                    <div className="w-[550px] h-[80vh] max-h-[100vh] rounded flex flex-col gap-3 overflow-y-auto scrollbar-thin">

                        <div className="h-[80vh] grid grid-rows-2 gap-1">

                            <div className="h-full w-full flex flex-col items-start gap-3 p-2 bg-[#010313] rounded overflow-auto scrollbar-none">
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

                            <div className="h-full w-full flex flex-col items-start gap-3 p-2 bg-[#010313] rounded">
                                {
                                    // assignments?.length > 0 && assignments?.map((data) => <NavLink to={`assignment/${data?._id}`} key={data?._id} className={({ isActive, isPending }) =>
                                    //     isPending ? "pending bg-[#211336] w-full py-1 px-2 rounded" : isActive ? "bg-[#3a215f] w-full py-1 px-2 rounded" : "bg-[#211336] w-full py-1 px-2 rounded duration-300"
                                    // }
                                    // >
                                    //     <p className="gro font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">{data?.moduleName}</p>
                                    //     <p className="gro font- text-[#C7ABFF]">{data?.time} {data?.date.split(' ').slice(2 , 3)} {data?.date.split(' ').slice(3)}</p>
                                    // </NavLink>)
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
