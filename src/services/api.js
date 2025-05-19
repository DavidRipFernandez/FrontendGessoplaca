import axios from "axios";


const api = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,
        timeout : 10_000,
    }
);

//Ejemplo de interceptor de respuesta :
api.interceptors.response.use(
    response => response.data,  //extrae directamente .data
    error => Promise.reject(error.response?.data || error.message)

);

export default api;