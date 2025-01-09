import { useState } from "react"


export function Check(){
    const [Check,unCheck] = useState(false)
    const fillColor = Check ? "green" : "none"
    return <div onClick={ () => unCheck(!Check)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill={fillColor} viewBox="0 0 24 24" stroke-width="1.8" stroke="black" className="size-7">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
     </svg>
    </div>
  
}