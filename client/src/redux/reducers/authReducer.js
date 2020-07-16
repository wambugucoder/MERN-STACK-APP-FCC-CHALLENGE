import {LOADING_USER, LOGIN_USER, REGISTER_USER, LOGOUT_USER} from '../action/types';

const INITIAL_STATE = {
    isLoading:false,
    isRegistered:false,
    isAuthenticated:false,
    user:{},
};
 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING_USER:
            return {...state,
            isLoading:true
            };
           
                case REGISTER_USER:
                    return {...state,
                   isRegistered:true,
                   isLoading:false,
                    };
                    case LOGIN_USER:
                        return {...state,
                       isAuthenticated:true,
                       isLoading:false,
                       user:action.payload
                        };
                        case LOGOUT_USER:
                    return {...state,
                   isAuthenticated:false,
                   user:{}
                    };
            
        default:
            return state
    }
}