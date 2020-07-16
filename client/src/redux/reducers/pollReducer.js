import { SHOW_POLLS , CREATE_POLL, FETCH_POLL, VOTE_FOR_POLL, CLOSE_POLL} from "../action/types";

const INITIAL_STATE = {
    poll:[],
    
    isCreated:false,
    isShown:false,
    isRetrieved:false,
    isVoted:false,
    isClosed:false

};
 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_POLLS:
            return {...state,
                isShown:true,
                poll:action.payload
            
            }
            case CREATE_POLL:
                return {...state,
                    isCreated:true,
                    
                
                }
                case FETCH_POLL:
                    return {...state,
                        isRetrieved:true,
                        poll:action.payload
                        
                    
                    }
                    case VOTE_FOR_POLL:
                        return {...state,
                            isVoted:true,
                            
                            
                        
                        }
                        case CLOSE_POLL:
                            return {...state,
                                isClosed:true,
                                
                                
                            
                            }

        default:
            return state
    }
}