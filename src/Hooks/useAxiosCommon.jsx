
import axios from "axios";

const axiosCommon = axios.create({
    baseURL : "http://localhost:5555/api"
})

const useAxiosCommon = () => {
    return axiosCommon ;
};

export default useAxiosCommon;
