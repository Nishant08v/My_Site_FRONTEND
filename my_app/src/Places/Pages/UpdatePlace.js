import React,{useEffect,useState,useContext} from "react";
import "./PlaceForm.css";
import {useParams, useHistory} from 'react-router-dom';
import Input from '../../Shared/Components/UIElements/Input';
import Button from '../../Shared/Components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../Shared/util/validators";
import { useForm } from "../../Shared/hooks/form-hook";
import Card from "../../Shared/Components/UIElements/Card";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import {AuthContext} from '../../Shared/context/auth-context'


const UpdatePlace = props =>{
          const placeId = useParams().placeId;
          const {isLoading,error, sendRequest, clearError} = useHttpClient();
          const [loadedPlace,setLoadedPlace] = useState();
          const [formState,inputHandler,setFormData] = useForm({
            title : {
                value : "",
                isValid : false
            },
            description : {
                value : "",
                isValid : false
            }
          },true);
          useEffect(()=>{
              const fetchPlaces = async () =>{
                      try{
                        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
                        setLoadedPlace(responseData.place);
                    console.log(responseData.place.title)
   
                        setFormData(
            {
            title : {
                value : responseData.place.title,
                isValid : true
            },
            description : {
                value : responseData.place.description,
                isValid : true
            }},
            true);
                      }catch(err){}

              }
              fetchPlaces();
          },[sendRequest,placeId,setFormData]);
          
         
         const auth = useContext(AuthContext);
         const history = useHistory()
         const placeUpdateSubmitHandler = async event => {
            event.preventDefault();
            try {
              await sendRequest(process.env.REACT_APP_BACKEND_URL + `/places/${placeId}`,'PATCH',JSON.stringify({
                title : formState.inputs.title.value,
                description : formState.inputs.description.value
            }),{
              "Content-Type" : "application/json",
              Authorization : "Bearer " + auth.token
            });
               history.push('/'+auth.userId+'/');
            } catch (error) {
              
            }
         }
         if(isLoading && !error){
            return <div className="center">
                <LoadingSpinner />
            </div>
          }
          if(!loadedPlace && !error){
            return <div className="center">
                <Card>
                  <h2>Could Not Find Place!!</h2>
                </Card>
            </div>
          }
           
          
          return (
          <React.Fragment>
          <ErrorModal error = {error} onClear = {clearError} />
          <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input id = "title" element = "input" type = "text" label = "Title" validators = {[VALIDATOR_REQUIRE()]}
            errorText = "Please Enter A valid Title. " onInput = {inputHandler} 
            initialValue = {loadedPlace.title} initialValid = {true} />

            <Input id = "description" element = "textbox" type = "text" label = "Description" validators = {[VALIDATOR_MINLENGTH(5)]}
            errorText = "Please Enter A valid Description. " onInput = {inputHandler} 
           initialValue = {loadedPlace.description} initialValid = {true} />

            <Button type = "submit" disabled = {!formState.isValid}>UPDATE PLACE</Button>
          </form>
          </React.Fragment>
          )
}

export default UpdatePlace;