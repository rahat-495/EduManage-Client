
import Swal from 'sweetalert2' ;
import { Input, Option, Select } from "@material-tailwind/react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { GiCancel } from "react-icons/gi";

const arr = [1,2,3,4,5,6,7,8,9,10,11,12] ;

const AddGrade = () => {

  const { user } = useAuth();
  const navigate = useNavigate() ;
  const axiosSecure = useAxiosSecure() ;
  const [subjects , setSubjects] = useState([]) ;
  const [gradeData , setGradeData] = useState({
    schoolId : "" ,
    gradeNumber : "" ,
  }) ;

  const {data} = useQuery({
    queryKey : ["currentUserSchools" , user?.email] ,
    queryFn : async () => {
      const {data} = await axiosSecure.get(`/yourSchools?email=${user?.email}`) ;
      return data ;
    }
  })

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const gradeName = form.className.value;
    const totalStudent = form.totalStudent.value;
    const gradeType = form.classType.value;
    const classTeacherName = form.classTeacherName.value;

    const classData = {
      gradeName ,
      schoolId : gradeData?.schoolId ,
      gradeNumber : gradeData?.gradeNumber ,
      totalStudent ,
      gradeType ,
      subjectsArray : subjects ,
      email : user?.email ,
      classTeacherName ,
      totalStudents : [] ,
    };

    const { data } = await axiosSecure.post("/addClass", classData);
    console.log(data)
    if(data._id){
        form.reset() ;
        Swal.fire({
            title: "Class Created !",
            text: "Class Created Success fully !",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Got It"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/') ;
            }
        });
    }

  };

  const handleSubjects = async (e) => {
    e.preventDefault() ;
    const subject = e.target.subject.value ;
    setSubjects([...subjects , subject]) ;
    e.target.reset() ;
  }

  const handleRemoveSubject = (subject) => {
    const newSubs = subjects.filter((sub) => sub !== subject) ;
    setSubjects(newSubs) ;
  }

  return (
    <div className="min-h-[70vh]">
      <h1 className="play text-center my-16 text-4xl text-white">
        Add A Grade
      </h1>

      <div className="flex justify-center flex-col w-full relative">
        <form onSubmit={hanldeSubmit} className="w-full flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <Select label="School Name" onChange={(e) => setGradeData((preve) => {
              return{
                ...preve ,
                schoolId : e,
              }
            })}>
              {
                data && data.length > 0 ? (
                  data.map((school) => (
                    <Option key={school?._id} value={school?._id} className='my-1'>
                      {school?.schoolName}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No schools available</Option>
                )
              }
            </Select>
            <Input
              required
              name="className"
              className="p-full"
              color="white"
              type={"text"}
              label={"Grade Name"}
            />
          </div>

          <div className="grid grid-cols-1 gap-5">
            <Select label="Grade Number" onChange={(e) => setGradeData((preve) => {
                return{
                  ...preve ,
                  gradeNumber : e,
                }
              })}>
                {
                  arr && arr.length > 0 ? (
                    arr.map((number) => (
                      <Option key={number} value={number} className='my-1'>
                        {number}
                      </Option>
                    ))
                  ) : (
                    <Option disabled>No schools available</Option>
                  )
                }
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-5">  
            <Input
              required
              name="totalStudent"
              className="p-full"
              color="white"
              type={"number"}
              label={"Total Student Count"}
            />
            <select
              required
              className="border px-3 cursor-pointer rounded-lg bg-transparent focus:border-white focus:outline-none"
              name="classType"
            >
              <option disabled selected={true} value="Public">Class Type</option>
              <option value="English Medium">English Medium</option>
              <option value="Bangla Medium">Bangla Medium</option>
              <option value="Dakhil Board">Dakhil Board</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <Input
              required
              value={user?.email}
              name="email"
              className="p-full"
              color="white"
              type={"email"}
              label={"Email"}
              />
          </div>  

          <div className="grid grid-cols-2 gap-5">

            <Input
              required
              name="classTeacherName"
              className="p-full"
              color="white"
              type={"text"}
              label={"Class Teacher Name"}
              />

          </div>  

          <input type="submit" value={"Create"} className={`btn btn-outline w-full my-5 ${subjects?.length > 0 && 'mt-12'}`} />
        </form>

        <form onSubmit={handleSubjects} className={`flex border rounded-lg p-1 absolute w-[710px] bottom-[108px] right-0 ${subjects?.length > 0 && 'bottom-[136px]'}`}>
          <input required name='subject' className={`bg-transparent w-full h-[30px] rounded-lg focus:outline-none px-3`} placeholder='Subjects'/>
          <input type="submit" value={'Add'} className='bg-white text-black gro font-semibold rounded px-1 cursor-pointer hover:text-white hover:bg-gray-700 duration-300'/>
        </form>

        <div className={`grid grid-cols-10 absolute w-full bottom-[90px] overflow-x- gap-2 ${subjects?.length > 0 && "rounded-lg p-0"}`} >
          {
            subjects?.length > 0 && subjects?.map((subject) => <div key={subject} className='border flex items-center justify-center gap-1 gro capitalize rounded'><GiCancel className='hover:text-red-700 cursor-pointer duration-200' onClick={() => handleRemoveSubject(subject)}/> {subject}</div>)
          }
        </div>

      </div>
    </div>
  );
};

export default AddGrade;
