import axios from "axios";

const Api = axios.create({
    baseURL: "https://ppp-api.vercel.app",
    timeout: 10000
})

export default Api;