
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ModuleData = ({data , id}) => {

    const navigate = useNavigate() ;
    const {pathname} = useLocation() ;
    const userData = useSelector(state => state?.user) ;

    const handleTextInstructionNavigate = () => {
        if(data?.whichStudentsSeen?.includes(userData?.studentUid)){
            navigate(`textinstruction/${id}`) ;
        }
        else{
            Swal.fire({
                title: "Oops!",
                text: "Please See Privious Images or Videos To Go Next !",
                icon: "warning"
            });
        }
    }

    const handleImageNavigate = (data , index) => {
        if(data?.whichStudentsSeen?.includes(userData?.studentUid)){
            navigate(`images/${index}/${id}/${data?.imageName.split(' ').join('_')}`) ;
        }
        else{
            Swal.fire({
                title: "Oops!",
                text: "Please See Privious Images or Videos To Go Next !",
                icon: "warning"
            });
        }
    }
    
    const handleVideoNavigate = (data , index) => {
        if(data?.whichStudentsSeen?.includes(userData?.studentUid)){
            navigate(`videos/${index}/${id}/${data?.videoName.split(' ').join('_')}`) ;
        }
        else{
            Swal.fire({
                title: "Oops!",
                text: "Please See Privious Images or Videos To Go Next !",
                icon: "warning"
            });
        }
    }

    return (
        <div className="w-full">
            {
                pathname.includes('yourGrades/details/') ? 
                <div className="w-full">
                    {
                        data?.textForModuleTitle &&
                        <button onClick={() => navigate(`textinstruction/${id}`)} className={`${ pathname.split('/')[5] === 'textinstruction' && pathname.split('/')[6] === id ? "gro w-full pr-3 font-semibold bg-gradient-to-r from-[#CC45E1] to-[#6B0DEC] text-white px-1 py-2 my-4 rounded-[2px] flex items-center gap-4" : 'gro w-full pr-3 font-semibold bg-transparent border-b text-white px-1 py-2 my-4 rounded-[2px] flex items-center gap-4' }`}>
                            {data?.textForModuleTitle}
                        </button>
                    }
                    {
                        data?.moduleImages?.length > 0 && data?.moduleImages?.map((image , index) => 
                            <button onClick={() => navigate(`images/${index}/${id}/${image?.imageName.split(' ').join('_')}`)} key={image} className={`gro w-full pr-3 font-semibold bg-transparent border-b text-white px-1 py-2 my-4 rounded-[2px] flex items-center gap-4 justify-between ${pathname.split('/')[5] === 'images' && pathname.split('/')[6] === index.toString()  && pathname.split('/')[8] == image?.imageName?.split(' ').join('_')  &&  "gro w-full pr-3 font-semibold bg-gradient-to-r from-[#CC45E1] to-[#6B0DEC] text-white px-1 py-2 my-4 rounded-[2px] flex items-center gap-4" }`}>
                                <p className="flex items-center justify-between gap-5 w-full">{image?.imageName}</p> 
                            </button>
                        )
                    }
                    {
                        data?.moduleVideos?.length > 0 && data?.moduleVideos?.map((video , index) => 
                            <button onClick={() => navigate(`videos/${index}/${id}/${video?.videoName.split(' ').join('_')}`)} key={video} className={`gro w-full pr-3 font-semibold bg-transparent border-b text-white px-1 py-2 my-4 rounded-[2px] flex items-center gap-4 justify-between ${pathname.split('/')[5] === 'videos' && pathname.split('/')[6] === index.toString() && pathname.split('/')[8] == video?.videoName?.split(' ').join('_')  &&  "gro w-full pr-3 font-semibold bg-gradient-to-r from-[#CC45E1] to-[#6B0DEC] text-white px-1 py-2 my-4 rounded-[2px] flex items-center gap-4" }`}>
                                <p className="flex items-center justify-between gap-5 w-full">{video?.videoName}</p> 
                            </button>
                        )
                    }
                </div>:
                <div className="w-full">
                    {
                        data?.textForModuleTitle &&
                        <button onClick={() => handleTextInstructionNavigate()} className={`${ pathname.split('/')[4] === 'textinstruction' && pathname.split('/')[5] === id ? "gro w-full pr-3 font-semibold bg-gradient-to-r from-[#CC45E1] to-[#6B0DEC] text-white px-1 py-2 my-4 rounded-[2px] flex items-center gap-4" : 'gro w-full pr-3 font-semibold bg-transparent border-b text-white px-1 py-2 my-4 rounded-[2px] flex items-center gap-4' }`}>
                            {
                                data?.whichStudentsSeen?.includes(userData?.studentUid) ?
                                <IoCheckmarkDoneCircleOutline className="text-green-700 text-xl font-semibold"/> :
                                <MdOutlineLock className="text-red-700 rounded-full border-2 border-red-700 p-[1px] text-xl"/> 
                            }
                            {data?.textForModuleTitle}
                        </button>
                    }
                    {
                        data?.moduleImages?.length > 0 && data?.moduleImages?.map((image , index) => 
                            <button onClick={() => handleImageNavigate(image , index)} key={image} className={`gro w-full pr-3 font-semibold bg-transparent border-b text-white px-1 py-2 my-4 rounded-[2px] flex items-center gap-4 justify-between ${pathname.split('/')[4] === 'images' && pathname.split('/')[5] === index.toString() && pathname.split('/')[7] == image?.imageName?.split(' ').join('_')  && "gro w-full pr-3 font-semibold bg-gradient-to-r from-[#CC45E1] to-[#6B0DEC] text-white px-1 py-2 my-4 rounded-[2px] flex items-center gap-4" }`}>
                                {
                                    image?.whichStudentsSeen?.includes(userData?.studentUid) ?
                                    <IoCheckmarkDoneCircleOutline className="text-green-700 text-2xl font-semibold"/> :
                                    <MdOutlineLock className="text-red-700 rounded-full border-2 border-red-700 p-[1px] text-xl"/> 
                                }
                                <p className="flex items-center justify-between gap-5 w-full">{image?.imageName}</p> 
                            </button>
                        )
                    }
                    {
                        data?.moduleVideos?.length > 0 && data?.moduleVideos?.map((video , index) => 
                            <button onClick={() => handleVideoNavigate(video , index)} key={video} className={`gro w-full pr-3 font-semibold bg-transparent border-b text-white px-1 py-2 my-4 rounded-[2px] flex items-center gap-4 justify-between ${pathname.split('/')[4] === 'videos' && pathname.split('/')[5] === index.toString() && pathname.split('/')[7] == video?.videoName?.split(' ').join('_')  && "gro w-full pr-3 font-semibold bg-gradient-to-r from-[#CC45E1] to-[#6B0DEC] text-white px-1 py-2 my-4 rounded-[2px] flex items-center gap-4" }`}>
                                {
                                    video?.whichStudentsSeen?.includes(userData?.studentUid) ?
                                    <IoCheckmarkDoneCircleOutline className="text-green-700 text-2xl font-semibold"/> :
                                    <MdOutlineLock className="text-red-700 rounded-full border-2 border-red-700 p-[1px] text-xl"/> 
                                }
                                <p className="flex items-center justify-between gap-5 w-full">{video?.videoName}</p> 
                            </button>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default ModuleData;
