import axios from "axios";

export class Role{


    static async getRoles(){
        const url = import.meta.env.VITE_API_URL;
        try{
            const response = await axios.get(url+"/role/GetAllRoles");
            const data = response.data;
            return data.data
        }catch(error){
            //console.log("Roles Error");
            return [];
        }
    }

    static async createRol(rol,description){
        const url = import.meta.env.VITE_API_URL;
        try{
            const response = await axios.post(url+"/role",{NombreRol:rol,Descripcion:description});
            const data = response.data;
            return {success:true,message:"Creado con Exito",data:data.data};
        }catch(error){
            //console.log("Error a crear Rol");
            return {success:false,data:[],message:"Error inseperado"};
        }
    }


    static async getModulesByRole (roleId){
        const url = import.meta.env.VITE_API_URL;
            try{
                const response = await axios.get(url+"/"+`modulePermission/PermissionByRol?rolId=${roleId}`);
                const data = response.data;
                return {success:data.success,data:data.data,message:data.message};
            }catch(error){
                console.log("ERROR EN MODULES " ,error);
                return{success:false,data:[],message:"Ocurrio un error"};
            }
    }


}