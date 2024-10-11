
import Swal from 'sweetalert2' ;
import { Input, Tooltip } from "@material-tailwind/react";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useNavigate } from 'react-router-dom';

const AddGrade = () => {

  const { user } = useAuth();
  const navigate = useNavigate() ;
  const axiosCommon = useAxiosCommon();

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const gradeName = form.className.value;
    const schoolId = form.schoolId.value;
    const gradeNumber = form.classNumber.value;
    const totalStudent = form.totalStudent.value;
    const gradeType = form.classType.value;
    const subjects = form.subjects.value;
    const classTeacherName = form.classTeacherName.value;

    const subjectsArray = subjects.split(',').map((sub) => sub.trim()) ;

    const classData = {
      gradeName ,
      schoolId ,
      gradeNumber ,
      totalStudent ,
      gradeType ,
      subjectsArray ,
      email : user?.email ,
      classTeacherName ,
      totalStudents : [] ,
    };

    const { data } = await axiosCommon.post("/addClass", classData);
    if(data.insertedId){
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

  return (
    <div className="min-h-[70vh]">
      <h1 className="play text-center my-16 text-4xl text-white">
        Add A Grade
      </h1>

      <div className="flex items-center justify-center flex-col w-full">
        <form onSubmit={hanldeSubmit} className="w-full flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <Input
              required
              name="schoolId"
              className="p-full"
              color="white"
              type={"text"}
              label={"School Id"}
            />
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
            <Input
              required
              name="classNumber"
              className="p-full"
              color="white"
              type={"text"}
              label={"Grade NO : Like 1,2,3,4,5..."}
            />
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
            <Tooltip content="Separate by coma ','">
              <Input
                required
                name="subjects"
                className="p-full"
                color="white"
                type={"text"}
                label={"Subjects Write Like This : English , Math , etc"}
                />
            </Tooltip>
            <Input
              required
              name="classTeacherName"
              className="p-full"
              color="white"
              type={"text"}
              label={"Class Teacher Name"}
              />
          </div>  

          <input type="submit" value={"Create"} className="btn btn-outline w-full my-5" />
        </form>
      </div>
    </div>
  );
};

export default AddGrade;
