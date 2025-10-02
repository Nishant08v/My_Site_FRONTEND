import {useState,useCallback,useRef,useEffect} from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const activeHttpRequests = useRef([]);

    const sendRequest =  useCallback( async(url,method = 'GET',body = null,headers = {}) =>{
        setIsLoading(true);
    const httpAbrtCntrl = new AbortController();
    activeHttpRequests.current.push(httpAbrtCntrl);
        try{
            const response = await fetch(url,{
                method,
                body,
                headers,
                signal : httpAbrtCntrl.signal
            });
        const responseData = await response.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbrtCntrl);
        if(!response.ok){
            throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
        }catch(err){
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
     
    },[]);
    const clearError = ()=>{
        setError(null);
    }
    useEffect(()=>{
        return ()=>{
            activeHttpRequests.current.forEach(abortCntrl => abortCntrl.abort());
        }
    },[])
    return {isLoading, error, sendRequest , clearError};

}