const initialState = {
    players: [],
    selected: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "DEFAULTPLAYER":
            return {...state, players: action.payload};
        case "SELECTEDPLAYER":
            return {...state, selected: action.payload}
        default:
            return state;
    }
}