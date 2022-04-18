import { Routes, Route } from "react-router-dom"
import { Home } from './Home'
import { Login } from './Login'
import { FlatDetails } from './FlatDetails'

export const AllRoutes = () => {
    return (
        <>  
         
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/flats/:id" element={<FlatDetails/>} />
      </Routes>
        </>
    )
}