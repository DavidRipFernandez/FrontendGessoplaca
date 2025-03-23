import axios from "axios";

export async function loginService(email,password){
    try{
        const URL = import.meta.env.VITE_API_URL+"/auth/login";
        const response = await axios.post(URL,{"Correo":email,"Password":password});
       // console.log("DATA ::: ",response.data);
        const data  = response.data;
        if(data.success){
            return{
                isSuccess:data.success,
                message:data.message,
                data:data.data
            }
        }
        return{
            isSuccess:false,
            message:data.message,
            data:null,
        }
    }catch(error){
        console.log(error);
        return{
            isSuccess:false,
            data:null,
            message:"Algo salio mal ",
        }
    }
}