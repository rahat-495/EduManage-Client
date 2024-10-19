
import { Button, Input } from "@material-tailwind/react";

const ContactUs = () => {
    return (
        <div className="mb-10 lg:my-28 mx-3">
            
            <h1 className="gro text-4xl text-white text-center mb-16">Contact Us</h1>   

            <div className="flex flex-col-reverse gap-5 lg:grid lg:grid-cols-9 lg:gap-10">
                <div className="col-span-4 flex flex-col gap-5">
                    <Input color="white" className="text-white" label="Name" type="text" />
                    <Input color="white" className="text-white" label="Email" type="email" />
                    <Input color="white" className="text-white" label="Phone" type="number" />
                    <textarea placeholder="Enter Your Message Here" className="text-white bg-transparent border p-3 rounded-lg w-full h-[105px]" />
                    <Button className=" capitalize play border bg-transparent hover:bg-[#666666]" label="Message">Send</Button>
                </div>
                <div className="divider divider-horizontal col-span-1 mx-auto"></div>
                <img className="col-span-4 rounded-lg " src="https://t3.ftcdn.net/jpg/04/81/31/66/360_F_481316696_cPzBNRfqMpbq2cx2soWytWAjhzZYByS4.jpg" alt="" />
            </div>

        </div>
    );
};

export default ContactUs;
