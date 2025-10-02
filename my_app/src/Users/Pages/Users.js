import React,{useEffect,useState} from "react";
import './Users.css';
import UsersList from "../Components/UsersList";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../Shared/hooks/http-hook";


 const Users = () =>{
   const [loadedUsers,setLoadedUsers] = useState();
   const {isLoading,error,sendRequest,clearError} = useHttpClient();
 

   useEffect(()=>{
      const fetchUsers = async ()=>{
      
      try{
      const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL +'/users'); 

      setLoadedUsers(responseData.users);
        }catch(err){
           
        }
      
      }
       fetchUsers();

     },[sendRequest]);
  
    return (
      <React.Fragment>
      <ErrorModal error = {error} onClear = {clearError}/>
      {isLoading && <div className="center">
        <LoadingSpinner />
        </div>}
      {!isLoading && loadedUsers && < UsersList items ={loadedUsers}/>}
      </React.Fragment>
    );
 };
 export default Users;