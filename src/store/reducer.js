import { ADD, GETDATA } from './actionTypes';
const defauLtState = {
    inputValue: 'dasdsad',
    list: []
}
export default (state = defauLtState, action) => {
    // console.log(action)
    switch (action.type) {
        case ADD:
            return setInput(state, action);
        case GETDATA:
            return getList(state, action);
        default:
            return state;
    }
}
function setInput(state, action) {
    let newState = { ...state };
    newState.inputValue = action.value;
    return newState;
}
function getList (state, action) {
    let newState = {...state};
    newState.list = action.data;
    return newState;
}