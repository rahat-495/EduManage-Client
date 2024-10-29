
import { useLocation } from "react-router-dom";

const UploadSubject = () => {

    const {pathname} = useLocation() ;
    console.log(pathname.split('/')[3] , pathname.split('/')[4])

    return (
        <div className="min-h-[70vh] mx-3 mb-10 lg:mx-0 lg:mb-5 lg:mt-5 bg-[#010313] lg:rounded">
            <div className="bg-[#010313]">
                {/* asdf */}
            </div>
        </div>
    );
};

export default UploadSubject;
