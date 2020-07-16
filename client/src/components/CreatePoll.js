import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NewPolls } from '../redux/action/Action';
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        question:"",
        choices:[{
            name:""
        },
        {
            name:""
        }
        ]
      };
  }
  componentWillReceiveProps(nextProps) {
      if(nextProps.poll.isCreated){
        
        
             toast.success("Poll Created Successfully")
          
      }
  }
  onChange=e=> {
    this.setState({[e.target.id]:e.target.value})
    }
  onChoicesChange(i,e){
    const name=e.currentTarget.value;
    var choices=this.state.choices;
    choices[i].name=name;
    this.setState({choices})
      }
  AddOption=(e) => {
   e.preventDefault();
   var choices=this.state.choices;
   choices.push({name:""}) ;
   this.setState({choices})  
  }
  RemoveOption=(e) => {
    e.preventDefault();
    var choices=this.state.choices;
    choices.pop() ;
    this.setState({choices})  
   }
  onSubmit=e=> {
    e.preventDefault();
    if(!this.state.question || !this.state.choices){
      
        
         toast.error("Complete Required fields")
      
    }
    if(this.state.choices.length<2 ){
       
          
           toast.error("Please input atleast 2 choices")
        
      }
      const { user } = this.props.auth;
    const PollData={
          question:this.state.question,
          choices:this.state.choices,
           author:user.id,
          
    };
    this.props.NewPolls(PollData);
    
}
renderOptions(){
    const choices=this.state.choices.map((item,i)=>{
  return( <input key={i}
    onChange={this.onChoicesChange.bind(this,i)}
    value={this.state.choices[i].name}
   placeholder="Option..."
   
    type="text"
    className="form-control"
  />)
    })
    return choices;
}
  render() {
    return (
        <div className="container">
         <ToastContainer />
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Dashboard
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Create Poll</b>
              </h4>
              
            </div>
            <form  onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.question}
                  type="text"
                  id="question"
                  
                  className="form-control"
                  placeholder="Input your question here.."
                />
                <label htmlFor="question">Question</label>
               
              </div>
              <div className="input-field col s12">
              {this.renderOptions()}
                <label htmlFor="choices">Choices</label>
                
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              
               
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.AddOption.bind(this)}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                 Add Option
                </button>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.RemoveOption.bind(this)}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Remove Option
                </button>
                <div>&nbsp;</div>
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
                 Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreatePoll.propTypes = {
    NewPolls: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    poll:PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth:state.auth,
    errors:state.errors,
    poll:state.poll
});

export default connect(mapStateToProps,
     {NewPolls})
     (CreatePoll)
