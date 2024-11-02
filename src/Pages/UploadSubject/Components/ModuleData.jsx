
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const ModuleData = ({data , id}) => {
    return (
        <div className="w-full">
            {
                data?.textForModuleTitle &&
                <p className="">
                    <NavLink to={`textInstruction/${id}`} className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "gro w-full pr-3 font-semibold bg-gradient-to-r from-[#CC45E1] to-[#6B0DEC] text-white px-1 py-2 my-2 rounded-[2px] flex items-center gap-10" : "gro w-full pr-3 font-semibold bg-transparent border-b text-white px-1 py-2 my-2 rounded-[2px] flex items-center gap-10"
                      }
                    >
                        {data?.textForModuleTitle}
                    </NavLink>
                </p>
            }
            {
                data?.moduleImages?.length > 0 && data?.moduleImages?.map((image , index) => 
                    <NavLink to={`images/${index}/${id}`} key={image} className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "gro w-full pr-3 font-semibold bg-gradient-to-r from-[#CC45E1] to-[#6B0DEC] text-white px-1 py-2 my-2 rounded-[2px] flex items-center gap-10" : "gro w-full pr-3 font-semibold bg-transparent border-b text-white px-1 py-2 my-2 rounded-[2px] flex items-center gap-10"
                      }
                    >
                        <p className="flex items-center justify-between gap-5 w-full">{image?.imageName}<FaArrowUpRightFromSquare /></p> 
                    </NavLink>
                )
            }
            {
                data?.moduleVideos?.length > 0 && data?.moduleVideos?.map((image , index) => 
                    <NavLink to={`videos/${index}/${id}`} key={image} className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "gro w-full pr-3 font-semibold bg-gradient-to-r from-[#CC45E1] to-[#6B0DEC] text-white px-1 py-2 my-2 rounded-[2px] flex items-center gap-10" : "gro w-full pr-3 font-semibold bg-transparent border-b text-white px-1 py-2 my-2 rounded-[2px] flex items-center gap-10"
                        }
                        >
                        <p className="flex items-center justify-between gap-5 w-full">{image?.videoName}<FaArrowUpRightFromSquare /></p> 
                    </NavLink>
                )
            }
        </div>
    );
};

export default ModuleData;
