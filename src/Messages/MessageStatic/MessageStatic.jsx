
import messageLogo from '../../../public/images/messageLogo.png'

const MessageStatic = () => {

    const year = new Date().getFullYear() ;

    return (
        <div className="flex flex-col items-center justify-center gro h-[75vh]">
            <img src={messageLogo} alt="" />
            <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2] text-center mt-3">Select user or class mates <br /> to send message !</h1>
            <p className="font-semibold text-2xl text-[#C7ABFF] text-center mt-3">All rigth reserved by EduManage {year}</p>
        </div>
    );
};

export default MessageStatic;
