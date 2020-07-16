import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import classnames from "classnames";
import PropTypes from "prop-types";
import { RegisterUser } from '../redux/action/Action';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
       username:"",
        email:"",
        password:"",
        password2:"",
        errors:{}
     };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isRegistered){
     // if condition is TRUE do something
     this.props.history.push("/login");
    } else if(nextProps.errors) {
     // do something else
     this.setState({
       errors:nextProps.errors
     })
    }
  }
  
onChange=e=> {
this.setState({[e.target.id]:e.target.value})
}
onSubmit=e=> {
    e.preventDefault();
    const Userdata={
           username:this.state.username,
           email:this.state.email,
           password:this.state.password,
           password2:this.state.password2
    };
    this.props.RegisterUser(Userdata);
    
}
  render() {
      const { errors } = this.state;
    
      return (
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
              </Link>
             
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Register</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    error={errors.username}
                    id="username"
                    type="text"
                    className={classnames("", {
                      invalid: errors.username
                    })}
                  />
                  <label htmlFor="username">UserName</label>
                  <span className="red-text">{errors.username}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email
                    })}
                  />
                  <label htmlFor="email">Email</label>
                  <span className="red-text">{errors.email}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">{errors.password}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2
                    })}
                  />
                  <label htmlFor="password2">Confirm Password</label>
                  <span className="red-text">{errors.password2}</span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
  }
}
Register.propTypes = {
 RegisterUser: PropTypes.func.isRequired,
 auth: PropTypes.object.isRequired,
 errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { RegisterUser}
  )
   (withRouter(Register));


