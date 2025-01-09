import axios from "axios";
import { CrossIcon } from "../icons/CrossIcon";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import { useRef } from "react";

export function CreateTodo({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (success: boolean) => void;
}) {
  const todoInput = useRef<HTMLInputElement>(null);

  async function addTodo() {
    const todo = todoInput.current?.value;

    if(!todo){
      alert("Empty!!!")
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No account found!");
      onClose(false); 
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/to-do/task`,
        {
          task: {
            desc: todo,
            completion: false,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      onClose(true); 
    } catch (error) {
      console.error("Error adding todo:", error);
      onClose(false); 
    }
  }

  return (
    <div>
      {open && (
        <div>
          {/* overlay */}
          <div className="h-screen w-full bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center items-center z-10" />

          {/* main sec */}
          <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center z-20">
            <div className="bg-white p-3 rounded-lg shadow-lg w-[80%] sm:w-[50%] lg:w-[30%]">
              <div className="flex justify-end">
                <CrossIcon Clicked={() => onClose(true)} />
              </div>
              <div className="p-4 text-center text-lg flex items-center">
                <Input placeholder="Enter Todo" reference={todoInput} />
                <button
                  className="h-11 w-28 bg-green-500 text-white font-bold p-1 rounded-md border-2 border-black active:translate-y-1"
                  onClick={addTodo}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
