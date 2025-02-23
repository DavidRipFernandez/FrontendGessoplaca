import { useReducer } from "react";
import { UserContext } from "./UserContext";
import { UserReducer } from "./UserReducer";


const initializerValue = ()=>{
    const user =  JSON.parse(localStorage.getItem('user'));
    return {
        isLogged:user?true:false,
        user:user,
    }

}

export function UserProvider({children}){
    
    const {user_data,dispatch} = useReducer(UserReducer,{},initializerValue);


    const login = (email,password)=>{
        
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