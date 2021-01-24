import { FETCH_PROGRAMS, TOGGLE_LOADER } from '../actionTypes';

export const programsReducer = (state = { programList: [], loader: false }, action) => {
    switch(action.type) {
        case FETCH_PROGRAMS:
            state = { ...state, programList: action.programs };
            return state;
        
        case TOGGLE_LOADER:
            state = { ...state, loader: action.loader };
            return state;
        
        default:
            return state;
    }
}