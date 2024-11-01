
import { Button, Dialog } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {useMutation, useQuery} from '@tanstack/react-query'
import { IoImage } from "react-icons/io5";
import moment from 'moment';
import { MdOutlineCancel, MdVideoLibrary } from "react-icons/md";

const key = import.meta.env.VITE_IMAGE_HOISTING_API_KEY;
const apiUrl = `https://api.imgbb.com/1/upload?key=${key}`;

const UploadSubject = () => {
    
    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const [loading, setLoading] = useState(false) ;
    const [addModule, setAddModule] = useState(false) ;
    const [vidoeLoading, setVideoLoading] = useState(false) ;
    const [imageLoading, setImageLoading] = useState(false) ;
    const [addAssignment, setAddAssignment] = useState(false) ;
    const [selectedImages , setSelectedImages] = useState([]) ;
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

    const {mutate : assignmentMutate} = useMutation({
        mutationFn : async (assingmentData) => {
            const {data} = await axiosSecure.post('/createAssignment' , assingmentData) ;
            return data ;
        }
    })

    const {data : modules , refetch : moduleRefetch} = useQuery({
        queryKey : ['uploadedModulesList' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/getUploadedModulesList?grade=${pathname.split('/')[3]}&subject=${pathname.split('/')[4]}`)
            return data ;
        }
    })

    const {data : assignments , refetch : assignmentsRefetch} = useQuery({
        queryKey : ['uploadedAssignmentsList' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/getUploadedAssignmentsList?grade=${pathname.split('/')[3]}&subject=${pathname.split('/')[4]}`)
            return data ;
        }
    })

    const {data : moduleDetails} = useQuery({
        queryKey : ['moduleData' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/moduleDetails?id=${pathname.split('/')[6]}`) ;
            return data ;
        }
    })

    const handleAddModuleOpen = () => {
        setAddModule(!addModule)
    };

    const handleAddAssignmentOpen = () => {
        setAddAssignment(!addAssignment)
    };

    const handleSelectImages = (e) => {
        const files = Array.from(e.target.files) ;
        setSelectedImages(files) ;
    }

    const handleSelectVideos = async (e) => {
        if(!uploadedVideos?.length > 0){
            setVideoLoading(true) ;
            const files = Array.from(e.target.files) ;
            let videoUrls = [] ;
            for(let video of files){
                const formData = new FormData() ;
                formData.append('file' , video) ;
                formData.append('upload_preset', 'eduManage');
                const {data} = await axios.post(import.meta.env.VITE_UPLOADING_ANYTHING_URL , formData) ;
                videoUrls.push(data?.url) ;
            }
            setUploadedVideos(videoUrls);
            setVideoLoading(false) ;
        }
    }

    const handleAddModule = async (e) => {
        e.preventDefault() ;
        const from = e.target ;
        const moduleName = from.moduleName.value ;
        const textForModule = from.textForModule.value ;
        const textForModuleTitle = from.textForModuleTitle.value ;
        
        if(textForModule.length === 0 && selectedImages.length === 0){
            setSelectedImages([]) ;
            handleAddModuleOpen() ;
            Swal.fire({
                title: "Oops!",
                html: "Please fill text for module fuild or <br/> select some images !",
                icon: "warning"
            });
        }
        else{
            let urls = [] ;
            setImageLoading(true) ;
            for(let image of selectedImages){
                const formData = new FormData() ;
                formData.append('image' , image) ;
                const {data} = await axios.post(apiUrl , formData, {
                    headers: { "content-type": "multipart/form-data" },
                })
                urls.push(data?.data?.display_url) ;
            }
            setImageLoading(false) ;
            const moduleData = {
                moduleData : [
                    {
                        textForModuleTitle ,
                        textForModule ,
                    },
                    {
                        moduleImages : urls ,
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
            setSelectedImages([]) ;
            setUploadedVideos([]) ;
            Swal.fire({
                title: "Success",
                text: "Module Added Success Full !",
                icon: "success"
            });
        }
    }

    const handleAddAssignment = async (e) => {
        e.preventDefault() ;

        const from = e.target ;
        const assignmentName = from.assignmentName.value ;
        const assignmentDescription = from.assignmentDescription.value ;
        const textForAssignment = from.textForAssignment.value ;

        if(textForAssignment.length === 0 && selectedImages.length === 0){
            setSelectedImages([]) ;
            handleAddModuleOpen() ;
            Swal.fire({
                title: "Oops!",
                html: "Please fill text for module fuild or <br/> select some images !",
                icon: "warning"
            });
        }
        else{
            let urls = [] ;
            setLoading(true) ;
            for(let image of selectedImages){
                const formData = new FormData() ;
                formData.append('image' , image) ;
                const {data} = await axios.post(apiUrl , formData, {
                    headers: { "content-type": "multipart/form-data" },
                })
                urls.push(data?.data?.display_url) ;
            }
            const assignmentData = {
                time,
                assignmentName ,
                textForAssignment ,
                assignmentDescription ,
                assignmentImages : urls ,
                grade : pathname.split('/')[3] ,
                subject : pathname.split('/')[4] ,
                date : new Date().toDateString() ,
            }
            assignmentMutate(assignmentData) ;
            setLoading(false) ;
            handleAddModuleOpen() ;
            setSelectedImages([]) ;
            assignmentsRefetch() ;
            Swal.fire({
                title: "Success",
                text: "Module Added Success Full !",
                icon: "success"
            });
        }
    }

    return (
        <div className={`h-[80vh] mx-3 mb-10 lg:mx-0 lg:mt-5 ${moduleDetails?.moduleName && 'mb-20'}`}>

            {
                moduleDetails?.moduleName && <h1 className="border-b border-[#302442] gro pb-2 text-xl font-semibold text-[#EAAAFF] w-full mb-5">{moduleDetails?.moduleName}</h1>
            }

            <div className="lg:flex lg:items-start lg:justify-between gap-3 h-full">

                <div className="w-full h-full rounded bg-[#010313]">
                    <Outlet />
                </div>

                <div className="bg-[#010313] w-96 h-full rounded p-3 flex flex-col gap-3 overflow-y-auto">

                    <div className="w-full flex flex-col gap-3">
                        <div className="w-full flex flex-col gap-3 sticky top-0">
                            <Button onClick={handleAddModuleOpen} className="gro capitalize py-2 shadow-none hover:shadow-none bg-gradient-to-r from-purple-500 to-teal-500 rounded text-sm">Add Module</Button>
                            <Button onClick={handleAddAssignmentOpen} className="gro capitalize py-2 shadow-none hover:shadow-none bg-gradient-to-r from-purple-500 to-teal-500 rounded text-sm">Add Assignment</Button>
                        </div>
                    </div>

                    <div className="h-[70vh] grid grid-rows-2 gap-1">
                        <div className="h-full w-full flex flex-col items-start gap-3 p-2 bg-[#160929] rounded-t rounded-l rounded-r rounded-b-none">
                            {
                                modules?.length > 0 && modules?.map((data) => <NavLink to={`modules/${data?._id}`} key={data?._id} className={({ isActive, isPending }) =>
                                    isPending ? "pending bg-[#211336] w-full py-1 px-2 rounded" : isActive ? "bg-[#3a215f] w-full py-1 px-2 rounded" : "bg-[#211336] w-full py-1 px-2 rounded duration-300"
                                }
                                >
                                    <p className="gro font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">{data?.moduleName}</p>
                                    <p className="gro text-sm text-[#C7ABFF]">{data?.time} {data?.date.split(' ').slice(2 , 3)} {data?.date.split(' ').slice(3)}</p>
                                </NavLink>)
                            }
                        </div>

                        <div className="h-full w-full flex flex-col items-start gap-3 p-2 bg-[#160929] rounded-b rounded-l rounded-r rounded-t-none">
                            {
                                assignments?.length > 0 && assignments?.map((data) => <NavLink to={`assignment/${data?._id}`} key={data?._id} className={({ isActive, isPending }) =>
                                    isPending ? "pending bg-[#211336] w-full py-1 px-2 rounded" : isActive ? "bg-[#3a215f] w-full py-1 px-2 rounded" : "bg-[#211336] w-full py-1 px-2 rounded duration-300"
                                }
                                >
                                    <p className="gro font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">{data?.moduleName}</p>
                                    <p className="gro font- text-[#C7ABFF]">{data?.time} {data?.date.split(' ').slice(2 , 3)} {data?.date.split(' ').slice(3)}</p>
                                </NavLink>)
                            }
                        </div>
                    </div>

                </div>

            </div>

            <Dialog
                size="sm"
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

                    <form onSubmit={handleAddModule} className="flex flex-col gap-3 h-full">

                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[1px] rounded-md h-12">
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
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[1px] rounded-md h-12">
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
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[1px] rounded-md h-64">
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

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gradient-to-br from-purple-500 to-teal-500 p-[1px] rounded-md h-12">
                                <label htmlFor="images" className="flex items-center justify-center gap-3 h-full text-white cursor-pointer gro font-semibold text-base"><IoImage className="text-xl"/>Upload Images</label>
                                <input
                                    id="images"
                                    multiple
                                    onChange={handleSelectImages}
                                    className="outline-none hidden text-white cursor-pointer h-full rounded-md py-[6px] border border-teal-900 focus:border-white gro px-2 bg-transparent w-full bg-gradient-to-r from-purple-500 to-teal-500 capitalize gro"
                                    color="white"
                                    type={"file"}
                                    placeholder={`Write For Module`}
                                    accept="image/*"
                                />
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-teal-500 p-[1px] rounded-md h-12">
                                {
                                    uploadedVideos?.length > 0 ?
                                    <label className="flex items-center justify-center gap-3 h-full text-white cursor-pointer gro font-semibold text-base">Videos Already Uploaded</label>:
                                    <label htmlFor="videos" className="flex items-center justify-center gap-3 h-full text-white cursor-pointer gro font-semibold text-base"><MdVideoLibrary className="text-xl"/>Upload Videos</label>
                                }
                                <input
                                    id="videos"
                                    multiple
                                    onChange={(e) => handleSelectVideos(e)}
                                    className="outline-none hidden text-white cursor-pointer h-full rounded-md py-[6px] border border-teal-900 focus:border-white gro px-2 bg-transparent w-full bg-gradient-to-r from-purple-500 to-teal-500 capitalize gro"
                                    color="white"
                                    type={"file"}
                                    placeholder={`Write For Module`}
                                    accept="video/*"
                                />
                            </div>
                        </div>

                        {
                            loading || vidoeLoading || imageLoading ?
                            <p className="btn border-none flex gap-3 bg-gradient-to-r from-purple-500 to-teal-500 rounded-md text-white gro font-semibold">
                                {loading && <span className="loading loading-infinity loading-lg"></span>} 
                                {imageLoading && 'Uploading Images'} 
                                {vidoeLoading && 'Uploading Videos'} 
                                {loading || vidoeLoading && <span className="loading loading-infinity loading-lg"></span>}
                            </p>:
                            <button className="btn border-none bg-gradient-to-r from-purple-500 to-teal-500 rounded-md text-white gro font-semibold">
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
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[1px] rounded-md h-12">
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
                                    multiple
                                    onChange={handleSelectImages}
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
