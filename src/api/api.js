import axios from "axios";

const API = axios.create({
 baseURL: "https://tripvault-backend-g7va.onrender.com/api",
});
export default API;
