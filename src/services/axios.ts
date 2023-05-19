import axios from "axios";
const { token } = JSON.parse(localStorage.getItem("token") || "{}");

const axiosHandler = axios.create({
    baseURL: "http://localhost:8080/api/v1/moments",
    headers: {
        'Authorization': 'Bearer ' + token,
    },
});

export default axiosHandler;