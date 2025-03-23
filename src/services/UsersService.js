import axios from "axios"



export class UserServices{

    static async getUsers(){
        const url = import.meta.env.VITE_API_URL;
        try{
            const response = await axios.get(url+'/user');
            const data = response.data;
            return data.data;
        }catch(error){
           // console.log("Error in Users : ",error);
            return [];
            
        }
    }

    static async updateUser(user_id,userData){
        const url = import.meta.env.VITE_API_URL;
        try{
            const response = await axios.put(url+"/user/UpdateUsers",{
                UsuarioId:user_id,
                Nombre:userData.nombre,
                Contraseña:userData.contraseña,
                Correo:userData.correo,
                Estado:userData.estado,
                RolId:1,        //  ESTE ROLE DEBE SER CAMBIADO POR UN SELECT PARA SER DINAMICO.
            });
            const data = response.data;
            console.log("updated USER  :", response.data)
            return {data};
        }catch(error){
            console.log(error);
            return {success:false,message:"Ocurrio un error Inesperdo"}
        }

    }



    static async registerUser(userData){
        const url = import.meta.env.VITE_API_URL;
       try{
            const response = await axios.post(url+"/auth/register",userData);
            const data = response.data;
            console.log("Datas del register : ",data);
            return data;
       }catch(error){
         console.log(error.message);
         return {
            success:false,
            data:[],
            message:"Ocurrio un Error inesperado",
         }
       }
    }
}

