
import axios from "axios";
import { useState } from "react";
import { IoImage } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";

const UploadImageForm = ({image , setImageLoading , setUploadedImages , uploadedImages , apiUrl}) => {
    
    const [imageName , setImageName] = useState('') ;
    const [uploadedImage , setUploadedImage] = useState('') ;
    const [click , setClick] = useState(false) ;

    const handleUploadImage = async (e) => {
        setImageLoading(true) ;
        const image = e.target.files[0] ;
        const formData = new FormData() ;
        formData.append('image' , image) ;
        const {data} = await axios.post(apiUrl , formData, {
            headers: { "content-type": "multipart/form-data" },
        })
        setUploadedImage(data?.data?.url) ;
        setImageLoading(false) ;
    }
    
    const handleAddImage = async () => {
        if(uploadedImage){
            setUploadedImages([...uploadedImages , { imageName , moduleImage : uploadedImage , whichStudentsSeen : [] }]) ;
        }
        setUploadedImage('') ;
    }

    return (
        <form className="flex items-center gap-6 w-full h-full">
            <input onChange={(e) => setImageName(e.target.value)} required type="text" name={`image${image}Name`} placeholder={`Image ${image} Name`} className="outline-none w-[35%] text-white cursor-pointer h-full rounded-md py-[6px] border border-teal-900 focus:border-white gro px-2 gro"/> 

            <p className="text-white font-bold">:</p>

            <label htmlFor={`image${image}`} className="flex items-center w-[35%] border justify-center gap-3 h-full text-white cursor-pointer gro rounded-md font-semibold text-base"><IoImage className="text-xl"/>Upload Image</label>

            <input
                disabled={uploadedImage}
                id={`image${image}`}
                onChange={handleUploadImage}
                className="outline-none hidden text-white cursor-pointer h-full rounded-md py-[6px] border border-teal-900 focus:border-white gro px-2 bg-transparent w-full bg-gradient-to-r from-purple-500 to-[#6B0DEC] capitalize gro"
                color="white"
                type={"file"}
                placeholder={`Write For Module`}
                accept="image/*"
            /> 
            {
                uploadedImage && !click &&
                <button onClick={() => {
                    handleAddImage() ;
                    setClick(true) ;
                }} type="button" className="bg-transparent border shadow-none h-full w-[15%] ml-auto gro capitalize font-semibold text-base px-3 rounded text-white">Add</button> 
            }
            {
                !uploadedImage && click &&
                <button type="button" className="bg-transparent border cursor-default shadow-none h-full w-[15%] text-orange-700 flex items-center justify-center text-lg ml-auto gro capitalize font-semibold px-3 rounded"><IoMdDoneAll /></button> 
            }
        </form>
    );
};

export default UploadImageForm;
