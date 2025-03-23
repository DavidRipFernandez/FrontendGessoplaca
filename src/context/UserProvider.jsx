import { useReducer } from "react";
import { UserContext } from "./UserContext";
import { UserReducer } from "./UserReducer";
import { loginService } from "../services/Login";


const initializerValue = ()=>{
    
    const user =  JSON.parse(localStorage.getItem('user'));
    return {
        isLogged:user?true:false,
        user:user,
    }

}

export function UserProvider({children}){
    const [user_data,dispatch] = useReducer(UserReducer,{},initializerValue);


    const login = async(email,password)=>{
          const data = await loginService(email,password);
          if(data.isSuccess){

            let user = {
                email,
                token:data.data,
            }
            const action = {
                type:'login',
                payload:user
             }
    
            localStorage.setItem('user',JSON.stringify(user));
            
            dispatch(action);
            return {isSuccess:true,message:data.message};
          }
          return {isSuccess:false,message:data.message};
    }



    const logout =  async()=>{

        const action  = {
            type:'logout',
        }

        localStorage.clear();
        dispatch(action);

    }

    return (<>
        <UserContext.Provider value={{ login,logout,user_data}} >
            {children}
        </UserContext.Provider>
    </>);
}