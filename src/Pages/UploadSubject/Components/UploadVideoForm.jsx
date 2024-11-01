
import axios from "axios";
import { useState } from "react";
import { MdVideoLibrary } from "react-icons/md";

const UploadVideoForm = ({setVideoLoading , setUploadedVideos , video , videoLoading , uploadedVideos}) => {

    const [videoName , setVideoName] = useState('') ;
    const [uploadedVideo , setUploadedVideo] = useState('') ;

    const handleUploadVideo = async (e) => {
        setVideoLoading(true) ;
        const video = e.target.files[0] ;
        const formData = new FormData() ;
        formData.append('file' , video) ;
        formData.append('upload_preset', 'eduManage');
        const {data} = await axios.post(import.meta.env.VITE_UPLOADING_ANYTHING_URL , formData) ;
        setUploadedVideo(data?.url) ;
        setVideoLoading(false) ;
    }
    
    const handleAddVideo = async (e) => {
        e.preventDefault() ;
        setUploadedVideo('') ;
        setUploadedVideos([...uploadedVideos , { videoName , moduleVideo : uploadedVideo }]) ;
    }

    return (
        <form className="flex items-center gap-6 w-full h-full">
            <input onChange={(e) => setVideoName(e.target.value)} required type="text" name={`video${video}Name`} placeholder={`Video ${video} Name`} className="outline-none w-[35%] text-white cursor-pointer h-full rounded-md py-[6px] border border-teal-900 focus:border-white gro px-2 gro"/> 

            <p className="text-white font-bold">:</p>

            <label htmlFor={`video${video}`} className="flex items-center w-[35%] border justify-center gap-3 h-full text-white cursor-pointer gro rounded-md font-semibold text-base"><MdVideoLibrary className="text-xl"/>Upload Video</label>

            <input
                id={`video${video}`}
                onChange={handleUploadVideo}
                className="outline-none hidden text-white cursor-pointer h-full rounded-md py-[6px] border border-teal-900 focus:border-white gro px-2 bg-transparent w-full bg-gradient-to-r from-purple-500 to-[#6B0DEC] capitalize gro"
                color="white"
                type={"file"}
                placeholder={`Write For Module`}
                accept="video/*"
            /> 
            {
                videoLoading ? 
                <button disabled className="bg-transparent border shadow-none h-full w-[15%] ml-auto gro capitalize font-semibold text-base px-3 rounded text-white">Add</button> :
                <button disabled={!uploadedVideo} onClick={handleAddVideo} className="bg-transparent border shadow-none h-full w-[15%] ml-auto gro capitalize font-semibold text-base px-3 rounded text-white">Add</button> 
            }
        </form>
    );
};

export default UploadVideoForm;