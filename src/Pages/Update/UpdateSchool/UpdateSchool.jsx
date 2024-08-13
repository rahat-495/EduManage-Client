
import Swal from "sweetalert2";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";

const key = import.meta.env.VITE_IMAGE_HOISTING_API_KEY;
const apiUrl = `https://api.imgbb.com/1/upload?key=${key}`;

const UpdateSchool = () => {

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();
  
  const { data } = useQuery({
    queryKey: ["schoolDetails"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/schoolsDetails?id=${id}`);
      return data;
    },
  });

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
      schoolLogo: imageUrl?.data?.display_url,
      phone,
      address,
      country,
      city,
      postalCode,
      userId: user?.uid,
      userName: user?.displayName,
      email: user?.email,
      principalName,
      principalContact,
      schoolType,
      classes: [],
    };

    const { data } = await axiosCommon.put(`/updateSchool?id=${id}`, schoolData);
    if (data.modifiedCount > 0) {
      form.reset();
      Swal.fire({
        title: "School Updated !",
        text: "Data Updated Success fully !",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Got It",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
    console.log(data)
  };

  return (
    <div className="min-h-[70vh]">
      <h1 className="play text-center my-16 text-4xl text-white">
        Update : {data?.schoolName}
      </h1>

      <div className="flex items-center justify-center flex-col w-full">
        <form onSubmit={hanldeSubmit} className="w-full flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <Input
              required
              defaultValue={data?.schoolName}
              name="schoolName"
              className="p-full"
              color="white"
              type={"text"}
              label={"School Name"}
            />
            <Input
              required
              defaultValue={data?.schoolCode}
              name="schoolCode"
              className="p-full"
              color="white"
              type={"number"}
              label={"School Code"}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="border bg-transparent border-[#B0BEC5] p-0 rounded-md flex items-center justify-between">
              <input
                required
                className="file-input bg-transparent cursor-pointer h-9 mt-[1px] w-full"
                type="file"
                name="schoolLogo"
              />
              <p className="">{data?.schoolLogo}</p>
            </div>
            <input
              required
              defaultValue={data?.address}
              name="address"
              className="rounded-lg bg-transparent border p-3 text-white"
              color="white"
              type={"text"}
              label={"Address"}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Input
              required
              name="city"
              defaultValue={data?.city}
              className="p-full"
              color="white"
              type={"text"}
              label={"Add City"}
            />
            <Input
              required
              name="country"
              defaultValue={data?.country}
              className="p-full"
              color="white"
              type={"text"}
              label={"Country"}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Input
              required
              defaultValue={data?.postalCode}
              name="postalCode"
              className="p-full"
              color="white"
              type={"text"}
              label={"School Postal-Code"}
            />
            <Input
              required
              defaultValue={data?.phone}
              name="phone"
              className="p-full"
              color="white"
              type={"text"}
              label={"School Contact Number"}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Input
              required
              value={data?.email}
              name="email"
              className="p-full"
              color="white"
              type={"email"}
              label={"Email"}
            />
            <Input
              required
              name="principalName"
              defaultValue={data?.principalName}
              className="p-full"
              color="white"
              type={"text"}
              label={"Principal's Name"}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Input
              required
              defaultValue={data?.principalContact}
              name="principalContact"
              className="p-full"
              color="white"
              type={"number"}
              label={"Principal's Contact Number"}
            />
            <select
              required
              className="border px-3 cursor-pointer rounded-lg bg-transparent focus:border-white focus:outline-none"
              name="schoolType"
            >
              <option selected={data?.schoolType === "public"} value="Public">Public</option>
              <option selected={data?.schoolType === "private"} value="Private">Private</option>
            </select>
          </div>

          <input type="submit" value={"Update"} className="btn btn-outline w-full my-5" />
        </form>
      </div>
    </div>
  );
};

export default UpdateSchool;
