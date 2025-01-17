import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Constants";
import { useEffect, useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const [isAuthorized, setIsAuthorized] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const location = useLocation();

//   const refreshToken = async () => {
//     const refreshToken = localStorage.getItem(REFRESH_TOKEN);
//     if (!refreshToken) {
//       setIsAuthorized(false);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await api.post("track/token/refresh/", {
//         refresh: refreshToken,
//       });
//       if (res.status === 200) {
//         localStorage.setItem(ACCESS_TOKEN, res.data.access);
//         setIsAuthorized(true);
//       } else {
//         setIsAuthorized(false);
//       }
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//       setIsAuthorized(false);
//     }
//     setIsLoading(false);
//   };

//   const auth = async () => {
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     if (!token) {
//       setIsAuthorized(false);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);
//       const tokenExpiration = decoded.exp;
//       const now = Date.now() / 1000;
      
//       if (tokenExpiration < now) {
//         await refreshToken();
//       } else {
//         setIsAuthorized(true);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error("Error checking token:", error);
//       setIsAuthorized(false);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     auth();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>; // Or your loading component
//   }

//   return isAuthorized ? 
//     children : 
//     <Navigate to="/Login" state={{ from: location }} replace />;
// };

// export default ProtectedRoute;function ProtectedRoute({children}){
  
function ProtectedRoute({children}){
  
    const navigate=useNavigate();

   const [Authorization,setAuthorization]=useState(null);

   useEffect(()=>{
    auth().catch((error)=>{setAuthorization(false)})
   },[])

   const refreshToken=async()=>{
       const refreshToken=localStorage.getItem(REFRESH_TOKEN)

       try{
         const res=await api.post("/api/token/refresh/",{
            refresh:refreshToken,
         })
         if(res.status==200){
            localStorage.setItem(ACCESS_TOKEN,res.data.access)
            setAuthorization(true)
         }
         else{
            setAuthorization(false)
         }
       }catch(error){
        console.log(error);
        setAuthorization(false);
       }

   }

   const auth=async()=>{
       const token=localStorage.getItem(ACCESS_TOKEN);
       if(!token){
        setAuthorization(false);
        return;
       }
       const decoded=jwtDecode(token);
       const tokenExpiration=decoded.exp;
       const now=Date.now()/1000;   

       if(tokenExpiration < now){
           await refreshToken();
       }
       else{
        setAuthorization(true);
       }
   };

   if(Authorization===null){
    return <div><h1 style={{textAlign:"center"}}><div class="loader">Loading...</div></h1></div>
   }

   return Authorization ? children : navigate('/login');
}

export default ProtectedRoute;