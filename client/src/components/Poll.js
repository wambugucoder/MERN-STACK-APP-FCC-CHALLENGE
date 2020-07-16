import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FetchPoll,VotePoll, ClosePoll} from '../redux/action/Action';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CanvasJSReact from "../Assets/canvasjs.react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = { choices:"" };
      }
      componentWillReceiveProps(nextProps) {
          if(nextProps.poll.isVoted ){
            toast.success(" ✅ Your Vote has been Successfully Placed")
            setTimeout(() => {
              window.location.href="/dashboard"
            }, 6000);
             
          }
          }
      
  componentDidMount() {
      this.props.FetchPoll(this.props.match.params.id)
  }
  onChoiceChange(event){
      this.setState({
          choices:event.target.value
      })
  }
  onSubmit(e){
    const{poll}=this.props.poll
e.preventDefault();
if (!this.state.choices) {
toast.error("⚠️ Please Input A Choice")
}
if(poll.voters.includes(this.props.auth.user.id)){
  toast.error("You Already Voted")  
}
if (this.props.poll.poll.expired===true) {
  toast.error("Poll has been closed")
}
this.props.VotePoll(this.props.auth.user.id,this.props.match.params.id,this.state.choices)
}
onClose=() => {
this.props.ClosePoll(this.props.match.params.id);
toast.success("Poll has been closed");
}
renderCloseButton(){
if(this.props.poll.isRetrieved && (this.props.poll.poll.author===this.props.auth.user.id)  ){

  return(
    
    <div className ="container">
        <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                   
                  }}
                 
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  onClick={()=>this.onClose()}
                >Close Poll</button>
    </div>
  );
}else return(<div className="container">Only the Author can close this Poll</div>)
}
renderOptions(){
    if(this.props.poll.isRetrieved){
    const choices=this.props.poll.poll.choices.map((item,i)=>{
        return( <option key={i} value={item._id}>{item.name}</option>)
          })
          return choices;
}else return(<div></div>);
}
renderResults(){
if(this.props.poll.isRetrieved && this.props.poll.poll.voters.includes(this.props.auth.user.id)){
  const dataset=this.props.poll.poll.choices.map((choices)=>{
    return{
      label:choices.name,
      y:choices.vote
    }
  })
  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: " Live Poll Statistics"
    },
    axisY: {
      title: "Number of Votes",
      labelFormatter: this.addSymbols,
      
    },
    axisX: {
      title: "Choices",
      reversed: true,
     
    },
    data: [
    {
      type: "column",
      showInLegend: true,
      dataPoints: dataset
       
      
      
    }
    ]
    
  }
  return(
    <div className="row">
    
    <CanvasJSChart options = {options}
      /* onRef={ref => this.chart = ref} */
    />
    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
  </div>
  );
}

}
renderForm(){
  
    if (this.props.poll.isRetrieved && !this.props.poll.poll.voters.includes(this.props.auth.user.id)) {
        return(
            <div>
           
                        <form  onSubmit={this.onSubmit.bind(this)}>
                        <label><b>Choose your Option</b></label>
                        <select  className="browser-default"  onChange={this.onChoiceChange.bind(this)}>
                        <option value=""default>Please Choose an Option</option>
                            {this.renderOptions()}
                        </select>
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
                Vote
                </button>
                        </form>
                        </div>
        );
    }
}


  render() {
    const{poll}=this.props.poll;
    return (

      <div className="container">
        <ToastContainer />
            <div className="row"></div>
            <div className="row"></div>
            <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                   
                  }}
                 
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  onClick={()=>window.location.href="/dashboard"}
                >Back to Dashboard</button>
                 <div className="row"></div>
            <div className="row">
              {this.renderCloseButton()}
            </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                          <h4>
                            <b style={{fontColor:"#000000",fontFamily:"Roboto",fontSize:49}}>{poll.question}</b> 
                          </h4>
                        
                        </div>
                        <div className="container">
    {this.renderForm()}
    </div>
    <div className="container">
    {this.renderResults()}
    </div>
      </div>
    
    );
  }
}
Poll.propTypes = {
FetchPoll: PropTypes.func.isRequired,
ClosePoll: PropTypes.func.isRequired,
VotePoll:PropTypes.func.isRequired,
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
    {FetchPoll,VotePoll,ClosePoll})
    (Poll)
