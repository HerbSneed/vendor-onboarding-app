import { UPDATE_BANK_INFO } from "../actions/actions.js";

const initialBankState = {
  bank_name: "",
  account_number: "",
  routing_number: ""
};

const basicBankReducer = (state = initialBankState, action) => {
  switch (action.type) {
    case UPDATE_BANK_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};


export default basicBankReducer;