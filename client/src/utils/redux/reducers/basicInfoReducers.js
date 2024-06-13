import { UPDATE_BASIC_INFO } from "../actions/actions.js";


const initialBasicState = {
  vendor_name: "",
  contact_firstName: "",
  contact_lastName: "",
  contact_MiddleInt: "",
  contact_phone_number: "",
  tax_id: "",
  remittance_address: "",
  city: "",
  state: "",
  zip_code: "",
  country: "",
  remittance_email: ""
};

const basicInfoReducer = (state = initialBasicState, action) => {
  switch (action.type) {
    case UPDATE_BASIC_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};


export default basicInfoReducer;