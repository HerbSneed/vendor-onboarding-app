import { combineReducers } from 'redux';
import basicInfoReducer from './reducers/basicInfoReducers.js';
import basicBankReducer from './reducers/bankInfoReducers.js';
import basicBusinessReducer from './reducers/businessInfoReducers.js';
import basicDisclaimerReducer from './reducers/basicDisclaimerReducers.js';

const rootReducer = combineReducers ({
  basicInfo: basicInfoReducer,
  businessInfo: basicBusinessReducer,
  bankInfo: basicBankReducer,
  basicDisclaimerInfo: basicDisclaimerReducer
});

export default rootReducer;