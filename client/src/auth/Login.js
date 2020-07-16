import React, { Component } from "react";

import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import classnames from "classnames";
import { connect } from "react-redux";
import { LoginUser } from "../redux/action/Action";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated){
     // if condition is TRUE do something
     this.props.history.push("/dashboard");
    } else if(nextProps.errors) {
     // do something else
     this.setState({
       errors:nextProps.errors
     })
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const Userdata = {
      email: this.state.email,
      password: this.state.password
    };
this.props.LoginUser(Userdata);
  };
  
render() {
    const { errors } = this.state;
  
return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/signup">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
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
                <span className="red-text">
                  {errors.email}
                  
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  
                </span>
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
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  LoginUser: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth:state.auth,
  errors:state.errors
});
export default connect(mapStateToProps,
  {LoginUser} )
  (Login);
