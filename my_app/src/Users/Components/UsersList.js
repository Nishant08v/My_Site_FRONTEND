import React from "react";
import './UsersList.css';
import UsersItem from './UsersItems'

const UsersList = props => {
    if(props.items.length === 0){
        return(
          <div className="center">
            <h1>No Users Found!!</h1>
          </div>
        );
    }
    return (
        <ul className="users-list">
            {props.items.map(user => (
                <UsersItem id = {user.id} image = {user.image} key = {user.id} name = {user.name} placeCount = {user.places.length}/>
            ))}
        </ul>
    );
};

export default UsersList;