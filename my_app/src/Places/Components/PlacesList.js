import React from "react";
import "./PlacesList.css";
import Card from "../../Shared/Components/UIElements/Card";
import PlaceItem from './PlaceItem';
import Button from "../../Shared/Components/FormElements/Button";

const PlacesList = props => {
 if(props.items.length===0){
    return <div className="place-list center">
        <Card>
            <h2>No Places Found! Maybe Create One?</h2>
            <Button to = '/places/new'>share place </Button>
        </Card>
    </div>
 };
 return (
    <ul className="place-list">
        {props.items.map(place => 
        <PlaceItem 
                   key={place.id} 
                   id = {place.id} 
                   image = {place.image} 
                   title = {place.title} 
                   description = {place.description}
                   address = {place.address}
                   creatorId = {place.creator}
                   coordinates = {place.location}
                   onDelete = {props.onDeletePlace}
                   />)}
    </ul>
 )
};
export default PlacesList;