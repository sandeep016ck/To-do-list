import { useRef } from "react";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { CrossIcon } from "../icons/CrossIcon";
import BackImg from "../assets/pexels-snapwire-6992.jpg"

export function Signin() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function Signin() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if(!email || !password){
      alert("All Fields are Mandetory")
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/to-do/user/login`, {
        email,
        password,
      });

      const jwt = response.data.accesstoken;
      
      localStorage.setItem("token",jwt)

      if (response.status === 200) {
        alert("Login successful!");
        navigate("/");
      }
    } catch (error) {
      alert("An error occurred while logging in. Please try again.");
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-center bg-cover"  style={{backgroundImage: `url(${BackImg})`}}>
      <div className="flex flex-col items-center min-w-52 min-h-72 p-8 rounded-lg bg-white/10 backdrop-blur-lg relative">
        <div className="absolute top-1 right-1">
          <CrossIcon Clicked={() => navigate("/")} />
        </div>
        <div className="font-bold text-2xl  p-2">SignIn</div>
          <Input placeholder="Enter Email" reference={emailRef} />
          <Input placeholder="Enter Password" reference={passwordRef} />
        <button
          className="mt-4 px-4 py-2 bg-slate-700 text-white font-bold rounded active:translate-y-2"
          onClick={Signin}
        >
          SignIn
        </button>
      </div>
    </div>
  );
}
