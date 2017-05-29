import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import applicationReducer from './application/reducer';

export default combineReducers({
  routing: routerReducer,
  application: applicationReducer,
});
