
import { Button } from "@material-tailwind/react";

const Features = () => {
    return (
        <div className="flex flex-col items-center justify-center mb-20">

            <h1 className="gro lg:my-10 lg:mb-20 text-neutral-50 text-4xl">Features</h1>

            <div className="grid gap-10 lg:gap-0 lg:grid-cols-4 w-full">

                <div className="rounded-lg gro mx-auto w-80 h-60 lg:w-64 lg:h-64 bg-[#D1D3D6] cursor-pointer relative">
                    <div className="rounded-full w-14 h-14 bg-[#312C2D] shadow-sm absolute -left-7 -top-7"></div>
                    <div className="m-7">
                        <h1 className="text-neutral-950 font-semibold text-xl">Manage School</h1>
                        <p className="text-neutral-950 mt-3 text-lg">Streamline the administration of all school operations seamlessly.</p>
                        <Button className="border capitalize gro mt-3 bg-transparent text-black shadow-none hover:shadow-none hover:bg-[#666666] hover:text-white text-base" size="sm">Read More</Button>
                    </div>
                </div>

                <div className="rounded-lg gro mx-auto w-80 h-60 lg:w-64 lg:h-64 bg-[#D1D3D6] cursor-pointer relative">
                    <div className="rounded-full w-14 h-14 bg-[#E20F7F] shadow-sm absolute -left-7 -top-7"></div>
                    <div className="m-7">
                        <h1 className="text-neutral-950 font-semibold text-xl">Manage Grades</h1>
                        <p className="text-neutral-950 mt-3 text-lg">Organize and monitor class schedules, assignments, and student performance.</p>
                        <Button className="border capitalize gro mt-3 bg-transparent text-black shadow-none hover:shadow-none hover:bg-[#666666] hover:text-white text-base" size="sm">Read More</Button>
                    </div>
                </div>

                <div className="rounded-lg gro mx-auto w-80 h-60 lg:w-64 lg:h-64 bg-[#D1D3D6] cursor-pointer relative">
                    <div className="rounded-full w-14 h-14 bg-[#5AEB72] shadow-sm absolute -left-7 -top-7"></div>
                    <div className="m-7">
                        <h1 className="text-neutral-950 font-semibold text-xl">Manage Routine</h1>
                        <p className="text-neutral-950 mt-3 text-lg">Create and update daily, weekly, and monthly routines for classes and activities.</p>
                        <Button className="border capitalize gro mt-3 bg-transparent text-black shadow-none hover:shadow-none hover:bg-[#666666] hover:text-white text-base" size="sm">Read More</Button>
                    </div>
                </div>

                <div className="rounded-lg gro mx-auto w-80 h-60 lg:w-64 lg:h-64 bg-[#D1D3D6] cursor-pointer relative">
                    <div className="rounded-full w-14 h-14 bg-[#1654CC] shadow-sm absolute -left-7 -top-7"></div>
                    <div className="m-7">
                        <h1 className="text-neutral-950 font-semibold text-xl">Update Information</h1>
                        <p className="text-neutral-950 mt-3 text-lg">Keep all student and staff information current and accurate with ease.</p>
                        <Button className="border capitalize gro mt-3 bg-transparent text-black shadow-none hover:shadow-none hover:bg-[#666666] hover:text-white text-base" size="sm">Read More</Button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Features;
