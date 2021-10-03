import axios from "axios";

const api = axios.create({
  baseURL: "https://test-mais-a-educacao-v1.herokuapp.com",
});

export default api;
