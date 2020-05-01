import {combineReducers} from 'redux'

import authReducer from './authReducer';
import convReducer from './convReducer';
import websocketRuducer from './websocketReducer';
import messageReducer from './messageReducer';


export default combineReducers({
    auth: authReducer,
    conv: convReducer,
    websocket: websocketRuducer,
    message: messageReducer
});
  