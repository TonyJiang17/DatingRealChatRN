const INTIAL_STATE = {
  email: '',
  token: null,
  errorMessage: '',
  user_id_str: null
};

export default (state = INTIAL_STATE, action) => {
    switch (action.type){
        case 'signup':
            return {email:action.payload.email, token: action.payload.token, errorMessage: '', user_id_str: action.payload.user_id_str};
        case 'signin':
            return {email:action.payload.email, token: action.payload.token, errorMessage: '', user_id_str: action.payload.user_id_str};
        case 'signout':
            return INTIAL_STATE;
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'add_error':
            return state;            
        default:
            return state;
    }
};