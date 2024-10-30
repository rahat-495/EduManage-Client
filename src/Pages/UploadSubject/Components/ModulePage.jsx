
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";

const ModulePage = () => {

    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const [open, setOpen] = useState(false);
    const [imagesOpen, setImagesOpen] = useState(false);
    const [imageslength , setImagesLength] = useState(0) ;

    const {data} = useQuery({
        queryKey : ['moduleData' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/moduleDetails?id=${pathname.split('/')[6]}`) ;
            setImagesLength(data?.moduleImages?.length - 1)
            return data ;
        }
    })
 
    const handleOpen = () => setOpen(!open);
    const handleImagesOpen = () => setImagesOpen(!imagesOpen);

    return (
        <div className="w-full h-full flex flex-col gap-3 p-3 overflow-auto">
            <p className="gro capitalize text-lg text-[#f7dfff]"><span className="play">Short Description : </span>{data?.moduleDescription}</p>

            <div className="divider"></div>

            { 
                data?.textForModule ? <div className="gro text-lg flex flex-col">{data?.textForModule?.slice(0 , 400)?.split('\n')?.map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>))}
                    {
                        data?.textForModule?.length > 400 &&
                        <Button size="sm" onClick={handleOpen} className="w-fit mx-auto bg-transparent border capitalize gro shadow-none hover:shadow-none rounded-full text-sm hover:border-[#C3105D] hover:text-[#C3105D] duration-300 ease-in-out">See More</Button>
                    }
                </div> :
                <div className="">
                    <p className="gro">No Text Upload Yeat !</p>
                </div> 
            }

            {
                data?.moduleImages?.length > 0 && 
                <div className="divider"></div>
            }

            <div className="mt-5 flex flex-col gap-5 w-full">
                {
                    data?.moduleImages?.length > 0 && data?.moduleImages?.slice(imageslength)?.map((image , index) => <img key={index} src={image} className="cursor-pointer w-full rounded-md"/>)
                }
                {
                    data?.moduleImages?.length > 0 && 
                    <Button size="sm" onClick={handleImagesOpen} className="w-fit mx-auto bg-transparent border capitalize gro shadow-none hover:shadow-none rounded-full text-sm hover:border-[#C3105D] hover:text-[#C3105D] duration-300 ease-in-out">See More Images</Button>
                }
            </div>

            <Dialog 
                size="md"
                open={open} 
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: 0 },
                }}
            >
                <div className="min-h-[50vh] h-[50vh] p-6 bg-[#191124] rounded-md">
                    <div className="bg-[#191124] h-full rounded-md overflow-auto">
                        <p className="gro text-white">
                            {
                                data?.textForModule?.split('\n')?.map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>))
                            }
                        </p>
                    </div>
                </div>
            </Dialog>

            <Dialog 
                size="lg"
                open={imagesOpen} 
                handler={handleImagesOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: 0 },
                }}
            >
                <div className="min-h-[70vh] h-[70vh] p-6 bg-[#191124] rounded-md overflow-auto flex flex-col gap-2">
                    {
                        data?.moduleImages?.length > 0 && data?.moduleImages?.map((image , index) => <img key={index} src={image} className="cursor-pointer w-full rounded-md border border-gray-500"/>)
                    }
                </div>
            </Dialog>

        </div>
    );
};

export default ModulePage;
