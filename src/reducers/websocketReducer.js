const INTIAL_STATE = {
    actionCable: null,
    cable: null
  };

export default (state = INTIAL_STATE, action) => {
    switch (action.type){
        case 'setup_websocket':
            return {actionCable: action.payload.actionCable, cable: action.payload.cable};
        default:
            return state;
    }
};