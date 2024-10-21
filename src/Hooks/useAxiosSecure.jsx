
import axios from "axios";

const axiosSecure = axios.create({
    baseURL : "https://edumanageserver.vercel.app/api" ,
    withCredentials : true ,
})

const useAxiosSecure = () => {
    return axiosSecure ;
};

export default useAxiosSecure;
