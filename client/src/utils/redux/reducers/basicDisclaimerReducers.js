import { UPDATE_DISCLAIMER_INFO } from "../actions/actions.js";

const initialDisclaimerState = {
 disclaimer_agreement: false,
};

const basicDisclaimerReducer = (state = initialDisclaimerState, action) => {
 switch (action.type) {
  case UPDATE_DISCLAIMER_INFO:
   return {
    ...state,
    ...action.payload,
   };
  default:
   return state;
 }
};

export default basicDisclaimerReducer;