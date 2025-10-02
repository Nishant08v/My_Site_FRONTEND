import React,{useState,useEffect} from "react";
import PlacesList from "../Components/PlacesList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";


const UserPlaces = props =>{
    const [loadedPlaces,setLoadedPlaces] = useState();
    const {isLoading,error,sendRequest,clearError} = useHttpClient();
    const userId = useParams().userId;
    console.log(userId);
   useEffect(()=>{
         const fetchPlaces = async () => {
          try {
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/users/${userId}`);
      setLoadedPlaces(responseData.places)
    } catch (error) {
      
    }
         }
        fetchPlaces();
   },[sendRequest,userId]);
    
     const placeDeleteHandler = deletePlaceId =>{
      setLoadedPlaces(prevPlace => prevPlace.filter(place => place.id !== deletePlaceId));
     }
      return (
      <React.Fragment>
      <ErrorModal error = {error} onClear = {clearError}/>
      {isLoading && <div className="center"><LoadingSpinner /></div>}
      {!isLoading && loadedPlaces && <PlacesList items = {loadedPlaces} onDeletePlace = {placeDeleteHandler} />  }  
      </React.Fragment>
      )
};

export default UserPlaces;