import { Routes, Route } from "react-router-dom"
import { Home } from './Home'
import { Login } from './Login'
import { Signup } from './Signup'
import { FlatDetails } from './FlatDetails'
import { Navbar } from "./Navbar"

export const AllRoutes = () => {
    return (
        <>  
        <Navbar/>    
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/flats/:id" element={<FlatDetails/>} />
      </Routes>
        </>
    )
}