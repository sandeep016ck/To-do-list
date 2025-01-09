
interface inputprops {
    reference?:any
    placeholder:string
}

export function Input( {reference,placeholder}:inputprops){
    return <div>
        <input ref={reference} placeholder={placeholder} type={"text"} className="border-black border-2 bg-white/10 backdrop-blur-lg px-4 py-2  m-2 rounded-md placeholder-black" />
    </div>
}