
import Swal from 'sweetalert2' ;
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useNavigate } from 'react-router-dom';

const key = import.meta.env.VITE_IMAGE_HOISTING_API_KEY;
const apiUrl = `https://api.imgbb.com/1/upload?key=${key}`;

const AddSchool = () => {

  const { user } = useAuth();
  const navigate = useNavigate() ;
  const axiosCommon = useAxiosCommon();

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const schoolName = form.schoolName.value;
    const schoolCode = form.schoolCode.value;
    const schoolLogo = form.schoolLogo.files[0];
    const address = form.address.value;
    const country = form.country.value;
    const city = form.city.value;
    const postalCode = form.postalCode.value;
    const phone = form.phone.value;
    const principalName = form.principalName.value;
    const principalContact = form.principalContact.value;
    const schoolType = form.schoolType.value;

    const formData = new FormData();
    formData.append("image", schoolLogo);

    const { data: imageUrl } = await axios.post(apiUrl, formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    const schoolData = {
      schoolName,
      schoolCode,
      schoolLogo : imageUrl?.data?.display_url,
      phone,
      address,
      country,
      city,
      postalCode,
      userId : user?.uid,
      userName : user?.displayName,
      email : user?.email,
      principalName,
      principalContact,
      schoolType,
      grades : [] ,
      totalStudents : [] ,
      availableGrades : [] ,
    };

    const validateNumber = /^(?:\+88|01)?[13-9]\d{8}$/;
    if(!validateNumber.test(phone)){
        return Swal.fire({
            title: "Invalid Number",
            html: "Phone Number ins't valid <br/> plz entar a valid bangladesh number !",
            icon: "warning"
        });
    }

    if(!validateNumber.test(principalContact)){
        return Swal.fire({
            title: "Invalid Number",
            html: "Princial Number ins't valid <br/> plz entar a valid bangladesh number !",
            icon: "warning"
        });
    }

    const { data } = await axiosCommon.post("/addSchool", schoolData);
    if(data._id){
        form.reset() ;
        Swal.fire({
            title: "School Added !",
            text: "School added success fully !",
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
    <div className="min-h-[70vh] mx-3 lg:mx-0">
      <h1 className="play text-center my-16 text-4xl text-white">
        Add A School
      </h1>

      <div className="flex items-center justify-center flex-col w-full">
        <form onSubmit={hanldeSubmit} className="w-full flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <input
              required
              name="schoolName"
              className="outline-none rounded-md py-[7px] border-gray-300 focus:border-white border gro px-2 bg-transparent"
              color="white"
              type={"text"}
              placeholder={"School Name"}
            />
            <input
              required
              name="schoolCode"
              className="outline-none rounded-md py-[7px] border-gray-300 focus:border-white border gro px-2 bg-transparent"
              color="white"
              type={"number"}
              placeholder={"School Code"}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="border bg-transparent border-[#B0BEC5] p-0 rounded-md">
              <input
                required
                className="file-input bg-transparent cursor-pointer h-full mt-[1px] w-full"
                type="file"
                name="schoolLogo"
                // accept="image/*"
              />
            </div>
            <input
              required
              name="address"
              className="outline-none rounded-md py-[7px] border-gray-300 focus:border-white border gro px-2 bg-transparent"
              color="white"
              type={"text"}
              placeholder={"Address"}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <input
              required
              name="city"
              className="outline-none rounded-md py-[7px] border-gray-300 focus:border-white border gro px-2 bg-transparent"
              color="white"
              type={"text"}
              placeholder={"Add City"}
            />
            <input
              required
              name="country"
              className="outline-none rounded-md py-[7px] border-gray-300 focus:border-white border gro px-2 bg-transparent"
              color="white"
              type={"text"}
              placeholder={"Country"}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <input
              required
              name="postalCode"
              className="outline-none rounded-md py-[7px] border-gray-300 focus:border-white border gro px-2 bg-transparent"
              color="white"
              type={"text"}
              placeholder={"School Postal-Code"}
            />
            <input
              required
              name="phone"
              className="outline-none rounded-md py-[7px] border-gray-300 focus:border-white border gro px-2 bg-transparent"
              color="white"
              type={"text"}
              placeholder={"School Contact Number"}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <input
              required
              value={user?.email}
              name="email"
              className="outline-none rounded-md py-[7px] border-gray-300 focus:border-white border gro px-2 bg-transparent"
              color="white"
              type={"email"}
              placeholder={"Email"}
            />
            <input
              required
              name="principalName"
              className="outline-none rounded-md py-[7px] border-gray-300 focus:border-white border gro px-2 bg-transparent"
              color="white"
              type={"text"}
              placeholder={"Principal's Name"}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <input
              required
              name="principalContact"
              className="outline-none rounded-md py-[7px] border-gray-300 focus:border-white border gro px-2 bg-transparent"
              color="white"
              type={"number"}
              placeholder={"Principal's Contact Number"}
            />
            <select
              required
              className="border px-3 cursor-pointer rounded-lg bg-transparent focus:border-white focus:outline-none"
              name="schoolType"
            >
              <option disabled selected={true} value="Public">School Type</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>

          </div>

          <input type="submit" value={"Add"} className="btn btn-outline w-full my-5" />
        </form>
      </div>
    </div>
  );
};

export default AddSchool;
