import React,{Component} from 'react';
import Anime from './Anime';
import Bot from './Bot';



class Landing extends Component {
 

  render() {
    return (
     
     <div className="wrapper">
      
        
      
       
       <div className="jumbotron">
     <Anime/>
      </div>

      
       <div className="container">
       
        <div className="container">
         
<a class="btn btn-large waves-effect waves-light hoverable blue accent-3"
href="/login">GET STARTED<i class="material-icons right">forward</i></a>
        </div>
        <div className="row"></div>
        <div className="container" >
        <Bot/>
      
                 </div>
       </div>
     </div>
    
    );
  }
}

export default Landing;

