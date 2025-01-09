
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'

function App() {
   return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/signin' element={<Signin />}></Route>
    </Routes>   
   </BrowserRouter>
}

export default App
