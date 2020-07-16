import React, { Component } from 'react';

import Avatar from 'react-avatar';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import ScaleLoader from "react-spinners/ScaleLoader";
import { ShowPolls } from '../redux/action/Action';
import Table from 'react-responsive-data-table';
import { connect } from 'react-redux';
import { css } from "@emotion/core";

class Dashboard extends Component {
 
  componentDidMount() {
    this.props.ShowPolls();
  }
viewPoll(id){
  this.props.history.push(`/view/${id}`)
}
renderButton(){
  if (this.props.auth.user.role==="admin") {
    return(
      <div className="container">
      <Link to="/create" >
      <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                 
                }}
               
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
               Create
              </button>
          </Link>
      </div >
    );
  } else {
    return(
      <div>Only Admins have the priviledge of creating Polls</div>
    );
  }
}
  renderTable() {
   
    const TableData=this.props.poll.poll.map((poll,index) =>{
 
      return{
      id:poll._id,
      question:poll.question,
      votes:poll.voters.length,
      created_by:poll.author.username,
      avatar:<Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={poll.author.username}size="40"round={true} /> ,
   
      
      created_at:poll.created
      }
      
      }); 
   
   console.log(TableData)
if(this.props.poll.isShown){
    return (

      <Table style={{
        opacity: 0.8,
        backgroundColor: "#00113a",
        color: "#ffffff",
        textAlign: "center"
      }}
      tableStyle="table table-hover table-striped table-bordered table-borderless table-responsive"
      pages={true}
      pagination={true}
      onRowClick= {row =>this.viewPoll(row[0])}
      page={true}
      errormsg="Error. . ."
      loadingmsg="Loading. . ."
      isLoading={false} 
      sort={true} 
      title="Polls"
      search={true}
      size={10}
      data={{
        head: {
          id: "ID",
         question: "Question",
         votes:"Votes",
          created_by:"Created By",
          avatar:"Avatar",
          created_at: "Created At",
          
        },
        data: TableData
          
        
        
        
         
      }} />   
     
    )}
    else return(<div className="container"><div className="row"></div><div className="sweet-loading">
    <ScaleLoader
    height={55}
    width={7}
    radius={2}
    margin={2}
      
      color={"#123abc"}
      
    />
  </div></div>)
  }
  render(){
    return(
      <div className="wrapper">
      <div className="row"></div>
        <div className="container">
      {this.renderButton()}
        </div >
        <div className="container">
          {this.renderTable()}
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  ShowPolls: PropTypes.func.isRequired,
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
  { ShowPolls})
  (Dashboard)

