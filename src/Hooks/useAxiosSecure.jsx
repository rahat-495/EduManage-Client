
import axios from "axios";

const axiosSecure = axios.create({
    baseURL : "https://edumanage-server.onrender.com/api" ,
    // baseURL : "http://localhost:5555/api" ,
    withCredentials : true ,
})

const useAxiosSecure = () => {
    return axiosSecure ;
};

export default useAxiosSecure;
