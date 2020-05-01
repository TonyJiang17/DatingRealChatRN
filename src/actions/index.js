import backendApi from '../apis/backendApi';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from '../navigationRef';
import {
    ActionCable,
    Cable,
  } from '@kesha-antonov/react-native-action-cable'


//////// Action Creators for Authentication
export const setupWebsocket = () => {
    return async (dispatch) => {
        const actionCable = ActionCable.createConsumer('ws://localhost:3000/cable')
        const cable = new Cable({})
        dispatch({type: 'setup_websocket', payload: {actionCable, cable}});
    };
};

//////// Action Creators for Authentication

export const signup = (formdata) => {
    return async (dispatch) => {
        try {
            //aefaefaaefaefaefaef
            const response = await backendApi.post('/signup', formdata);
            if (response.data.action_status === 'fail'){
                dispatch({type: 'add_error', payload: 'Something went wrong with sign up'});
            }
            else{
                //const email = formdata.getParts().find(item => item.fieldName === 'email')['string'];
                const email = response.data.email;
                const user_id_str = response.data.user_id.toString();
                const token = response.data.token;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('user_id_str', user_id_str);
                dispatch({type: 'signin', payload: {email,token, user_id_str}});
                navigate('mainFlow');
            }
        } catch (err){
            dispatch({type: 'add_error', payload: 'Something went wrong with sign up'});
        } 
    }
}

export const signin = (formdata) => {
    return async (dispatch) => {
        try {
            // const email = formdata.getParts().find(item => item.fieldName === 'email')['string'];
            const response = await backendApi.post('/signin', formdata);
            if (response.data.action_status === 'fail'){
                dispatch({type: 'add_error', payload: 'Something went wrong with sign in'});
            }
            else{
                const email = response.data.email;
                const token = response.data.token;
                const user_id_str = response.data.user_id.toString();
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('user_id_str', user_id_str);
                dispatch({type: 'signin', payload: {email, token, user_id_str}});
                navigate('mainFlow');
            }
        } catch(err){
            dispatch({type: 'add_error', payload: 'Something went wrong with sign in'});
        }
    }
}

export const signout = () => {
    return async (dispatch) => {
        try {
            const user_id_str = await AsyncStorage.getItem('user_id_str');
            let formdata = new FormData();
            formdata.append("user_id", parseInt(user_id_str));
            await backendApi.post('/signout', formdata);
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user_id_str');
            dispatch({type: 'signout'});
            navigate('loginFlow');
        } catch(err){
            // console.log(err);
        }
    }
}

export const tryLocalSignin = () => {
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        const email = await AsyncStorage.getItem('email');
        if (token && email){
            dispatch({type: 'signin', payload: {email, token}});
            navigate('mainFlow');
        }else{
            navigate('loginFlow');
        }
    }
}

export const clearErrorMessage = () => {
    return {
        type: 'clear_error_message'    
    };
};

//////// Action Creators for Conversations
export const fetchConvs = () => {
    return async (dispatch) => {
        // console.log('fetchCat');
        const user_id_str = await AsyncStorage.getItem('user_id_str');
        const response = await backendApi.get(`/users/${user_id_str}/conversations`);
        dispatch({type: 'fetch_convs', payload: response.data});
    };
};

export const addConv = (formdata) => {
    return async (dispatch) => {
        const user_id_str = await AsyncStorage.getItem('user_id_str');
        await backendApi.post(`/users/${user_id_str}/conversations`, formdata);
        const response = await backendApi.get(`/users/${user_id_str}/conversations`);
        dispatch({type: 'fetch_convs', payload: response.data});        
    };
};

export const deleteConv = (id) => {
    return async (dispatch) => {
        const user_id_str = await AsyncStorage.getItem('user_id_str');
        await backendApi.delete(`/users/${user_id_str}/conversations/${id}`);
        dispatch({type: 'delete_conv', payload: id});
    };
};


//////// Action Creators for Messages
export const sendMessage = (formdata, conv_id) => {
    return async (dispatch) => {
        const user_id_str = await AsyncStorage.getItem('user_id_str');
        // await backendApi.post(`/users/${user_id_str}/conversations`, formdata);
        await backendApi.post(`/users/${user_id_str}/conversations/${conv_id}/messages`, formdata);
        // const response = await backendApi.get(`/users/${user_id_str}/conversations`);
        // dispatch({type: 'fetch_convs', payload: response.data});        
        // const response = await backendApi.get(`/users/${user_id_str}/conversations/${conv_id}/messages`);
        // dispatch({type: 'fetch_messages', payload: response.data});   
    };
};

export const fetchMessages = (conv_id) => {
    return async (dispatch) => {
        const user_id_str = await AsyncStorage.getItem('user_id_str');
        const response = await backendApi.get(`/users/${user_id_str}/conversations/${conv_id}/messages`);
        // console.log(response.data.messages);
        dispatch({type: 'fetch_messages', payload: response.data.messages});        
    };
};

export const receiveMessage = (new_message) => {
    console.log('receive message');
    // console.log(new_message);
    return {
        type: 'receive_messages',
        payload: new_message
    };
};