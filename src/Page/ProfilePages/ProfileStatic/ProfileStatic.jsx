
import bannerImg from '../../../../public/images/bannerImg.png'

const ProfileStatic = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <img src={bannerImg} alt="" />
            <div className="flex flex-col items-center justify-center gap-3 mt-5">
                <h1 className="gro text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FFB2] text-center">Discover new possibilities through <br /> additional educational and technical-related <br /> information !</h1>
                <p className="text-center gro text-base text-[#C7ABFF]">Passionate about creating intuitive tools that streamline school management, <br /> making education more efficient and accessible.</p>
            </div>
        </div>
    );
};

export default ProfileStatic;
