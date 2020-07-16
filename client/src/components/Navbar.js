import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LogOutUser } from '../redux/action/Action';


class Navbar extends Component {
  
EndSession=() => {
this.props.LogOutUser()
window.location.href="/login";
}
  render() {
    if(!this.props.auth.isAuthenticated){
    return (
      <nav class="blue">
    <div class="nav-wrapper">
      <a href="/" class="brand-logo">Polling App</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/login">Login</a></li>
        
      </ul>
    </div>
  </nav>
     
    );}
else if(this.props.auth.isAuthenticated){
  return(
    <nav class="blue">
    <div class="nav-wrapper">
      <a href="/" class="brand-logo">Polling App</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li> <button
                 
                 
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  onClick={()=>this.EndSession()}
                >LogOut</button></li>
        
      </ul>
    </div>
  </nav> 

  );
}
  }
}
Navbar.propTypes = {
 LogOutUser: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired,
 
 
};

const mapStateToProps = state => ({
  auth:state.auth,
  errors:state.errors,
 
});
export default connect(mapStateToProps,
  {LogOutUser})
  (Navbar)
