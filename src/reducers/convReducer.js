
export default (state = [], action) => {
    switch (action.type){
        case 'fetch_convs':
            return action.payload;
        case 'delete_conv':
            console.log(state);
            return state.filter((conv) => conv.conversation_id !== action.payload);
        default:
            return state;
    }
};