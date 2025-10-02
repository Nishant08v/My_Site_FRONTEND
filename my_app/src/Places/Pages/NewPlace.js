import React,{useContext} from "react";
import "./PlaceForm.css";
import Input from "../../Shared/Components/UIElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../Shared/util/validators";
import Button from "../../Shared/Components/FormElements/Button";
import {useForm} from  "../../Shared/hooks/form-hook";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { AuthContext } from "../../Shared/context/auth-context";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";


const NewPlace = () =>{
  const [formState,inputHandler] =   useForm({
            title : {
                value : '',
                isValid : false
            },
            description : {
                value : '',
                isValid : false
            },
            address : {
                value : "",
                isValid : false
            },
            image:{
                value : null,
                isValid : false
            }
        }
,false);
const {isLoading,error,sendRequest,clearError} = useHttpClient();
const auth = useContext(AuthContext);

const history = useHistory();

const placeSubmitHandler = async (event)=>{
    event.preventDefault();
    try{
        const formData = new FormData();
        formData.append("title",formState.inputs.title.value);
        formData.append("address",formState.inputs.address.value);
        formData.append("description",formState.inputs.description.value);
        formData.append("creator",auth.userId);
        formData.append("image",formState.inputs.image.value);

        
        await sendRequest(process.env.REACT_APP_BACKEND_URL + '/places','POST',formData,{
            Authorization : 'Bearer ' + auth.token
        });
    history.push('/');
}catch(err){

}
}

    return (
    <React.Fragment>
    <ErrorModal error = {error} onClear = {clearError} />
     {isLoading && <LoadingSpinner asOverlay/>}
    <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input element = 'input' label = 'Title' type = 'text' id = 'title'
         placeholder = 'Enter New Place' validators = {[VALIDATOR_REQUIRE()]} errorText = "Please Enter Valid Input " onInput = {inputHandler}/>
         <Input element = 'textarea' label = 'Description' id = 'description'
         placeholder = 'Enter Description' validators = {[VALIDATOR_MINLENGTH(5)]}
          errorText = "Please Enter Valid Description (at least 5 characters) " onInput = {inputHandler}/> 
          <Input element = 'input' label = 'Address' id = 'address'
         placeholder = 'Enter Address' validators = {[VALIDATOR_REQUIRE()]}
          errorText = "Please Enter Valid Description (at least 5 characters) " onInput = {inputHandler}/> 
          <ImageUpload id="image" onInput={inputHandler} errorText = "Please Provide An Image"/>
        <Button type = 'submit' disabled = {!formState.isValid}>Add Place</Button>
    </form>
    </React.Fragment>
    );
};
export default NewPlace;