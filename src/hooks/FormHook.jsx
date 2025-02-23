import { useState } from "react";



export function FormHook(datas){
    const [data,setData] = useState({...datas});

        const updateData = (name, value) => {
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }   

        const clearData = ()=>{
            setData({...datas})
        }
    

        return {
            data,
            updateData,
            clearData,
        }

    }
