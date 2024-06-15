import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignatureCanvas from "react-signature-canvas";
import provinces from "provinces";
// import {
//   updateBasicInfo,
//   updateDisclaimerInfo,
//   updateBusinessInfo,
//   updateBankInfo,
// } from "../actions"; // Adjust the import path as necessary

const VendorSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basicInfo = useSelector((state) => state.basicInfo);
  const businessInfo = useSelector((state) => state.businessInfo);
  const bankInfo = useSelector((state) => state.bankInfo);
  const disclaimerInfo = useSelector((state) => state.disclaimerInfo);
  const uniqueCountries = Array.from(
    new Set(provinces.map((province) => province.country))
  );
  const signaturePadRef = useRef(null);
  const canvasContainerRef = useRef(null);

  // Signature
  useEffect(() => {
    const handleResize = () => {
      const canvas = signaturePadRef.current.getCanvas();
      const container = canvasContainerRef.current;

      if (canvas && container) {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = container.offsetWidth * ratio;
        canvas.height = container.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      // updateBusinessInfo({ authorized_signature: "" });
    }
  };


  const [formState, setFormState] = useState({
    ...basicInfo,
    ...businessInfo,
    ...bankInfo,
    ...disclaimerInfo,
  });




  const [error, setError] = useState(null);

  // useEffect(() => {
  //   setFormState({
  //     ...basicInfo,
  //     ...businessInfo,
  //     ...bankInfo,
  //     ...disclaimerInfo,
  //   });
  // }, [basicInfo, businessInfo, bankInfo, disclaimerInfo]);

  const handleEdit = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

    const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      updateBusinessInfo({ [name]: type === "checkbox" ? checked : value });
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


  return (
    <div className="border-4 rounded-lg bg-cubblue bg-opacity-70 border-cubblue mx-[10px] max-w-[350px] overflow-hidden my-5 mx-auto">
      <form id="vendorForm" className="" onSubmit={handleSubmit}>
        <div className="my-[5px]">
          <div className="text-center mb-[5px]">
            <h2 className="px-2 text-3xl text-white font-bold">
              Contact Information
            </h2>
          </div>
        </div>

        <div className="rounded-b-xl px-2 py-2">
          <div className="flex flex-col w-12/12 gap-x-2 lg:flex-row lg:h-auto lg:gap-x-2 lg:justify-between">
            {/* Basic Info */}
            <div>
              <div
                id="basic_info"
                className="bg-cubblue border-2 rounded-xl shadow-lg border-cubred p-3 w-full h-1/4 lg:w-1/2 xl:w-1/2 lg:flex-auto"
              >
                <label htmlFor="vendor_name" className="text-white">
                  Vendor Name
                </label>
                <input
                  type="text"
                  name="vendor_name"
                  id="vendor_name"
                  placeholder="Your Vendor Name"
                  className="bg-white w-full my-2 p-3"
                  value={formState.vendor_name}
                  onChange={handleEdit}
                />

                <label htmlFor="contact_info" className="text-white">
                  Contact Name
                </label>
                <div className="flex justify-between">
                  <input
                    type="text"
                    name="contact_firstName"
                    id="contact_firstName"
                    placeholder="First Name"
                    className="bg-white w-5/12 my-2 p-3 mr-2"
                    value={formState.contact_firstName}
                    onChange={handleEdit}
                  />
                  <input
                    type="text"
                    name="contact_lastName"
                    id="contact_lastName"
                    placeholder="Last Name"
                    className="bg-white w-5/12 my-2 p-3 mr-2"
                    value={formState.contact_lastName}
                    onChange={handleEdit}
                  />
                  <input
                    type="text"
                    name="contact_MiddleInt"
                    id="contact_MiddleInt"
                    placeholder="M.I."
                    className="bg-white w-2/12 my-2 p-3"
                    value={formState.contact_MiddleInt}
                    onChange={handleEdit}
                  />
                </div>

                <div className="flex justify-between">
                  <div className="w-6/12 mr-2">
                    <label
                      htmlFor="contact_phone_number"
                      className="text-white"
                    >
                      Contact Phone #
                    </label>
                    <br />
                    <input
                      type="tel"
                      name="contact_phone_number"
                      id="contact_phone_number"
                      placeholder="Phone Number"
                      className="bg-white my-2 p-3 w-full"
                      value={formState.contact_phone_number}
                      onChange={handleEdit}
                    />
                  </div>
                  <div className="w-6/12">
                    <label htmlFor="tax_id" className="text-white">
                      Tax ID/SSN
                    </label>
                    <br />
                    <input
                      type="text"
                      name="tax_id"
                      id="tax_id"
                      placeholder="Tax ID or SSN"
                      className="bg-white my-2 p-3 w-full"
                      value={formState.tax_id}
                      onChange={handleEdit}
                    />
                  </div>
                </div>
              </div>

              <div
                id="locale"
                className="bg-cubblue border-2 border-cubred shadow-lg rounded-xl flex flex-wrap gap-x-2 p-3 w-full lg:w-1/2 xl:w-1/2 mt-2 lg:mt-0 lg:flex-auto"
              >
                <div className="flex flex-col w-full sm:w-2/3">
                  <label htmlFor="remittance_address" className="text-white">
                    Remittance Street Address or P.O. Box
                  </label>
                  <input
                    type="text"
                    name="remittance_address"
                    id="remittance_address"
                    placeholder="Street Address or P.O. Box"
                    className="bg-white my-2 p-3"
                    value={formState.remittance_address}
                    onChange={handleEdit}
                  />
                </div>

                <div className="flex flex-col w-2/3 sm:w-1/4 flex-auto">
                  <label htmlFor="city" className="text-white">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    className="bg-white my-2 p-3"
                    value={formState.city}
                    onChange={handleEdit}
                  />
                </div>

                <div className="flex flex-col w-1/4 sm:w-1/6 flex-auto">
                  <label htmlFor="state" className="text-white">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="State"
                    className="bg-white my-2 p-3"
                    value={formState.state}
                    onChange={handleEdit}
                  />
                </div>

                <div className="flex flex-col w-2/6 sm:w-1/6 flex-auto">
                  <label htmlFor="zip_code" className="text-white">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zip_code"
                    id="zip_code"
                    placeholder="Zip Code"
                    className="bg-white my-2 p-3"
                    value={formState.zip_code}
                    onChange={handleEdit}
                  />
                </div>

                <div className="flex flex-col w-3/6 sm:w-2/6 flex-auto">
                  <label htmlFor="country" className="text-white">
                    Country
                  </label>
                  <select
                    name="country"
                    id="country"
                    className="bg-white my-2 p-3"
                    value={formState.country}
                    onChange={handleEdit}
                  >
                    <option value="">Select Country</option>
                    {uniqueCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-3/6 sm:w-1/6 flex-auto">
                  <label htmlFor="remittance_email" className="text-white">
                    Remittance Email
                  </label>
                  <input
                    type="email"
                    name="remittance_email"
                    id="remittance_email"
                    placeholder="Remittance Email"
                    className="bg-white my-2 p-3"
                    value={formState.remittance_email}
                    onChange={handleEdit}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Info */}

          <div>
            <div className="mt-[20px] mb-[5px] text-center">
              <h2 className="text-3xl text-white font-bold">
                Business Information
              </h2>
            </div>

            <div
              id="business_info"
              className="bg-cubblue border-2 rounded-xl shadow-lg border-cubred p-3 mt-2 w-full lg:flex-auto"
            >
              <label htmlFor="service_provided" className="text-white">
                Service Provided
              </label>
              <input
                type="text"
                name="service_provided"
                id="service_provided"
                placeholder="Service Provided"
                className="bg-white w-full my-2 p-3"
                value={formState.service_provided}
                onChange={handleEdit}
              />

                <label
                  htmlFor="minority_ownership"
                  className="text-white sm:w-full"
                >
                  Minority Owned
                </label>
                <select
                  name="minority_ownership"
                  id="minority_ownership"
                  className="bg-white mb-1 w-full p-3 h-12"
                  value={businessInfo.minority_ownership}
                  onChange={handleChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
            

              <label htmlFor="authorized_name" className="text-white">
                Authorized Name
              </label>
              <input
                type="text"
                name="authorized_name"
                id="authorized_name"
                placeholder="Authorized Name"
                className="bg-white w-full my-2 p-3"
                value={formState.authorized_name}
                onChange={handleEdit}
              />

              <label htmlFor="authorized_phone_number" className="text-white">
                Authorized Phone #
              </label>
              <input
                type="tel"
                name="authorized_phone_number"
                id="authorized_phone_number"
                placeholder="Authorized Phone Number"
                className="bg-white w-full my-2 p-3"
                value={formState.authorized_phone_number}
                onChange={handleEdit}
              />

              <div className="flex flex-col w-full" ref={canvasContainerRef}>
                <label htmlFor="authorized_signature" className="text-white">
                  Authorized Signature
                </label>
                <SignatureCanvas
                  ref={signaturePadRef}
                  penColor="black"
                  canvasProps={{
                    className: "signature-canvas w-full h-[150px]",
                    style: { backgroundColor: "white" },
                  }}
                />
              </div>

              <button
                type="button"
                onClick={clearSignature}
                id="clearSignature"
                className="cursor-pointer bg-cubred border rounded-md px-2 w-5/12 mt-1 text-white hover:bg-cubblue"
              >
                Clear Signature
              </button>
            </div>
          </div>

          {/* Bank Info */}

          <div>
            <div className="mt-[20px] mb-[5px] text-center">
              <h2 className="text-3xl text-white font-bold">
                Banking Information
              </h2>
            </div>

            <div
              id="bank_info"
              className="bg-cubblue border-2 rounded-xl shadow-lg border-cubred p-3 mt-2 w-full lg:flex-auto"
            >
              <label htmlFor="bank_name" className="text-white">
                Bank Name
              </label>
              <input
                type="text"
                name="bank_name"
                id="bank_name"
                placeholder="Bank Name"
                className="bg-white w-full my-2 p-3"
                value={formState.bank_name}
                onChange={handleEdit}
              />

              <label htmlFor="account_number" className="text-white">
                Account Number
              </label>
              <input
                type="text"
                name="account_number"
                id="account_number"
                placeholder="Account Number"
                className="bg-white w-full my-2 p-3"
                value={formState.account_number}
                onChange={handleEdit}
              />

              <label htmlFor="routing_number" className="text-white">
                Routing Number
              </label>
              <input
                type="text"
                name="routing_number"
                id="routing_number"
                placeholder="Routing Number"
                className="bg-white w-full my-2 p-3"
                value={formState.routing_number}
                onChange={handleEdit}
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-cubred text-white px-6 py-3 rounded"
            >
              Submit
            </button>
          </div>

          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default VendorSignup;
