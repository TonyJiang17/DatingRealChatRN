
export default (state = [], action) => {
    switch (action.type){
        case 'fetch_messages':
            return action.payload;
        case 'receive_messages':
            return [...state, action.payload]
        default:
            return state;
    }
};