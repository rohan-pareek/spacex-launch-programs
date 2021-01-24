import { programsReducer } from './programs';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    programs: programsReducer
}) 