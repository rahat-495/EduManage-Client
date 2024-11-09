
import { useLocation } from "react-router-dom";

const MyClassesDefault = () => {

    const {pathname} = useLocation() ;
    console.log(pathname) ;

    return (
        <div className="flex items-center justify-center h-[60vh] overflow-hidden p-1 w-full bg-[#010313] rounded">
            default
        </div>
    );
};

export default MyClassesDefault;
