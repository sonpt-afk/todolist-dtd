import axios, { AxiosInstance } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export default axiosClient;