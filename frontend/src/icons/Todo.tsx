import { Bin } from "./Bin";
import { Check } from "./Check";


export function Todo({desc , onDelete} : {desc : string, onDelete:() => void}){
    

    return <div className="bg-slate-300  flex items-center  text-black min-h-14  w-56  rounded-md font-bold  p-1">
        <div className="mx-2">
            <Check />
        </div>
        <div className="text-lg flex-1">
            {desc}
        </div>
        <div onClick={onDelete} className="cursor-pointer ">
            <Bin />
        </div>
    </div>

}