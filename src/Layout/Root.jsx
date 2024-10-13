
/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import Nav from "../Shared/Navbar/Nav";
import Footer from "../Shared/Footer/Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Root = () => {

    const userDetails = useSelector(state => state.user) ;
    const axiosSecure = useAxiosSecure() ;
    
    const {mutateAsync} = useMutation({
        mutationFn : async () => {
            const data = await axiosSecure.patch(`/updateIsSeenModal` , {_id : userDetails?._id}) ;
            return data ;
        },
        onSuccess : () => {
            window.location.reload() ;
        }
    })

    useEffect(() => {
        if(userDetails?.isjoined && !userDetails?.isjoinedModalSeen){
            document.getElementById('congrassModal').showModal() ;
        }
    } , [])

    const handleIsjoinedModalSeen = async () => {
        await mutateAsync() ;
    }

    return (
        <div className="">

            <div className="sticky top-0 z-50 bg-opacity-0 backdrop-blur-md">
                <Nav/>
            </div>

            <div className="max-w-[1440px] mx-auto overflow-hidden">
                <Outlet/>
            </div>

            <div className="">
                <Footer/>
            </div>

            <dialog id="congrassModal" className="modal">
                <div className="modal-box bg-[#0F172A]">

                    <div className="gro flex flex-col items-center justify-center text-center gap-1">
                        <h3 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2] text-center">Congratulation</h3>
                        <p className="py-4 text-lg text-center text-[#C7ABFF]">Congratulation your addmission was accepted !</p>
                    </div>

                    <div className="modal-action w-full flex items-center justify-center">
                        <form method="dialog" className="w-full">
                            <button onClick={handleIsjoinedModalSeen} className="btn w-full bg-gradient-to-r from-purple-400 to-[#00FFB2] text-[#dccaff]">Close</button>
                        </form>
                    </div>

                </div>
            </dialog>

        </div>
    );
};

export default Root;
