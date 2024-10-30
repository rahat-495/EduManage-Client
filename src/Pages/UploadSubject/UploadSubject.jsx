
import { Button, Dialog } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {useMutation, useQuery} from '@tanstack/react-query'
import moment from 'moment';

const key = import.meta.env.VITE_IMAGE_HOISTING_API_KEY;
const apiUrl = `https://api.imgbb.com/1/upload?key=${key}`;

const UploadSubject = () => {

    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const [loading, setLoading] = useState(false);
    const [addModule, setAddModule] = useState(false);
    const [addAssignment, setAddAssignment] = useState(false);
    const [selectedImages , setSelectedImages] = useState([]) ;
    
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

    const handleAddModuleOpen = () => setAddModule(!addModule);
    const handleAddAssignmentOpen = () => setAddAssignment(!addAssignment);

    const handleSelectImages = (e) => {
        const files = Array.from(e.target.files) ;
        setSelectedImages(files) ;
    }

    const handleAddModule = async (e) => {
        e.preventDefault() ;
        const from = e.target ;
        const moduleName = from.moduleName.value ;
        const moduleDescription = from.moduleDescription.value ;
        const textForModule = from.textForModule.value ;
        
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
            setLoading(true) ;
            for(let image of selectedImages){
                const formData = new FormData() ;
                formData.append('image' , image) ;
                const {data} = await axios.post(apiUrl , formData, {
                    headers: { "content-type": "multipart/form-data" },
                })
                urls.push(data?.data?.display_url) ;
            }
            const moduleData = {
                time,
                moduleName ,
                textForModule ,
                moduleDescription ,
                moduleImages : urls ,
                grade : pathname.split('/')[3] ,
                subject : pathname.split('/')[4] ,
                date : new Date().toDateString() ,
            }
            moduleMutate(moduleData) ;
            setLoading(false) ;
            handleAddModuleOpen() ;
            setSelectedImages([]) ;
            moduleRefetch() ;
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
        <div className="h-[70vh] mx-3 mb-10 lg:flex lg:items-start lg:justify-between gap-3 lg:mx-0 lg:mb-5 lg:mt-5">

            <div className="bg-[#010313] w-full h-full rounded p-3">
                <Outlet />
            </div>

            <div className="bg-[#010313] w-96 h-full rounded p-3 flex flex-col gap-3 overflow-y-auto">

                <div className="w-full flex flex-col gap-3">
                    <div className="w-full flex flex-col gap-3 sticky top-0">
                        <Button onClick={handleAddModuleOpen} className="gro capitalize py-2 shadow-none hover:shadow-none bg-gradient-to-r from-purple-500 to-teal-500 rounded text-sm">Add Module</Button>
                        <Button onClick={handleAddAssignmentOpen} className="gro capitalize py-2 shadow-none hover:shadow-none bg-gradient-to-r from-purple-500 to-teal-500 rounded text-sm">Add Assignment</Button>
                    </div>
                </div>

                <div className="h-[60vh] grid grid-rows-2 gap-3">
                    <div className="h-full w-full flex flex-col items-start gap-3 p-2 bg-[#160929] rounded">
                        {
                            modules?.length > 0 && modules?.map((data) => <NavLink to={`modules/${data?._id}`} key={data?._id} className={({ isActive, isPending }) =>
                                isPending ? "pending bg-[#211336] w-full py-1 px-2 rounded" : isActive ? "bg-[#3a215f] w-full py-1 px-2 rounded" : "bg-[#211336] w-full py-1 px-2 rounded duration-300"
                              }
                            >
                                <p className="gro font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">{data?.moduleName}</p>
                                <p className="gro font- text-[#C7ABFF]">{data?.time} {data?.date.split(' ').slice(2 , 3)} {data?.date.split(' ').slice(3)}</p>
                            </NavLink>)
                        }
                    </div>

                    <div className="h-full w-full flex flex-col items-start gap-3 p-2 bg-[#160929] rounded">
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

            <Dialog
                size="sm"
                open={addModule}
                handler={handleAddModuleOpen}
                animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: 0 },
                }}
            >
                <div className="p-3">
                    
                    <form onSubmit={handleAddModule} className="flex flex-col gap-3 h-full">

                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[2px] rounded-md h-12">
                                <input
                                    required
                                    name="moduleName"
                                    className="outline-none text-white h-full rounded-md py-[6px] border border-teal-900 focus:border-white gro px-2 w-full bg-[#0103137a] hover:bg-transparent focus:bg-transparent duration-300"
                                    color="white"
                                    type={"text"}
                                    placeholder={`Module/Subject Name : ${pathname.split('/')[4]}`}
                                />
                            </div>
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[2px] rounded-md h-12">
                                <textarea
                                    required
                                    name="moduleDescription"
                                    className="outline-none h-full text-white rounded-md pt-2 border border-teal-900 focus:border-white gro px-2 w-full bg-[#0103137a] hover:bg-transparent focus:bg-transparent duration-300"
                                    color="white"
                                    type={"text"}
                                    placeholder={"Module Description"}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[2px] rounded-md h-64">
                                <textarea
                                    minLength={200}
                                    name="textForModule"
                                    className="outline-none h-full text-white rounded-md pt-2 border border-teal-900 focus:border-white gro px-2 w-full bg-[#0103137a] hover:bg-transparent focus:bg-transparent duration-300"
                                    color="white"
                                    type={"text"}
                                    placeholder={"Write For Module"}
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

            <Dialog
                size="sm"
                open={addAssignment}
                handler={handleAddAssignmentOpen}
                animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: 0 },
                }}
            >
                <div className="p-3">
                    
                    <form onSubmit={handleAddAssignment} className="flex flex-col gap-3 h-full">

                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[2px] rounded-md h-12">
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
