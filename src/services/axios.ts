import axios from "axios";

const axiosHandler = axios.create({
    baseURL: "http://localhost:8080/api/v1/moments",
});

export default axiosHandler;