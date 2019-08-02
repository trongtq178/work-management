import * as types from "../constants/ActionType";

var initialState = '';

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SEARCH_TASK:
            return action.keyword.toLowerCase();
        default: return state;
    }
}

export default myReducer;
