
import { Button, Dialog, textarea } from "@material-tailwind/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const UploadSubject = () => {

    const [addModule, setAddModule] = useState(false);
    const [addAssignment, setAddAssignment] = useState(false);
    const [selectedImages , setSelectedImages] = useState([]) ;

    const {pathname} = useLocation() ;
    // console.log(pathname.split('/')[3] , pathname.split('/')[4])

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
            handleAddModuleOpen() ;
            Swal.fire({
                title: "Oops!",
                html: "Please fill text for module fuild or <br/> select some images !",
                icon: "warning"
            });
        }
    }

    return (
        <div className="h-[70vh] mx-3 mb-10 lg:flex lg:items-start lg:justify-between gap-3 lg:mx-0 lg:mb-5 lg:mt-5">

            <div className="bg-[#010313] w-64 h-full rounded p-3 flex flex-col gap-4">
                <h1 className="border-b gro mb-5 pb-1">Upload</h1>
                <Button onClick={handleAddModuleOpen} className="gro capitalize py-3 shadow-none hover:shadow-none bg-gradient-to-r from-purple-500 to-teal-500 rounded text-sm">Add Module</Button>
                <Button onClick={handleAddAssignmentOpen} className="gro capitalize py-3 shadow-none hover:shadow-none bg-gradient-to-r from-purple-500 to-teal-500 rounded text-sm">Add Assignment</Button>
            </div>

            <div className="bg-[#010313] w-full h-full rounded">
                adsf
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
                <div className="p-5">
                    
                    <form onSubmit={handleAddModule} className="flex flex-col gap-3 h-full">

                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[2px] rounded-md h-12">
                                <input
                                    required
                                    name="moduleName"
                                    className="outline-none text-white h-full rounded-md py-[6px] border border-teal-900 focus:border-white gro px-2 bg-transparent w-full bg-gradient-to-r from-purple-500 to-teal-500"
                                    color="white"
                                    type={"text"}
                                    placeholder={`Module/Subject Name : ${pathname.split('/')[4]}`}
                                />
                            </div>
                            <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-[2px] rounded-md h-12">
                                <textarea
                                    required
                                    name="moduleDescription"
                                    className="outline-none h-full text-white rounded-md pt-2 border border-teal-900 focus:border-white gro px-2 bg-transparent w-full bg-gradient-to-r from-purple-500 to-teal-500"
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
                                    className="outline-none h-full text-white rounded-md pt-2 border border-teal-900 focus:border-white gro px-2 bg-transparent w-full bg-gradient-to-r from-purple-500 to-teal-500"
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

                        <button className="btn border-none bg-gradient-to-r from-purple-500 to-teal-500 rounded-md text-white gro font-semibold">Add Module</button>

                    </form>

                </div>
            </Dialog>

            <Dialog
                size="xl"
                open={addAssignment}
                handler={handleAddAssignmentOpen}
                animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: 0 },
                }}
            >
                <div className="min-h-[70vh]">
                    add Assignment
                </div>
            </Dialog>

        </div>
    );
};

export default UploadSubject;
