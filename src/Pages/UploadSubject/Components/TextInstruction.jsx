
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import React, { useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import image from '../../../../public/images/textInstruction.png'
import { MdOutlineCancel } from "react-icons/md";

const TextInstruction = () => {

    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const [open, setOpen] = useState(false);
    
    const {data} = useQuery({
        queryKey : ['moduleData' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/moduleDetails?id=${pathname.split('/')[6] ? pathname.split('/')[6] : pathname.split('/')[5]}`) ;
            return data ;
        }
    })

    const handleOpen = () => setOpen(!open);

    return (
        <div className="w-full h-full p-5 bg-[#010313] rounded overflow-hidden">

            { 
                data?.moduleData[0]?.textForModule ? <div className="gro text-xl text-white flex flex-col">{data?.moduleData[0]?.textForModule?.slice(0 , 850)?.split('\n')?.map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>))}
                    {
                        data?.moduleData[0]?.textForModule?.length > 850 &&
                        <Button size="sm" onClick={handleOpen} className="w-fit mx-auto bg-transparent border capitalize gro shadow-none hover:shadow-none rounded-full text-sm hover:border-[#C3105D] hover:text-[#C3105D] duration-300 ease-in-out mt-10">See More</Button>
                    }
                </div> :
                <div className="">
                    <p className="gro">No Text Upload Yeat !</p>
                </div> 
            }

            <Dialog
                size="md"
                open={open} 
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: 0 },
                }}
            >
                <div className="min-h-[75vh] h-[75vh] p-6 bg-[#191124] rounded-md relative">

                    <p className="absolute -top-3 -right-3 cursor-pointer text-white bg-gradient-to-br from-red-500 to-[#ff5e00] duration-300 rounded-full" onClick={() => handleOpen()}>
                        <MdOutlineCancel className="text-2xl"/>
                    </p>

                    <div className="bg-[#191124] h-full rounded-md overflow-auto scrollbar-thin">

                        <img className="mx-auto mb-10" src={image} alt="" />

                        <p className="gro text-white">
                            {
                                data?.moduleData[0]?.textForModule?.split('\n')?.map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>))
                            }
                        </p>
                    </div>
                </div>
            </Dialog>

        </div>
    );
};

export default TextInstruction;
