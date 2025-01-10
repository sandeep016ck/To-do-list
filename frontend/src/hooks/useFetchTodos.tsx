import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


export function useFetchTodos(){
    const [todos,setTodos] = useState([])

    function refresh() {
        axios.get(`${BACKEND_URL}/api/to-do/task`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then((res) => {
            setTodos(res.data.task)
        })
    }

    // useEffect(() => {
    //     refresh()
    //     const interval = setInterval(() => {
    //         refresh()
    //     },3 * 1000)

    //     return () => {
    //         clearInterval(interval)
    //     } 
    // },[])

    return {todos, refresh}

}