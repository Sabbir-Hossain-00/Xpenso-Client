import { use } from "react";
import { Loader } from "../../Pages/Loader/Loader";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export const PrivateRoute = ({children})=>{
    const {user , loading} = use(AuthContext)
    const location = useLocation();
    if(loading){
        return <Loader/>
    }
    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children ;
}