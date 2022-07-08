import axios from "axios";

export const axiosInstance = axios.create({
 baseURL:"https://blog-tsq.herokuapp.com/api/"
}) 