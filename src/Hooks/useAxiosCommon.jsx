
import axios from "axios";

const axiosCommon = axios.create({
    baseURL : "https://edumanageserver.vercel.app/api"
})

const useAxiosCommon = () => {
    return axiosCommon ;
};

export default useAxiosCommon;
