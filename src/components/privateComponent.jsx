import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";


export function PrivateComponente({children}){
    
    const {user_data} = useContext(UserContext);
    return user_data.isLogged ? children : <Navigate to="/"/>
    
}