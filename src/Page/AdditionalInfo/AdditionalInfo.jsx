
import Lottie from "lottie-react";
import workingData from '../../../public/working.json';

const AdditionalInfo = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <Lottie 
                animationData={workingData} 
                loop={true} 
                className="lg:w-2/5 lg:h-2/5"
            />
            <h1 className="gro text-4xl text-white font-semibold">Working</h1>
        </div>
    );
};

export default AdditionalInfo;
