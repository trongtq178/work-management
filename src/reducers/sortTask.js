import * as types from '../constants/ActionType';

var initialState = {
    sortBy: 'name',
    sortValue: 1  // 1: tang, -1: giam
};
var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SORT_TASK:
            console.log(action);
            return {
                sortBy: action.sort.sortBy,
                sortValue: action.sort.sortValue
            };
        default: return state;
    }
}

export default myReducer;
