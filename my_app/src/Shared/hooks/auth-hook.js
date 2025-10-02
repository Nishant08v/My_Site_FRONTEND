import { useState,useEffect,useCallback } from "react";

let logoutTimer;


export const useAuth = () => {
    const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [myTokenExpirationDate , setMyTokenExpirationData] = useState();


  const login = useCallback((uid,token,expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setMyTokenExpirationData(tokenExpirationDate);
    localStorage.setItem('userData',JSON.stringify({
      userId : uid,
      token : token,
      expiration : tokenExpirationDate.toISOString()
    }))
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setMyTokenExpirationData(null);
    localStorage.removeItem('userData');
  }, []);

useEffect(()=>{
          if(token && myTokenExpirationDate){
            const remTime = myTokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout,remTime);
          }else{
            clearTimeout(logoutTimer);
          }
          
},[token,logout,myTokenExpirationDate]);

useEffect(()=>{
   const storedData = JSON.parse(localStorage.getItem('userData'));
   if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
    login(storedData.userId, storedData.token,new Date(storedData.expiration) );
   }
},[login])

return {token , login , logout , userId};
}