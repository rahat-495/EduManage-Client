import { Button } from "@material-tailwind/react";

const AboutUs = () => {
    return (
        <div className="mb-20 mx-3">

            <h1 className="gro text-neutral-50 text-4xl text-center lg:mt-32 mb-20">About Us</h1>

            <div className="flex flex-col gap-5 lg:grid lg:grid-cols-9 lg:gap-10">
                <img className="rounded-lg col-span-4" src="https://cdni.iconscout.com/illustration/premium/thumb/primary-school-building-6464825-5349407.png" alt="" />
                <div className="divider divider-horizontal col-span-1 mx-auto"></div>
                <div className="col-span-4 text-white">

                    <div className="bg-gradient-to-r from-[#010313] p-1 rounded lg:bg-none lg:p-0">
                        <h1 className="text-2xl play mb-5">Who we are</h1>
                        <p className="mt-4 max-w-2xl gro mx-auto">
                        We aim to revolutionize school management by providing user-friendly features that cater to modern educational institutions. Our functionalities, from managing student records to tracking attendance and grades, ensure efficient and effective school administration.
                        </p>
                    </div>

                    <div className="bg-gradient-to-l from-[#010313] p-1 rounded mt-3 lg:bg-none lg:p-0 lg:mt-0">
                        <h1 className="text-2xl mb-5 play mt-10">Why Join Us</h1>
                        <p className="mt-4 max-w-2xl mx-auto gro">
                        Join us in transforming school operations and fostering an environment where both educators and students can thrive. Discover the power of EduManage and see the difference it can make in your educational institution.
                        </p>
                    </div>

                    <Button className="mt-5 w-full lg:w-auto lg:mt-16 capitalize play border bg-transparent hover:bg-[#666666]">Read More</Button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
