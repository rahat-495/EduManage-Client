
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "../Shared/Navbar/Nav";
import Footer from "../Shared/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useState } from "react";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa6";
import ModuleData from "../Pages/UploadSubject/Components/ModuleData";
import { Button } from "@material-tailwind/react";

const MyClassesRoot = () => {

    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const navigate = useNavigate() ;
    const userData = useSelector(state => state?.user) ;
    const [moduleClick, setModuleClick] = useState([]) ;

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

    const handleDropDown = (id) => {
        if(!moduleClick.includes(id)){
            setModuleClick([...moduleClick , id]) ;
        }
        else{
            const removeClick = moduleClick.filter((removedId) => removedId !== id && removedId ) ;
            setModuleClick(removeClick) ;
        }
    }

    const handlePrevious = () => {
        if(pathname.includes('/textinstruction/')){
            console.log(pathname)
        }

        else if(pathname.includes('/images/') && 0 === parseInt(pathname.split('/')[5])){
            navigate(`textinstruction/${pathname.split('/')[6]}`) ;
        }

        else if(pathname.includes('/images/') && moduleDetails?.moduleData[1]?.moduleImages?.length - 1 <= parseInt(pathname.split('/')[5])){
            navigate(`images/${parseInt(pathname.split('/')[5]) - 1}/${pathname.split('/')[6]}/${moduleDetails?.moduleData[1]?.moduleImages[parseInt(pathname.split('/')[5])-1]?.imageName?.split(' ').join('_')}`) ;
        }

        else if(pathname.includes('/videos/') && 0 === parseInt(pathname.split('/')[5]) && moduleDetails?.moduleData[1]?.moduleImages?.length > 0){
            navigate(`images/${moduleDetails?.moduleData[1]?.moduleImages?.length - 1}/${pathname.split('/')[6]}/${moduleDetails?.moduleData[1]?.moduleImages[moduleDetails?.moduleData[1]?.moduleImages?.length - 1]?.imageName?.split(' ').join('_')}`) ;
        }

        else if(pathname.includes('/videos/') && moduleDetails?.moduleData[2]?.moduleVideos?.length - 1 >= parseInt(pathname.split('/')[5])){
            navigate(`videos/${parseInt(pathname.split('/')[5]) - 1}/${pathname.split('/')[6]}/${moduleDetails?.moduleData[2]?.moduleVideos[parseInt(pathname.split('/')[5])-1]?.videoName?.split(' ').join('_')}`) ;
        }
    }
    
    const handleNext = () => {
        if(pathname.includes('/textinstruction/')){
            if(moduleDetails?.moduleData[1]?.moduleImages?.length > 0){
                navigate(`images/0/${pathname.split('/')[5]}/${moduleDetails?.moduleData[1]?.moduleImages[0].imageName?.split(' ').join('_')}`)
            }
            else if(moduleDetails?.moduleData[2]?.moduleVideos?.length > 0){
                navigate(`videos/0/${pathname.split('/')[5]}/${moduleDetails?.moduleData[2]?.moduleVideos[0].imageName?.split(' ').join('_')}`)
            }
        }

        if(pathname.includes('/images/') && moduleDetails?.moduleData[1]?.moduleImages?.length - 1 > parseInt(pathname.split('/')[5])){
            navigate(`images/${parseInt(pathname.split('/')[5]) + 1}/${pathname.split('/')[6]}/${moduleDetails?.moduleData[1]?.moduleImages[parseInt(pathname.split('/')[5])+1]?.imageName?.split(' ').join('_')}`) ;
        }

        if(pathname.includes('/images/') && moduleDetails?.moduleData[1]?.moduleImages?.length - 1 === parseInt(pathname.split('/')[5]) && moduleDetails?.moduleData[2]?.moduleVideos?.length > 0){
            navigate(`videos/0/${pathname.split('/')[6]}/${moduleDetails?.moduleData[2]?.moduleVideos[0]?.videoName?.split(' ').join('_')}`) ;
        }

        if(pathname.includes('/videos/') && moduleDetails?.moduleData[2]?.moduleVideos?.length - 1 > parseInt(pathname.split('/')[5])){
            navigate(`videos/${parseInt(pathname.split('/')[5]) + 1}/${pathname.split('/')[6]}/${moduleDetails?.moduleData[2]?.moduleVideos[parseInt(pathname.split('/')[5])+1]?.videoName?.split(' ').join('_')}`) ;
        }
    }

    return (
        <div className="overflow-x-hidden lg:overflow-visible">

            <div className="sticky top-0 z-50 bg-opacity-0 backdrop-blur-md">
                <Nav/>
            </div>

            <div className="max-w-[1440px] min-h-[70vh] mx-auto overflow-hidden lg:mb-10 lg:mt-8">

                {
                    moduleDetails?.moduleName && 
                    <div className="flex items-center gap-3 border-b border-[#302442] mb-2 pb-1">
                        <Link to={`/myClasses`} className="bg-gradient-to-r from-[#CC45E1] to-[#6B0DEC] rounded-full p-[2px] text-[#0F172A]">
                            <FaArrowLeft className=""/>
                        </Link>
                        <h1 className="gro text-xl font-semibold text-[#EAAAFF] w-full">
                            {pathname.split('/')[4] === 'textinstruction' && 'Text Instruction : ' + moduleDetails?.moduleName}
                            {pathname.split('/')[4] === 'images' && moduleDetails?.moduleData[1]?.moduleImages[pathname.split('/')[5]]?.imageName}
                            {pathname.split('/')[4] === 'videos' && moduleDetails?.moduleData[2]?.moduleVideos[pathname.split('/')[5]]?.videoName}
                        </h1>
                    </div>
                }

                <div className="lg:flex lg:items-start lg:justify-between gap-3 h-full">

                    <div className="w-full rounded flex flex-col gap-3">
                        <Outlet />
                        {
                            pathname.split('/')[4] === 'textinstruction' && 
                            <div className="flex items-center justify-end gap-5 mr-5">
                                <Button onClick={handlePrevious} className="bg-transparent capitalize px-4 py-1 text-lg font-semibold border border-[#7D48BF] gro hover:text-[#d3aeff] duration-300 rounded">Previous</Button>
                                <Button onClick={handleNext} className="px-8 py-1 text-lg capitalize bg-gradient-to-r from-[#DF80FF] to-[#9286FA] hover:from-[#df80ffd2] hover:to-[#9286face] text-black gro rounded font-semibold duration-300">Next</Button>
                            </div>
                        }
                        {
                            pathname.split('/')[4] === 'images' && 
                            <div className="flex items-center justify-end gap-5 mr-5">
                                <Button onClick={handlePrevious} className="bg-transparent capitalize px-4 py-1 text-lg font-semibold border border-[#7D48BF] gro hover:text-[#d3aeff] duration-300 rounded">Previous</Button>
                                <Button onClick={handleNext} className="px-8 py-1 text-lg capitalize bg-gradient-to-r from-[#DF80FF] to-[#9286FA] hover:from-[#df80ffd2] hover:to-[#9286face] text-black gro rounded font-semibold duration-300">Next</Button>
                            </div>
                        }
                        {
                            pathname.split('/')[4] === 'videos' && 
                            <div className="flex items-center justify-end gap-5 mr-5">
                                <Button onClick={handlePrevious} className="bg-transparent capitalize px-4 py-1 text-lg font-semibold border border-[#7D48BF] gro hover:text-[#d3aeff] duration-300 rounded">Previous</Button>
                                <Button onClick={handleNext} className="px-8 py-1 text-lg capitalize bg-gradient-to-r from-[#DF80FF] to-[#9286FA] hover:from-[#df80ffd2] hover:to-[#9286face] text-black gro rounded font-semibold duration-300">Next</Button>
                            </div>
                        }
                    </div>

                    <div className="w-[550px] h-[80vh] max-h-[100vh] bg-[#010313] rounded flex flex-col gap-3 overflow-y-auto scrollbar-thin">

                        <div className="h-[80vh] grid grid-rows-1 gap-1">

                            <div className="h-full w-full flex flex-col items-start gap-3 bg-transparent p-2 rounded overflow-auto scrollbar-thin">
                                {
                                    modules?.length > 0 && modules?.map((data) => 
                                    <div key={data?._id} className={`bg-[#211336] w-full py-1 px-2 rounded duration-1000 cursor-pointer`}
                                    >
                                        <div onClick={() => handleDropDown(data?._id)} className="cursor-pointer flex items-center justify-between">
                                            <div className="flex flex-col items-start">
                                                <p className="gro font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-[#5457FE]">{data?.moduleName}</p>
                                                <p className="gro text-sm text-[#C7ABFF]">{data?.time} {data?.date.split(' ').slice(2 , 3)} {data?.date.split(' ').slice(3)}</p>
                                            </div>

                                            {
                                                moduleClick?.includes(data?._id) ? 
                                                <p className={`bg-gradient-to-br from-purple-500 p-[2px] to-[#5457FE] rounded ${moduleClick.includes(data?._id) && 'rotate-180 duration-700'}`}>
                                                    <FaMinus className={`text-lg bg-[#211336]`}/>
                                                </p> :
                                                <p className={`bg-gradient-to-br from-purple-500 p-[2px] to-[#5457FE] rounded ${!moduleClick.includes(data?._id) && '-rotate-90 duration-500'}`}>
                                                    <FaPlus className="text-lg"/>
                                                </p>
                                            }
                                        </div>

                                        <div className={`${moduleClick.includes(data?._id) && 'mt-5 border-t py-2 border-gray-700'}`}>

                                            {
                                                moduleClick.includes(data?._id) && data?.moduleData?.map((moduleData , index) => <ModuleData key={index} data={moduleData} id={data?._id}/>)
                                            }

                                        </div>

                                    </div>)
                                }
                            </div>

                            {/* <div className="h-full w-full flex flex-col items-start gap-3 p-2 bg-transparent rounded">
                                {
                                    assignments?.length > 0 && assignments?.map((data) => <NavLink to={`assignment/${data?._id}`} key={data?._id} className={({ isActive, isPending }) =>
                                        isPending ? "pending bg-[#211336] w-full py-1 px-2 rounded" : isActive ? "bg-[#3a215f] w-full py-1 px-2 rounded" : "bg-[#211336] w-full py-1 px-2 rounded duration-300"
                                    }
                                    >
                                        <p className="gro font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">{data?.moduleName}</p>
                                        <p className="gro font- text-[#C7ABFF]">{data?.time} {data?.date.split(' ').slice(2 , 3)} {data?.date.split(' ').slice(3)}</p>
                                    </NavLink>)
                                }
                            </div> */}

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
