import axios from "axios";
import { toast } from "react-toastify";

const Api = axios.create({
    baseURL: "https://ppe-api-one.vercel.app/",
    timeout: 10000,
    headers: {
    "Content-Type": "application/json",
  },
})


Api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.data?.message?.includes("jwt expired")) {
      toast.error("⚠️ Sua sessão expirou. Faça login novamente.");
      localStorage.removeItem("token");      
    }
    return Promise.reject(error);
  }
);


export default Api;