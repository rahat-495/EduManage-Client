
import Lottie from "lottie-react";
import workingData from '../../../public/working.json';

const ContactUs = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full min-h-[70vh] overflow-hidden'>
            <Lottie
                animationData={workingData} 
                loop={true} 
                className="w-2/5 h-2/5"
            />
            <h1 className="gro text-4xl text-white font-semibold">Working</h1>
        </div>
    );
};

export default ContactUs;
