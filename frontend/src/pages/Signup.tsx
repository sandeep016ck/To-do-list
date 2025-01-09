import { useRef } from "react";
import { Input } from "../components/Input"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { CrossIcon } from "../icons/CrossIcon";
import BackImg from "../assets/pexels-snapwire-6992.jpg"

export function Signup() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function signup() {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if(!username || !email || !password){
      alert("All Fields are Mandetory")
    }
    
    try {
      await axios.post(`${BACKEND_URL}/api/to-do/user/register`, {
        username,
        email,
        password,
      });
      alert("Signin with your Email and Password")
      navigate("/signin");
    } catch (error) {
      console.log("Error in creating a user:", error);
      alert(
        "An error occurred while creating the user. Please try again."
      );
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-cover bg-center" style={{backgroundImage: `url(${BackImg})`}}>
      <div className="flex flex-col items-center  min-w-52 min-h-64 p-8 rounded-lg  bg-white/10 backdrop-blur-lg relative">
              <div className="absolute top-1 right-1">
                <CrossIcon Clicked={() => navigate("/")} />
              </div>
        <div className="font-bold text-2xl  p-2">SignUp</div>
         <div className="text-black flex gap-1">Already have an Account <div onClick={() => navigate("/signin")} className="text-slate-700 font-bold  cursor-pointer hover:underline underline-offset-1">SignIn</div></div>
        <Input placeholder="Enter Username" reference={usernameRef} />
        <Input placeholder="Enter Email" reference={emailRef} />
        <Input placeholder="Enter Password" reference={passwordRef} />
        <button
          className="mt-4 px-4 py-2 bg-slate-600  text-white font-bold rounded  active:translate-y-2"
          onClick={ signup}
        >
          SignUp
        </button>
      </div>
    </div>
  );
}
