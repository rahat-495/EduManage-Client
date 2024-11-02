
import { Button, Dialog } from "@material-tailwind/react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {useMutation, useQuery} from '@tanstack/react-query'
import { IoImage } from "react-icons/io5";
import moment from 'moment';
import { MdOutlineCancel, MdVideoLibrary } from "react-icons/md";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa6";
import ModuleData from "./Components/ModuleData";
import UploadImageForm from "./Components/UploadImageForm";
import UploadVideoForm from "./Components/UploadVideoForm";

const key = import.meta.env.VITE_IMAGE_HOISTING_API_KEY;
const apiUrl = `https://api.imgbb.com/1/upload?key=${key}`;

const imageArray = [] ;
const videoArray = [] ;

const UploadSubject = () => {
    
    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const [loading, setLoading] = useState(false) ;
    const [imageNumber, setImageNumber] = useState(1) ;
    const [videoNumber, setVideoNumber] = useState(1) ;
    const [addModule, setAddModule] = useState(false) ;
    const [moduleClick, setModuleClick] = useState(false) ;
    const [vidoeLoading, setVideoLoading] = useState(false) ;
    const [imageLoading, setImageLoading] = useState(false) ;
    const [addAssignment, setAddAssignment] = useState(false) ;
    const [uploadedImages , setUploadedImages] = useState([]) ;
    const [uploadedVideos , setUploadedVideos] = useState([]) ;
    const [texts, setTexts] = useState({
        moduleName : '',
        textForModule : '' ,
        moduleTextTitle : '' ,
    });
    
    const time = moment().format('hh:mm:ss A');

    const {mutate : moduleMutate} = useMutation({
        mutationFn : async (moduleData) => {
            const {data} = await axiosSecure.post('/createModule' , moduleData) ;
            return data ;
        },
    })

    // const {mutate : assignmentMutate} = useMutation({
    //     mutationFn : async (assingmentData) => {
    //         const {data} = await axiosSecure.post('/createAssignment' , assingmentData) ;
    //         return data ;
    //     }
    // })

    const {data : modules , refetch : moduleRefetch} = useQuery({
        queryKey : ['uploadedModulesList' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/getUploadedModulesList?grade=${pathname.split('/')[3]}&subject=${pathname.split('/')[4]}`)
            return data ;
        }
    })

    // const {data : assignments , refetch : assignmentsRefetch} = useQuery({
    //     queryKey : ['uploadedAssignmentsList' , pathname] ,
    //     queryFn : async () => {
    //         const {data} = await axiosSecure.get(`/getUploadedAssignmentsList?grade=${pathname.split('/')[3]}&subject=${pathname.split('/')[4]}`)
    //         return data ;
    //     }
    // })

    const {data : moduleDetails} = useQuery({
        queryKey : ['moduleData' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/moduleDetails?id=${pathname.split('/')[6].length < 10 ? pathname.split('/')[7] : pathname.split('/')[6]}`) ;
            return data ;
        }
    })

    const handleAddModuleOpen = () => {
        setAddModule(!addModule)
    };

    const handleAddAssignmentOpen = () => {
        setAddAssignment(!addAssignment)
    };

    const handleAddModule = async (e) => {
        e.preventDefault() ;
        const from = e.target ;
        const moduleName = from.moduleName.value ;
        const textForModule = from.textForModule.value ;
        const textForModuleTitle = from.textForModuleTitle.value ;
        
        if(textForModule.length === 0 && uploadedImages.length === 0){
            setUploadedImages([]) ;
            setUploadedVideos([]) ;
            handleAddModuleOpen() ;
            Swal.fire({
                title: "Oops!",
                html: "Please fill text for module fuild or <br/> select some images !",
                icon: "warning"
            });
        }
        else{
            const moduleData = {
                moduleData : [
                    {
                        textForModuleTitle ,
                        textForModule ,
                    },
                    {
                        moduleImages : uploadedImages ,
                    },
                    {
                        moduleVideos : uploadedVideos ,
                    },
                ] ,
                time,
                moduleName ,
                grade : pathname.split('/')[3] ,
                subject : pathname.split('/')[4] ,
                date : new Date().toDateString() ,
            }
            setLoading(true) ;
            moduleMutate(moduleData) ;
            setLoading(false) ;
            moduleRefetch() ;
            handleAddModuleOpen() ;
            setUploadedImages([]) ;
            setUploadedVideos([]) ;-
            Swal.fire({
                title: "Success",
                text: "Module Added Success Full !",
                icon: "success"
            });
        }
    }

    const handleAddAssignment = async (e) => {
        e.preventDefault() ;

        // const from = e.target ;
        // const assignmentName = from.assignmentName.value ;
        // const assignmentDescription = from.assignmentDescription.value ;
        // const textForAssignment = from.textForAssignment.value ;

        // if(textForAssignment.length === 0){
        //     handleAddModuleOpen() ;
        //     Swal.fire({
        //         title: "Oops!",
        //         html: "Please fill text for module fuild or <br/> select some images !",
        //         icon: "warning"
        //     });
        // }
        // else{
        //     let urls = [] ;
        //     setLoading(true) ;
        //     const assignmentData = {
        //         time,
        //         assignmentName ,
        //         textForAssignment ,
        //         assignmentDescription ,
        //         assignmentImages : urls ,
        //         grade : pathname.split('/')[3] ,
        //         subject : pathname.split('/')[4] ,
        //         date : new Date().toDateString() ,
        //     }
        //     assignmentMutate(assignmentData) ;
        //     setLoading(false) ;
        //     handleAddModuleOpen() ;
        //     assignmentsRefetch() ;
        //     Swal.fire({
        //         title: "Success",
        //         text: "Module Added Success Full !",
        //         icon: "success"
        //     });
        // }
    }

    return (
        <div className={`h-[80vh] mx-3 mb-10 lg:mx-0 lg:mt-5 ${moduleDetails?.moduleName && 'mb-20'}`}>

            {
                moduleDetails?.moduleName && 
                <div className="flex items-center gap-3 border-b border-[#302442] mb-2 pb-1">
                    <Link to={`/yourGrades/details/${pathname.split('/')[3]}`} className="bg-gradient-to-r from-[#CC45E1] to-[#6B0DEC] rounded-full p-[2px] text-white">
                        <FaArrowLeft className=""/>
                    </Link>
                    <h1 className="gro text-xl font-semibold text-[#EAAAFF] w-full">
                        {pathname.split('/')[5] === 'textInstruction' && 'Text Instruction : ' + moduleDetails?.moduleName}
                        {pathname.split('/')[5] === 'images' && moduleDetails?.moduleName + ' : ' + moduleDetails?.moduleData[1]?.moduleImages[pathname.split('/')[6]]?.imageName}
                        {pathname.split('/')[5] === 'videos' && moduleDetails?.moduleName + ' : ' + moduleDetails?.moduleData[2]?.moduleVideos[pathname.split('/')[6]]?.videoName}
                    </h1>
                </div>
            }

            <div className="lg:flex lg:items-start lg:justify-between gap-3 h-full">

                <div className="w-full h-[60vh] rounded bg-[#010313]">
                    <Outlet />
                </div>

                <div className="bg-[#010313] w-[550px] h-full rounded p-3 flex flex-col gap-3 overflow-y-auto scrollbar-thin">

                    <div className="w-full flex flex-col gap-3">
                        <div className="w-full flex flex-col gap-3 sticky top-0">
                            <Button onClick={handleAddModuleOpen} className="gro capitalize py-2 shadow-none hover:shadow-none bg-gradient-to-r from-purple-500 to-teal-500 rounded text-sm">Add Module</Button>
                            <Button onClick={handleAddAssignmentOpen} className="gro capitalize py-2 shadow-none hover:shadow-none bg-gradient-to-r from-purple-500 to-teal-500 rounded text-sm">Add Assignment</Button>
                        </div>
                    </div>

                    <div className="h-[70vh] grid grid-rows-2 gap-1">
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

                        <div className="h-full w-full flex flex-col items-start gap-3 p-2 bg-[#160929] rounded">
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

            <Dialog
                size="lg"
                open={addModule}
                animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: 0 },
                }}
            >
                <div className="p-5 bg-[#0e081f] rounded relative">
                    
                    <p className="absolute -top-3 -right-3 cursor-pointer text-white hover:text-red-600 hover:bg-[#3e26806e] duration-300 rounded-full" onClick={handleAddModuleOpen}>
                        <MdOutlineCancel className="text-2xl"/>
                    </p>

                    <form onSubmit={handleAddModule} className="flex flex-col gap-3 min-h-[50vh] max-h-[80vh] overflow-y-auto scrollbar-thin">

                        <div className="grid grid-cols-2 gap-3">

                            <div className="bg-gradient-to-br from-purple-500 to-[#6B0DEC] p-[1px] rounded-md h-12">
                                <input
                                    onChange={(e) => setTexts((preve) => {
                                        return{
                                            ...preve ,
                                            moduleName : e.target.value ,
                                        }
                                    })}
                                    required
                                    name="moduleName"
                                    className={`outline-none text-white h-full rounded-md py-[6px] border border-teal-900 focus:border-white gro px-2 w-full bg-[#0103137a] hover:bg-transparent focus:bg-transparent duration-300 ${texts?.moduleName ? 'bg-transparent' : ''}`}
                                    color="white"
                                    type={"text"}
                                    placeholder={`Module/Subject Name : ${pathname.split('/')[4]}`}
                                />
                            </div>

                            <div className="bg-gradient-to-r from-purple-500 to-[#6B0DEC] p-[1px] rounded-md h-12">
                                <input
                                    onChange={(e) => setTexts((preve) => {
                                        return{
                                            ...preve ,
                                            moduleTextTitle : e.target.value ,
                                        }
                                    })}
                                    required={texts?.textForModule}
                                    name="textForModuleTitle"
                                    className={`outline-none text-white h-full rounded-md py-[6px] border border-teal-900 focus:border-white gro px-2 w-full bg-[#0103137a] hover:bg-transparent focus:bg-transparent duration-300 ${texts?.moduleTextTitle && 'bg-transparent'}`}
                                    color="white"
                                    type={"text"}
                                    placeholder={`Module Text Title  ↓`}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-[#6B0DEC] p-[1px] rounded-md h-64">
                                <textarea
                                    onChange={(e) => setTexts((preve) => {
                                        return{
                                            ...preve ,
                                            textForModule : e.target.value ,
                                        }
                                    })}
                                    minLength={200}
                                    name="textForModule"
                                    className={`outline-none h-full text-white rounded-md pt-2 border border-teal-900 focus:border-white gro px-2 w-full bg-[#0103137a] hover:bg-transparent focus:bg-transparent duration-300 ${texts?.textForModule && 'bg-transparent'}`}
                                    color="white"
                                    type={"text"}
                                    placeholder={"Write For Module"}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">

                            <div className="grid grid-cols-2 gap-3">

                                <div className="w-full flex flex-col gap-3">
                                    
                                    <div className="bg-gradient-to-t from-purple-500 to-[#6B0DEC] p-[1px] rounded-md h-12 flex items-center justify-center">
                                        <Button onClick={() => {
                                            setImageNumber(imageNumber + 1) ;
                                            imageArray.push(imageNumber) ;
                                        }} className="gro bg-transparent capitalize text-base font-semibold text-white flex items-center justify-center gap-2 cursor-pointer w-full h-full"><IoImage className="text-xl"/> Add Image Input Fuild <FaPlus /></Button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 w- pr-[6px]">
                                        {
                                            imageArray.map((image) => 
                                            <div key={image} className="bg-gradient-to-br from-purple-500 to-[#6B0DEC] p-[1px] rounded-md h-12 flex items-center justify-between gap-3 pr-3">
                                                <UploadImageForm image={image} apiUrl={apiUrl} uploadedImages={uploadedImages} setImageLoading={setImageLoading} setUploadedImages={setUploadedImages} imageLoading={imageLoading}/>
                                            </div>)
                                        }
                                        {
                                            imageArray?.length > 0 &&
                                            <div className=" bg-[#1f0b3b] p-[1px] rounded-md h-12 flex items-center justify-center">
                                                <Button onClick={() => {
                                                    imageArray.pop() ;
                                                    uploadedImages.pop() ;
                                                    setImageNumber(imageNumber-1) ;
                                                }} className="gro bg-transparent capitalize text-base font-semibold text-red-600 flex items-center justify-center gap-2 cursor-pointer w-full h-full"> Remove Image Input Fuild <FaMinus /></Button>
                                            </div>
                                        }
                                    </div>

                                </div>

                                <div className="w-full flex flex-col gap-3">

                                    <div className="bg-gradient-to-t from-purple-500 to-[#6B0DEC] p-[1px] rounded-md h-12 flex items-center justify-center">
                                        <Button onClick={() => {
                                            setVideoNumber(videoNumber + 1) ;
                                            videoArray.push(videoNumber) ;
                                        }} className="gro bg-transparent capitalize text-base font-semibold text-white flex items-center justify-center gap-3 cursor-pointer w-full h-full"><MdVideoLibrary className="text-xl"/> Add Video Input Fuild <FaPlus /></Button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 pr-[6px]">
                                        {
                                            videoArray.map((video) => 
                                            <div key={video} className="bg-gradient-to-br from-purple-500 to-[#6B0DEC] p-[1px] rounded-md h-12 flex items-center justify-between gap-3 pr-3">
                                                <UploadVideoForm video={video} setUploadedVideos={setUploadedVideos} setVideoLoading={setVideoLoading} uploadedVideos={uploadedVideos} videoLoading={vidoeLoading}/>
                                            </div>)
                                        }
                                        {
                                            videoArray?.length > 0 &&
                                            <div className=" bg-[#1f0b3b] p-[1px] rounded-md h-12 flex items-center justify-center">
                                                <Button onClick={() => {
                                                    videoArray.pop() ;
                                                    uploadedVideos.pop();
                                                    setVideoNumber(videoNumber-1) ;
                                                }} className="gro bg-transparent capitalize text-base font-semibold text-red-600 flex items-center justify-center gap-2 cursor-pointer w-full h-full"> Remove Image Input Fuild <FaMinus /></Button>
                                            </div>
                                        }
                                    </div>

                                </div>

                            </div>

                        </div>

                        {
                            loading || vidoeLoading || imageLoading ?
                            <p className="btn border-none flex gap-3 bg-gradient-to-r from-purple-500 to-[#6B0DEC] rounded-md text-white gro font-semibold">
                                {imageLoading && 'Uploading Image'} 
                                {vidoeLoading && 'Uploading Video'} 
                                {loading && <span className="loading loading-infinity loading-lg"></span>} 
                                {imageLoading && <span className="loading loading-infinity loading-lg"></span>}
                                {vidoeLoading && <span className="loading loading-infinity loading-lg"></span>}
                            </p>:
                            <button className="btn border-none bg-gradient-to-t from-purple-500 to-[#6B0DEC] rounded-md text-white gro font-semibold">
                                Add Module
                            </button> 
                        }

                    </form>

                </div>
            </Dialog>

            <Dialog
                size="sm"
                open={addAssignment}
                animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: 0 },
                }}
            >
                <div className="p-3">
                    
                    <form onSubmit={handleAddAssignment} className="flex flex-col gap-3 h-full">

                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-[#6B0DEC] p-[1px] rounded-md h-12">
                                <input
                                    required
                                    name="assignmentName"
                                    className="outline-none text-white h-full rounded-md py-[6px] border border-teal-900 focus:border-white gro px-2 w-full bg-[#0103137a] hover:bg-transparent focus:bg-transparent duration-300"
                                    color="white"
                                    type={"text"}
                                    placeholder={`Assignment Name`}
                                />
                            </div>
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[2px] rounded-md h-12">
                                <textarea
                                    required
                                    name="assignmentDescription"
                                    className="outline-none h-full text-white rounded-md pt-2 border border-teal-900 focus:border-white gro px-2 w-full bg-[#0103137a] hover:bg-transparent focus:bg-transparent duration-300"
                                    color="white"
                                    type={"text"}
                                    placeholder={"Assignment Description"}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[2px] rounded-md h-64">
                                <textarea
                                    minLength={200}
                                    name="textForAssignment"
                                    className="outline-none h-full text-white rounded-md pt-2 border border-teal-900 focus:border-white gro px-2 w-full bg-[#0103137a] hover:bg-transparent focus:bg-transparent duration-300"
                                    color="white"
                                    type={"text"}
                                    placeholder={"Write For Assignment"}
                                />
                            </div>
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[2px] rounded-md h-12">
                                <input
                                    className="file-input file-input-bordered outline-none text-white cursor-pointer h-full rounded-md py-[6px] border border-teal-900 focus:border-white gro px-2 bg-transparent w-full bg-gradient-to-r from-purple-500 to-teal-500 capitalize gro"
                                    color="white"
                                    type={"file"}
                                    placeholder={`Write For Module`}
                                />
                            </div>
                        </div>

                        <button disabled={loading} className="btn border-none bg-gradient-to-r from-purple-500 to-teal-500 rounded-md text-white gro font-semibold">{loading ? <span className="loading loading-infinity loading-lg"></span> : 'Add Module'}</button>

                    </form>

                </div>
            </Dialog>

        </div>
    );
};

export default UploadSubject;
