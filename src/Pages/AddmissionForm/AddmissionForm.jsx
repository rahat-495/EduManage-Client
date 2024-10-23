
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import squarLoader from '../../../public/squarLoader.json'

const AddmissionForm = () => {
    
    const {id} = useParams() ;
    const {user , loading} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;
    const navigate = useNavigate() ;

    const { data : schoolInfo , isLoading : schoolLoading } = useQuery({
        queryKey : ['schoolInfo' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/schoolsDetails?id=${id}`) ;
            return data ;
        }
    })

    const { data : gradesInfo , isLoading : gradesLoading } = useQuery({
        queryKey : ['gradesInfo' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/classesData?schoolId=${id}`) ;
            return data ;
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
        const gender = form.gender.value ;
        
        const gradeData = gradesInfo?.find((data) => data?._id === grade)

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
            gender ,
            schoolName : schoolInfo?.schoolName ,
            schoolId : schoolInfo?._id ,
            grade ,
            gradeNumber : gradeData?.gradeNumber,
            schoolJoiningStatus : "pending" ,
            gradeJoiningStatus : "pending" ,
            isjoined : false ,
        }

        const validateNumber = /^(?:\+88|01)?[13-9]\d{8}$/;
        if(!validateNumber.test(studentNumber)){
            return Swal.fire({
                title: "Invalid Number",
                html: "Student Number ins't valid <br/> plz entar a valid bangladesh number !",
                icon: "warning"
            });
        }

        if(!validateNumber.test(parentNumber)){
            return Swal.fire({
                title: "Invalid Number",
                html: "Parent Number ins't valid <br/> plz entar a valid bangladesh number !",
                icon: "warning"
            });
        }

        Swal.fire({
            title: "Are you sure ?",
            text: "You won't be able for addmission ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes , do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post(`/reqForAddmission` , addmissionInfo)
                .then((res) => {
                    
                    if(res?.data?._id){
                        form.reset() ;
                        navigate('/') ;

                        Swal.fire({
                            title: "Request Sended !",
                            text: "Request Sended Success Fully !",
                            icon: "success"
                        });
                    }
                    else{
                        Swal.fire({
                            title: "You Are Already Applyed !",
                            text: "Plz wait for teachers reviwe .",
                            icon: "warning"
                        });
                    }

                })
            }
        });
        
    }

    if(loading || schoolLoading || gradesLoading){
        return (
            <div className="min-h-screen flex items-center justify-center mx-auto w-full">
                <Lottie animationData={squarLoader} loop={true}/>
            </div>
        )
    }

    return (
        <div className="min-h-[70vh] my-10 mx-3 lg:mx-0">
            
            <h1 className="text-white gro text-4xl font-semibold text-center my-14">Addmission Form</h1>
            
            <div className="flex items-center justify-center gap-5 flex-col w-full">

                <form onSubmit={handleAddmission} className="w-full flex flex-col gap-5">

                    <div className="grid grid-cols-1 gap-5">
                        <input className="outline-none rounded-md py-[10px] border-gray-300 focus:border-white border gro px-2 bg-transparent" name="name" defaultValue={user?.displayName} type="text" placeholder="Name" required/>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-5">
                        <input className="outline-none rounded-md py-[10px] border-gray-300 focus:border-white border gro px-2 bg-transparent" name="studentNumber" type="number" placeholder="Your Number" required/>

                        <select name="gender" placeholder="gender" className="border px-3 py-[10px] cursor-pointer rounded-lg bg-transparent focus:border-white focus:outline-none" required>
                            <option value={'male'}>Male</option>
                            <option value={'female'}>Female</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <input className="outline-none rounded-md py-[10px] border-gray-300 focus:border-white border gro px-2 bg-transparent" name="email" value={user?.email} type="email" placeholder="Email" required/>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <select className="outline-none rounded-md border-gray-300 focus:border-white border gro px-2 bg-transparent" value={schoolInfo?.schoolName} name="school" placeholder="School" required>
                            <option value={schoolInfo?.schoolName}>{schoolInfo?.schoolName}</option>
                        </select>

                        <select name="grade" placeholder="Grades" className="border px-3 py-[10px] cursor-pointer rounded-lg bg-transparent focus:border-white focus:outline-none" required>
                            <option selected={true} disabled>Grade</option>
                            {gradesInfo?.length > 0 ? (
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
                        <input className="outline-none rounded-md py-[10px] border-gray-300 focus:border-white border gro px-2 bg-transparent" name="parentNumber" type="number" placeholder="Parent Number" required/>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <input className="outline-none rounded-md py-[10px] border-gray-300 focus:border-white border gro px-2 bg-transparent" name="fatherName" type="text" placeholder="Father Name" required/>
                        <input className="outline-none rounded-md py-[10px] border-gray-300 focus:border-white border gro px-2 bg-transparent" name="motherName" type="text" placeholder="Mother Name" required/>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <input className="outline-none rounded-md py-[10px] border-gray-300 focus:border-white border gro px-2 bg-transparent" name="address" type="text" placeholder="Full Address" required/>
                    </div>
                    
                    <input type="submit" value={'Apply'} className="btn btn-outline gro"/>
                </form>

            </div>

        </div>
    );
};

export default AddmissionForm;
