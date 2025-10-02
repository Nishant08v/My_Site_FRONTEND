import React, {Suspense} from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import NewPlace from './Places/Pages/NewPlace';
// import Users from "./Users/Pages/Users";
// import UserPlaces from "./Places/Pages/UserPlaces";
// import UpdatePlace from "./Places/Pages/UpdatePlace";
// import Auth from "./Users/Pages/Auth";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation"



import { AuthContext } from "./Shared/context/auth-context";
import { useAuth } from "./Shared/hooks/auth-hook";
import LoadingSpinner from "./Shared/Components/UIElements/LoadingSpinner";

const NewPlace = React.lazy(()=> import('./Places/Pages/NewPlace'));
const Users = React.lazy(()=> import("./Users/Pages/Users"));
const UserPlaces = React.lazy(()=> import("./Places/Pages/UserPlaces"));
const UpdatePlace = React.lazy(()=> import("./Places/Pages/UpdatePlace"));
const Auth = React.lazy(()=> import("./Users/Pages/Auth"));


const App = () => {
  const {token , login , logout , userId} = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/places/new' exact>
              <NewPlace />
        </Route>
        <Route path='/places/:placeId' exact>
              <UpdatePlace />
            </Route>
        <Redirect to='/' />
      </Switch>
    );
  }else{
    routes = (
        <Switch>
          <Route path='/' exact>
              <Users />
            </Route>
        <Route path='/:userId/places'>
          <UserPlaces />
        </Route>
          <Route path='/auth'>
              <Auth />
            </Route>
          <Redirect to='/auth' />
        </Switch>
    );
  }

  return <>
    <AuthContext.Provider value={{ 
      isLoggedIn: !!token,
      token : token,
      userId : userId ,
      login: login,
      logout: logout }}>
      <Router>
        <MainNavigation />
        <main><Suspense fallback = {<div className="center"><LoadingSpinner/></div>}>
          {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  </>
};
export default App;
