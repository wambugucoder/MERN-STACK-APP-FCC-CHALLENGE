import {LOGOUT_USER, CLOSE_POLL, CREATE_POLL, FETCH_POLL, GET_ERRORS, LOADING_USER, LOGIN_USER, REGISTER_USER, SHOW_POLLS, VOTE_FOR_POLL } from "./types";

import axios from "axios";
import jwt_decode from 'jwt-decode';
import setAuthToken from "../../utils/setAuthToken";

export const RegisterUser = (Userdata) => dispatch => {
    dispatch({
        type:LOADING_USER
        
      })
  axios.post("/api/users/register",Userdata).then(res =>
    
    dispatch({
      type:REGISTER_USER ,
      payload: res.data
    })
    
  ).catch((err) => {
    dispatch({
        type:GET_ERRORS ,
        payload: err.response.data
      }) 
  });
};
export const LoginUser = (Userdata) => dispatch => {
    dispatch({
        type:LOADING_USER
        
      })
  axios.post("/api/users/login",Userdata).then(res =>{
       // Save to localStorage
        // Set token to localStorage
        const {token}=res.data;
        localStorage.setItem("jwtToken",token);
         // Set token to Auth header
         setAuthToken(token)
          // Decode token to get user data
          const decoded=jwt_decode(token);
    dispatch({
      type:LOGIN_USER ,
      payload: decoded
    })
}).catch((err) => {
    dispatch({
        type:GET_ERRORS ,
        payload: err.response.data
      }) 
  });
};
//CALL POLLS
export const ShowPolls = () => dispatch => {
  dispatch({
    type:LOADING_USER
    
  })
  axios.get("/api/polls/show").then(res =>
    dispatch({
      type: SHOW_POLLS,
      payload: res.data
    })
  );
};
//CREATE POLLS
export const NewPolls = (PollData) => dispatch => {
  dispatch({
    type:LOADING_USER
    
  })
  axios.post("/api/polls/create",PollData).then(res =>
    dispatch({
      type:CREATE_POLL ,
      
    })
  );
};
//FETCH POLL
export const FetchPoll = (id) => dispatch => {
  dispatch({
    type:LOADING_USER
    
  })
  axios.get(`/api/polls/fetch/${id}`).then(res =>
    dispatch({
      type:FETCH_POLL ,
      payload: res.data
    })
  );
};
//VOTE ON POLL
export const VotePoll = (userId,pId,choice) => dispatch => {
  dispatch({
    type:LOADING_USER
    
  })
  axios.put(`/api/polls/vote/${userId}/${pId}/${choice}`).then(res =>
    dispatch({
      type: VOTE_FOR_POLL,
      payload: res.data
    })
  ).catch((err) => {
    dispatch({
        type:GET_ERRORS ,
        payload: err.response.data
      }) 
  });
};
//CLOSE POLL
export const ClosePoll = (pId) => dispatch => {
  dispatch({
    type: LOADING_USER
   
  })
  axios.put(`/api/polls/close/${pId}`).then(res =>
    dispatch({
      type:CLOSE_POLL ,
      payload: res.data
    })
  ).catch((err) => {
    dispatch({
        type:GET_ERRORS ,
        payload: err.response.data
      }) 
    });
    };
    //LOGOUT USER
    export const LogOutUser = () => dispatch => {
     // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
     dispatch({
      type:LOGOUT_USER ,
      
    })
      
    };