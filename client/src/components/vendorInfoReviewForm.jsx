import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import axios from "axios";
import {
  updateBasicInfo,
  updateBusinessInfo,
  updateBankInfo,
  updateDisclaimerInfo,
} from "../../src/utils/redux/actions/actions";
import SignatureCanvas from "react-signature-canvas";
import provinces from "provinces";
import containsChinese from "contains-chinese";

const VendorInfoReviewForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basicInfo = useSelector((state) => state.basicInfo);
  const businessInfo = useSelector((state) => state.businessInfo);
  const bankInfo = useSelector((state) => state.bankInfo);
  const disclaimerInfo = useSelector((state) => state.disclaimerInfo);
  const uniqueCountries = Array.from(
    new Set(provinces.map((province) => province.country))
  );

  const [formState, setFormState] = useState({
    ...basicInfo,
    ...businessInfo,
    ...bankInfo,
    ...disclaimerInfo,
  });

  const [signature, setSignature] = useState(formState.authorized_signature);

  const [editMode, setEditMode] = useState({
    basicInfo: false,
    businessInfo: false,
    bankInfo: false,
  });

  const [error, setError] = useState(null);
  const sigCanvas = useRef(null);

    useEffect(() => {
      setSignature(formState.authorized_signature);
    }, [formState.authorized_signature]);



  const handleEdit = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAcceptSignature = () => {
    if (sigCanvas.current) {
      const newSignature = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setSignature(newSignature);
      setFormState((prev) => ({
        ...prev,
        authorized_signature: newSignature,
      }));
      toggleEditMode("businessInfo"); // Lock the signature field after accepting
    }
  };

  const handleClearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setSignature(null);
      setFormState((prev) => ({
        ...prev,
        authorized_signature: null,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editMode.businessInfo && sigCanvas.current) {
      setFormState((prev) => ({
        ...prev,
        authorized_signature: sigCanvas.current
          .getTrimmedCanvas()
          .toDataURL("image/png"),
      }));
    }
    try {
      // Dispatch updates to Redux store
      dispatch(
        updateBasicInfo({
          vendor_name: formState.vendor_name,
          contact_firstName: formState.contact_firstName,
          contact_lastName: formState.contact_lastName,
          contact_MiddleInt: formState.contact_MiddleInt,
          tax_id: formState.tax_id,
          contact_phone_number: formState.contact_phone_number,
          remittance_address: formState.remittance_address,
          city: formState.city,
          state: formState.state,
          zip_code: formState.zip_code,
          country: formState.country,
          remittance_email: formState.remittance_email,
        })
      );

      dispatch(
        updateDisclaimerInfo({
          disclaimer_agreement: formState.disclaimer_agreement,
        })
      );

      dispatch(
        updateBusinessInfo({
          service_provided: formState.service_provided,
          minority_ownership: formState.minority_ownership,
          authorized_name: formState.authorized_name,
          authorized_phone_number: formState.authorized_phone_number,
          authorized_signature: formState.authorized_signature,
        })
      );
      dispatch(
        updateBankInfo({
          bank_name: formState.bank_name,
          account_number: formState.account_number,
          routing_number: formState.routing_number,
        })
      );

      // Send data to backend
      await axios.post("/api/vendor", formState);
      navigate("/vendor/submitted");
    } catch (err) {
      setError("There was an error submitting the form. Please try again.");
      console.error("Form submission error:", err);
    }
  };

  const toggleEditMode = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-screen  text-center pt-24 pb-3 mb:text-left">
      <p className="w-[300px] font-bold text-center mx-auto text-xl  drop-shadow-lg text-white">
        Review the information you provided before submitting. Click the edit
        button to make corrections.
      </p>

      <form
        method="POST"
        className="flex flex-col gap-y-4 my-3 mx-[10px] mb:mx-auto mb:max-w-[350px] lg:max-w-[740px] lg:flex lg:flex-row lg:flex-wrap lg:gap-x-5 lg:justify-center lg:p-6 lg:bg-gray-300 lg:bg-opacity-50 lg:rounded-lg"
        onSubmit={handleSubmit}
      >
        {/* BASIC INFO */}

        <section className="bg-cubblue border-2 border-cubred bg-opacity-80 shadow-lg rounded-xl mx-auto flex flex-col lg:my-0 gap-2 p-3 w-[330px]">
          <div className="flex justify-between">
            <h2 className="text-3xl text-white font-bold">Contact Info</h2>

            <button
              className="bg-cubred border hover:border-cubblue px-1 text-white border text-md font-bold rounded-xl"
              type="button"
              onClick={() => toggleEditMode("basicInfo")}
            >
              {editMode.basicInfo ? "Lock" : "Edit"}
            </button>
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="vendor_name" className="text-white ">
              Vendor Name:
            </label>
            <input
              type="text"
              name="vendor_name"
              value={formState.vendor_name}
              onChange={handleEdit}
              readOnly={!editMode.basicInfo}
              className={`bg-white  px-1 ${editMode.basicInfo ? "bg-yellow-100" : ""}`}
            />
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-2 ">
            <div className="flex flex-col w-[48%]">
              <label htmlFor="contact_firstName" className="text-white">
                First Name:
              </label>
              <input
                type="text"
                name="contact_firstName"
                value={formState.contact_firstName}
                onChange={handleEdit}
                readOnly={!editMode.basicInfo}
                className={`bg-white px-1 ${editMode.basicInfo ? "bg-yellow-100" : ""}`}
              />
            </div>

            <div className="flex flex-col w-[48%]">
              <label htmlFor="contact_lastName" className="text-white">
                Last Name:
              </label>
              <input
                type="text"
                name="contact_lastName"
                value={formState.contact_lastName}
                onChange={handleEdit}
                readOnly={!editMode.basicInfo}
                className={`bg-white px-1 ${editMode.basicInfo ? "bg-yellow-100" : ""}`}
              />
            </div>

            <div className="w-full flex gap-x-3">
              <div className="flex flex-col w-[48%]">
                <label htmlFor="tax_id" className="text-white mb:text-left">
                  Tax ID/SSN:
                </label>
                <input
                  type="text"
                  name="tax_id"
                  value={formState.tax_id}
                  onChange={handleEdit}
                  readOnly={!editMode.basicInfo}
                  className={`bg-white px-1 ${editMode.basicInfo ? `bg-yellow-100` : ``}`}
                />
              </div>

              <div className="flex flex-col w-[48%]">
                <label htmlFor="contact_phone_number" className="text-white">
                  Contact Phone #:
                </label>
                <input
                  type="text"
                  name="contact_phone_number"
                  value={formState.contact_phone_number}
                  onChange={handleEdit}
                  readOnly={!editMode.basicInfo}
                  className={`bg-white px-1 ${editMode.basicInfo ? `bg-yellow-100` : ``}`}
                />
              </div>
            </div>

            <div className="flex flex-col w-full lg:w-full">
              <label className="text-white">Remittance Address:</label>
              <input
                type="text"
                name="remittance_address"
                value={formState.remittance_address}
                onChange={handleEdit}
                readOnly={!editMode.basicInfo}
                className={`bg-white px-1 ${editMode.basicInfo ? `bg-yellow-100` : ``}`}
              />
            </div>

            <div className="flex flex-col w-[71%]">
              <label htmlFor="city" className="text-white">
                City:
              </label>
              <input
                type="text"
                name="city"
                value={formState.city}
                onChange={handleEdit}
                readOnly={!editMode.basicInfo}
                className={`bg-white px-1 ${editMode.basicInfo ? `bg-yellow-100` : ``}`}
              />
            </div>

            <div className="flex flex-col w-[25%]">
              <label className="text-white">Zipcode:</label>
              <input
                type="text"
                name="zip_code"
                value={formState.zip_code}
                onChange={handleEdit}
                readOnly={!editMode.basicInfo}
                className={`bg-white px-1 ${editMode.basicInfo ? `bg-yellow-100` : ``}`}
              />
            </div>

            <div className="flex flex-col w-[71%]">
              <label className="text-white">State / Province: </label>
              {editMode.basicInfo ? (
                <select
                  name="state"
                  id="state"
                  value={formState.state}
                  onChange={handleEdit}
                  className="bg-yellow-100 py-[2px] text-center"
                >
                  <option value="">Select</option>
                  {provinces.length > 0 &&
                    provinces.map((province) => (
                      <option
                        key={`${province.short}-${province.name}-${province.country}-${province.region}`}
                        value={province.short}
                      >
                        {containsChinese(province.name) && province["english"]
                          ? province["english"]
                          : province.name}
                      </option>
                    ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="state"
                  value={formState.state}
                  onChange={handleEdit}
                  readOnly={!editMode.basicInfo}
                  className={`bg-white px-1 ${editMode.basicInfo ? `bg-yellow-100` : ``}`}
                />
              )}
            </div>

            <div className="flex flex-col w-[25%]">
              <label className="text-white">Country:</label>
              {editMode.basicInfo ? (
                <select
                  name="country"
                  id="country"
                  value={formState.country}
                  onChange={handleEdit}
                  className="bg-white text-center py-[2px]  w-full bg-yellow-100"
                >
                  <option value="">Select</option>
                  {uniqueCountries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="country"
                  value={formState.country}
                  onChange={handleEdit}
                  readOnly={!editMode.basicInfo}
                  className={`bg-white px-1 ${editMode.basicInfo ? `bg-yellow-100` : ``}`}
                />
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="text-white">Remittance Email:</label>
              <input
                type="text"
                name="remittance_email"
                value={formState.remittance_email}
                onChange={handleEdit}
                readOnly={!editMode.basicInfo}
                className={`bg-white px-1 ${editMode.basicInfo ? `bg-yellow-100` : ``}`}
              />
            </div>
          </div>
        </section>

        {/* Business Info */}

        <section 
          className="bg-cubblue border-2 border-cubred bg-opacity-80 shadow-lg rounded-xl mx-auto flex flex-col lg:my-0 gap-2 p-3  w-[330px]">
          <div className="flex justify-between">
            <h2 className="text-3xl  text-white font-bold">Business Info</h2>
            <button
              type="button"
              onClick={() => toggleEditMode("businessInfo")}
              className="bg-cubred border hover:border-cubblue px-1 text-white border text-md font-bold rounded-xl"
            >
              {editMode.businessInfo ? "Lock" : "Edit"}
            </button>
          </div>

          <div className="flex flex-col w-full lg:w-full">
            <label className="text-white">Service Provided:</label>
            <input
              type="text"
              name="service_provided"
              value={formState.service_provided}
              onChange={handleEdit}
              readOnly={!editMode.businessInfo}
              className={`bg-white px-1 ${editMode.businessInfo ? `bg-yellow-100` : ``}`}
            />
          </div>

          <div className="flex flex-wrap gap-x-2 gap-y-2">
            <div className="flex flex-col w-full">
              <label className="text-white">Authorized Name:</label>
              <input
                type="text"
                name="authorized_name"
                value={formState.authorized_name}
                onChange={handleEdit}
                readOnly={!editMode.businessInfo}
                className={`bg-white px-1 ${editMode.businessInfo ? `bg-yellow-100` : ``}`}
              />
            </div>

            <div className="flex flex-col w-[55%]">
              <label className="text-white">Authorized Phone #:</label>
              <input
                type="text"
                name="authorized_phone_number"
                value={formState.authorized_phone_number}
                onChange={handleEdit}
                readOnly={!editMode.businessInfo}
                className={`bg-white px-1 
                ${editMode.businessInfo ? `bg-yellow-100` : ``}`}
              />
            </div>

            <div className="flex flex-col items-end w-[42.3%]">
              <label className="text-white">Minority Owned:</label>
              <select
                name="minority_ownership"
                value={formState.minority_ownership}
                onChange={handleEdit}
                disabled={!editMode.businessInfo}
                className={`bg-white px-1 rounded w-1/2 py-[2px] ${editMode.businessInfo ? `bg-yellow-100` : ``}`}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-white">Authorized Signature:</label>
            {editMode.businessInfo ? (
              <>
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                    className: `signature-canvas w-full h-[148px] bg-yellow-100 `,
                  }}
                  ref={sigCanvas}
                />
                <div className="flex justify-between mt-2">
                  <button
                    type="button"
                    className="cursor-pointer bg-cubred border rounded-md px-2 w-5/12 mt-1 text-white hover:border-cubblue"
                    onClick={handleAcceptSignature}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer bg-cubred border rounded-md px-2 w-5/12 mt-1 text-white hover:border-cubblue"
                    onClick={handleClearSignature}
                  >
                    Clear
                  </button>
                </div>
              </>
            ) : (
              signature && (
                <img
                  src={signature}
                  alt="Authorized Signature"
                  className="bg-white h-[186px]"
                />
              )
            )}
          </div>
        </section>

        {/* Bank Info */}
        <section 
          className="bg-cubblue border-2 border-cubred bg-opacity-80 shadow-lg rounded-xl mx-auto flex flex-col lg:my-0 p-3  w-[330px]">

          <div className="flex justify-between">
            <h2 className="text-3xl text-center text-white font-bold">
              Banking Info
            </h2>
            <button
              type="button"
              onClick={() => toggleEditMode("bankInfo")}
              className="bg-cubred border hover:border-cubblue px-1 text-white border text-md font-bold rounded-xl"
            >
              {editMode.bankInfo ? "Lock" : "Edit"}
            </button>
          </div>

          <div className="w-full flex justify-center flex-col items-center  mt-3 ">
            <label className="text-white">Bank Institution:</label>
            <input
              type="text"
              name="bank_name"
              value={formState.bank_name}
              onChange={handleEdit}
              readOnly={!editMode.bankInfo}
              className={`bg-white px-1 w-[55%] ${editMode.bankInfo ? `bg-yellow-100` : ``}`}
            />

            <label className="text-white">Account Number:</label>
            <input
              type="text"
              name="account_number"
              value={formState.account_number}
              onChange={handleEdit}
              readOnly={!editMode.bankInfo}
              className={`bg-white px-1 w-[55%] ${editMode.bankInfo ? `bg-yellow-100` : ``}`}
            />
      
            <label className="text-white">Routing Number:</label>
            <input
              type="text"
              name="routing_number"
              value={formState.routing_number}
              onChange={handleEdit}
              readOnly={!editMode.bankInfo}
              className={`bg-white px-1 w-[55%] ${editMode.bankInfo ? `bg-yellow-100` : ``}`}
            />
          </div>
        </section>

        {error && <p className="text-red-500">{error}</p>}

        {/* DISCLAIMER */}
        <section className="bg-cubblue border-2 border-cubred bg-opacity-80 shadow-lg rounded-xl mx-auto flex flex-col gap-2 p-3  lg:my-0 w-[330px]">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl mb:text-left text-white font-bold text-center">
              Disclaimer
            </h2>
            <p className="text-white text-center">
              Information provided on this form will be used to set up
              electronic payment. By signing this form, you authorize us to
              initiate ACH credits and debits to the bank account provided.
            </p>
            <p className="text-white text-center font-bold">
              **All fields must be filled out for the form to be accepted**
            </p>
            <button
              type="submit"
              className="bg-cubred hover:bg-red-800 text-white mt-1 font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default VendorInfoReviewForm;

         
