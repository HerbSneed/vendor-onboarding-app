import { UPDATE_BUSINESS_INFO } from "../actions/actions.js";

const initialBusinessState = {
  service_provided: "",
  minority_ownership: false,
  authorized_name: "",
  authorized_phone_number: "",
  authorized_signature: "",
};


const basicBusinessReducer = (state = initialBusinessState, action) => {
  switch (action.type) {
    case UPDATE_BUSINESS_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};




export default basicBusinessReducer;