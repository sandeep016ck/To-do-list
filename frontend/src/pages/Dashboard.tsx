import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateTodo } from "../components/CreateTodo";
import { AddIcon } from "../icons/AddIcon";
import { TodoIcon } from "../icons/TodoIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Todo } from "../icons/Todo";
import { useFetchTodos } from "../hooks/useFetchTodos";
import BackImg from "../assets/pexels-snapwire-6992.jpg"
import Logo from "../assets/file.png"

export function Dashboard() {
  const navigate = useNavigate();
  const [validUser, setValidUser] = useState(false);
  const [username, setUsername] = useState(String);
  const [addTodo, setAddTodo] = useState(false);  // Add state for handling CreateTodo visibility
  const { todos, refresh } = useFetchTodos();

  useEffect(() => {
    async function findUser() {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // Fetch user metadata
          const response = await axios.get(`${BACKEND_URL}/api/to-do/user/meta`, {
            headers: {
              Authorization:token,
            },
          });

          
          // Set user info if response is valid
          if (response.data?.user) {
            setUsername(response.data.user);
            setValidUser(true);
          }
        } catch (error) {
          console.error("Error fetching user metadata:", error);
          setValidUser(false);
        }
      }
    }

    findUser();
  }, []);

  async function deleteTask(taskId: string) {
    try {
      await axios.delete(`${BACKEND_URL}/api/to-do/task/${taskId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      refresh(); // Refresh the todos after successful deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  function logout(){
    localStorage.removeItem("token");
    navigate("/signup")
  }
  // bg-gradient-to-r from-gray-900 via-gray-800 to-black
  return (
    <div className="h-screen w-full bg-cover bg-center  flex flex-col items-center p-2" style={{backgroundImage: `url(${BackImg})`}} >
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/30 rounded-full shadow-xl p-4 h-20 w-[80%]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full border border-white/20" aria-hidden="true"></div>
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="">
              <img className="h-9" src={Logo} />
            </div>
            <div className="text-2xl font-bold text-black ">
             Todo App 
            </div>
            </div>
          <div className="relative">
            {validUser ? (
              <div className="flex gap-2 items-center">
                <div className="font-bold text-lg pr-2 text-black">
                  Welcome <span className=" text-slate-700 font-mono underline underline-offset-1">{username}</span>
                </div>
                <div> 
                  <button
                  className="rounded-full bg-slate-700 p-2 border font-bold h-11 w-28"
                  onClick={() => {
                    logout()
                  }}
                  >
                   Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="rounded-full bg-slate-700 p-2 border font-bold h-11 w-28"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                SignUp
              </button>
            )}
          </div>
        </div>
      </div>

      <CreateTodo
        open={addTodo}  // Control visibility with state
        onClose={(success) => {
          if (success) {
            refresh();  // Refresh todos after adding
            setAddTodo(false);  // Close CreateTodo form after success
          }
        }}
      />

    <div className="flex-1 w-full flex justify-center items-center min-h-[60%]">
      <div className="flex flex-col items-center min-w-[30%] max-h-[60%] p-3 rounded-lg bg-white/10 backdrop-blur-lg border-2 border-black">
        <div className="flex justify-center items-center p-2 w-full gap-2 mb-2 border-b-2">
          <span className="text-black font-bold text-lg">Add To-do</span>
          <AddIcon Clicked={() => setAddTodo(true)} />
        </div>

        <div className="w-full flex flex-col items-center gap-1 overflow-y-scroll">
          {todos && todos.length > 0 ? (
            todos.map((taskObj) => (
              //@ts-ignore
              <Todo key={taskObj._id} desc={taskObj.task.desc} onDelete={() => deleteTask(taskObj._id)} />
            ))
          ) : (
            <p className="text-white">No todos yet. Add your first task!</p>
          )}
        </div>
      </div>
    </div>

    </div>
  );
}
