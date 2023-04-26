import axios from "axios";

axios.defaults.baseURL = "https://happening-api-kelz.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;