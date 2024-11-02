
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import React, { useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";

const TextInstruction = () => {

    const {pathname} = useLocation() ;
    const axiosSecure = useAxiosSecure() ;
    const [open, setOpen] = useState(false);
    
    const {data} = useQuery({
        queryKey : ['moduleData' , pathname] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/moduleDetails?id=${pathname.split('/')[6]}`) ;
            return data ;
        }
    })

    const handleOpen = () => setOpen(!open);

    return (
        <div className="w-full h-full p-5 bg-[#160929] rounded overflow-hidden">

            {
                data?.moduleData[0]?.textForModuleTitle && <h1 className="text-3xl gro mb-5 text-[#DBA0F1]">{data?.moduleData[0]?.textForModuleTitle}</h1>
            }

            { 
                data?.moduleData[0]?.textForModule ? <div className="gro text-xl text-white flex flex-col">{data?.moduleData[0]?.textForModule?.slice(0 , 800)?.split('\n')?.map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>))}
                    {
                        data?.moduleData[0]?.textForModule?.length > 800 &&
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
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: 0 },
                }}
            >
                <div className="min-h-[50vh] h-[50vh] p-6 bg-[#191124] rounded-md">
                    <div className="bg-[#191124] h-full rounded-md overflow-auto scrollbar-thin">
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
