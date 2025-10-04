import axios from "axios";

const Api = axios.create({
    baseURL: "https://ppe-api-one.vercel.app/",
    timeout: 10000
})

export default Api;