
import { Input, Option, Select } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import loader from '../../../../public/roundedLoader.json'

const UpdateAddmissionFrom = () => {

    const {id} = useParams() ;
    const {user , loading} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;
    const navigate = useNavigate() ;

    const { data : currentData , isLoading : currentDataLoading } = useQuery({
        queryKey : ['schoolInfo' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/currentAddissionFormData?id=${id}`) ;
            return data ;
        }
    })

    const { data : gradesInfo , isLoading : gradesLoading } = useQuery({
        queryKey : ['gradesInfo' , user?.email , currentData?.schoolId] ,
        queryFn : async () => {
            if(currentData?.schoolId){
                const {data} = await axiosSecure.get(`/gradesInfo?schoolId=${currentData?.schoolId}`) ;
                return data ;
            }
        }
    })
    
    const handleAddmission = async (e) => {
        e.preventDefault() ;
        
        const form = e.target ;
        const studentName = form.name.value ;
        const studentEmail = form.email.value ;
        const parentNumber = form.parentNumber.value ;
        const studentNumber = form.studentNumber.value ;
        const fatherName = form.fatherName.value ;
        const motherName = form.motherName.value ;
        const grade = form.grade.value ;
        const address = form.address.value ;
        
        const addmissionInfo = {
            studentName ,
            studentUid : user?.uid ,
            studentImage : user?.photoURL ,
            studentEmail ,
            studentNumber ,
            parentNumber ,
            fatherName ,
            motherName ,
            address,
            schoolName : currentData?.schoolName ,
            schoolId : currentData?.schoolId ,
            grade ,
            schoolJoiningStatus : "pending" ,
            gradeJoiningStatus : "pending" ,
        }

        Swal.fire({
            title: "Are you sure ?",
            text: "You won't be able for update addmission ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes , do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post(`/updateAddmission?id=${currentData?._id}` , addmissionInfo)
                .then((res) => {
                    if(res?.data?.modifiedCount){
                        form.reset() ;
                        navigate('/') ;

                        Swal.fire({
                            title: "Updated",
                            text: "Addmission Updated Success Fully !",
                            icon: "success"
                        });
                    }
                    else{
                        Swal.fire({
                            title: "Something Are Wrong",
                            text: "Plz Try Again Later !",
                            icon: "warning"
                        });
                    }

                })
            }
        });
        
    }

    if(loading || currentDataLoading || gradesLoading){
        return (
            <div className="min-h-screen flex items-center justify-center mx-auto w-full">
                <Lottie animationData={loader} loop={true}/>
            </div>
        )
    }

    return (
        <div className="min-h-[70vh] my-10">
            
            <h1 className="text-white gro text-4xl font-semibold text-center my-14">Addmission Form</h1>
            
            <div className="flex items-center justify-center gap-5 flex-col w-full">

                <form onSubmit={handleAddmission} className="w-full flex flex-col gap-5">

                    <div className="grid grid-cols-2 gap-5">
                        <Input name="name" defaultValue={currentData?.studentName} type="text" label="Name" required/>
                        <Input name="email" value={currentData?.studentEmail} type="email" label="Email" required/>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-5">
                        <Input name="studentNumber" defaultValue={currentData?.studentNumber} type="number" label="Your Number" required/>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <Select value={currentData?.schoolName} name="school" label="School" required>
                            <Option value={currentData?.schoolName}>{currentData?.schoolName}</Option>
                        </Select>

                        <select defaultValue={currentData?.grade} name="grade" label="Grades" className="border px-3 py-[10px] cursor-pointer rounded-lg bg-transparent focus:border-white focus:outline-none" required>
                            <option selected={true} disabled>Grade</option>
                            {
                                gradesInfo?.length > 0 ? (
                                gradesInfo?.map((data) => (
                                    <option className="cursor-pointer" key={data?._id} value={data?._id}>
                                        {data?.gradeNumber}
                                    </option>
                                ))) : 
                                (   
                                    <option value="" disabled>
                                        No Grades Available
                                    </option>
                                )
                            }
                        </select>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <Input name="parentNumber" defaultValue={currentData?.parentNumber} type="number" label="Parent Number" required/>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <Input name="fatherName" defaultValue={currentData?.fatherName} type="text" label="Father Name" required/>
                        <Input name="motherName" defaultValue={currentData?.motherName} type="text" label="Mother Name" required/>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <Input name="address" defaultValue={currentData?.address} type="text" label="Full Address" required/>
                    </div>
                    
                    <input type="submit" value={'Apply'} className="btn btn-outline gro"/>
                </form>

            </div>

        </div>
    );
};

export default UpdateAddmissionFrom;
