import React from 'react';
import './App.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Route,  BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import CreatePoll from './components/CreatePoll';
import Poll from './components/Poll';

import jwt_decode from "jwt-decode";
// Check for token to keep user logged in
import setAuthToken from './utils/setAuthToken';
import {LOGIN_USER, LOGOUT_USER} from './redux/action/types';
if(localStorage.jwtToken){
  const token=localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded=jwt_decode(token);
  store. dispatch({
    type:LOGIN_USER ,
    payload: decoded
  });
  // Check for expired token
  const currentTime= Date.now()/1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store. dispatch({
      type:LOGOUT_USER ,
      
    });
    // Redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
    <Navbar/>
     <Route exact path='/' component={Landing}/>
     <Route path='/signup' component={Register}/>
     <Route path='/login' component={Login}/>
     <Route path='/dashboard' component={Dashboard}/>
     <Route path='/create' component={CreatePoll}/>
     <Route path='/view/:id' component={Poll}/>
    
     
     
     
     
     
     </div>
    </Router>
       
    </Provider>
    
  );
}

export default App;
