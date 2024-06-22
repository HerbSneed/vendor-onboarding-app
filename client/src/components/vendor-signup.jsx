import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import provinces from "provinces";
import containsChinese from "contains-chinese";
import { connect } from "react-redux";
import {
  updateBasicInfo,
  updateBusinessInfo,
  updateBankInfo,
} from "../../src/utils/redux/actions/actions"; 


const VendorSignup = ({basicInfo, businessInfo, bankInfo, updateBasicInfo, updateBusinessInfo, updateBankInfo }) => {
  const navigate = useNavigate();
  const signaturePadRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [error, setError] = useState(null);
  const uniqueCountries = Array.from(
    new Set(provinces.map((province) => province.country))
  );
  const [provincesData, setProvincesData] = useState([]);


  useEffect(() => {
    setProvincesData(provinces);
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authorized_signature = signaturePadRef.current.isEmpty()
      ? ""
      : signaturePadRef.current.toDataURL();

    // Check if required fields are filled out
    if (
      !basicInfo.vendor_name ||
      !basicInfo.contact_firstName ||
      !basicInfo.contact_lastName ||
      !basicInfo.contact_phone_number ||
      !basicInfo.tax_id ||
      !basicInfo.remittance_address ||
      !basicInfo.city ||
      !basicInfo.state ||
      !basicInfo.zip_code ||
      !basicInfo.country ||
      !basicInfo.remittance_email ||
      !businessInfo.service_provided ||
      !businessInfo.minority_ownership ||
      !businessInfo.authorized_name ||
      !businessInfo.authorized_phone_number ||
      !authorized_signature ||
      !bankInfo.bank_name ||
      !bankInfo.routing_number ||
      !bankInfo.account_number
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      updateBasicInfo(basicInfo);
      updateBusinessInfo(businessInfo);
      updateBankInfo(bankInfo);
      navigate("/vendor/disclaimer");
    } catch (err) {
      setError("Vendor information is not correct");
      console.error("Vendor Info error", err);
    }
  };

    const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      updateBasicInfo({ [name]: type === "checkbox" ? checked : value });
      updateBusinessInfo({ [name]: type === "checkbox" ? checked : value });
      updateBankInfo({ [name]: type === "checkbox" ? checked : value });
    };

  return (
    <div className=" w-screen text-center pt-1 pb-3 mb:text-left">
      <p className="text-white font-bold drop-shadow-lg pt-2 mb:max-w-[325px] mx-auto text-center text-xl lg:text-2xl lg:max-w-[400px]">
        Complete all required fields before sumbiting your information.
      </p>

      <form
        id="vendorForm"
        className=" flex flex-col gap-y-6 my-3 mx-[10px] mb:mx-auto mb:max-w-[350px] lg:max-w-[875px] lg:flex lg:flex-row lg:flex-wrap lg:gap-x-5 lg:justify-center lg:p-6 lg:bg-gray-300 lg:bg-opacity-50 lg:rounded-lg"
        onSubmit={handleSubmit}
      >
        {/* Basic Info */}
        <section
          id="basic_info"
          className="flex flex-col mb:flex-wrap  lg:flex-auto bg-cubblue border-2 rounded-xl shadow-lg border-cubred px-3 lg:max-w-[400px] py-4"
        >
          <div className="mb-[5px]">
            <h2 className="text-3xl text-white font-bold">Contact Info</h2>
          </div>

          <div className="max-w-[250px]  mx-auto mb:mx-0 mb:max-w-full">
            <label htmlFor="vendor_name" className="text-white">
              Vendor Name
            </label>
            <input
              type="text"
              name="vendor_name"
              id="vendor_name"
              placeholder=""
              className="bg-white w-full px-1"
              value={basicInfo.vendor_name}
              onChange={handleChange}
            />
          </div>

          <label className="text-white">Contact Name</label>

          <div className="max-w-[250px] mb:max-w-full flex flex-col justify-center items-center mx-auto mb:flex-row mb:flex-wrap mb:justify-between">
            <label htmlFor="contact_firstName"></label>
            <input
              type="text"
              name="contact_firstName"
              id="contact_firstName"
              placeholder=""
              className="bg-white w-full mb:w-[49%] px-1"
              value={basicInfo.contact_firstName}
              onChange={handleChange}
            />
            <label htmlFor="contact_lastName"></label>
            <input
              type="text"
              name="contact_lastName"
              id="contact_lastName"
              placeholder=""
              className="bg-white w-full mb:w-[49%] px-1"
              value={basicInfo.contact_lastName}
              onChange={handleChange}
            />
          </div>

          <div className="max-w-[250px] mb:max-w-full mx-auto mb:flex mb:justify-between">
            <div className="mb:w-[49%]">
              <label
                htmlFor="contact_phone_number"
                className="text-white mb:text-left"
              >
                Contact Phone #
              </label>
              <input
                type="tel"
                name="contact_phone_number"
                id="contact_phone_number"
                placeholder=""
                className="bg-white p-3 w-full"
                value={basicInfo.contact_phone_number}
                onChange={handleChange}
              />
            </div>

            <div className="mb:w-[49%]">
              <label htmlFor="tax_id" className="text-white">
                Tax ID/SSN
              </label>
              <input
                type="text"
                name="tax_id"
                id="tax_id"
                placeholder=""
                className="bg-white  p-3 w-full"
                value={basicInfo.tax_id}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="max-w-[250px] mb:max-w-full mx-auto">
            <label htmlFor="remittance_address" className="text-white">
              Street Address or P.O. Box
            </label>

            <input
              type="text"
              name="remittance_address"
              id="remittance_address"
              placeholder=""
              className="bg-white  p-3 w-full"
              value={basicInfo.remittance_address}
              onChange={handleChange}
            />
          </div>

          <div className="max-w-[250px] mb:max-w-full mx-auto mb:flex mb:justify-between">
            <div className="w-full mb:w-[49%]">
              <label htmlFor="city" className="text-white">
                City
              </label>

              <input
                type="text"
                name="city"
                id="city"
                placeholder=""
                className="bg-white  p-3 w-full"
                value={basicInfo.city}
                onChange={handleChange}
              />
            </div>

            <div className="w-full mb:w-[49%]">
              <label htmlFor="state" className="text-white">
                State/Province
              </label>
              <select
                name="state"
                id="state"
                value={basicInfo.state}
                onChange={handleChange}
                className="bg-white text-center rounded mb-3 p-3.5 w-full"
              >
                <option value="">Select</option>
                {provinces.length > 0 &&
                  provinces.map((province) => (
                    <option
                      key={`${province.short}-${province.name}-${province.country}-${province.region}`}
                      value={province.name}
                    >
                      {containsChinese(province.name) && province["english"]
                        ? province["english"]
                        : province.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mb:w-full mb:flex mx-auto mb:justify-between">
            <div className="w-[125px] mb:w-[49%]">
              <label htmlFor="zip_code" className="text-white">
                Zip Code
              </label>

              <input
                type="text"
                name="zip_code"
                id="zip_code"
                placeholder=""
                className="bg-white p-3 w-full"
                value={basicInfo.zip_code}
                onChange={handleChange}
              />
            </div>

            <div className="w-[70px] mb:w-[49%] mx-auto mb:mx-0">
              <label htmlFor="country" className="text-white">
                Country
                <select
                  name="country"
                  id="country"
                  className="bg-white  text-black text-center rounded-sm py-3.5 text-center  w-full"
                  value={basicInfo.country}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {uniqueCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="max-w-[250px] mb:max-w-full mx-auto mb:mx-0">
            <label htmlFor="remittance_email" className="text-white">
              Remittance Email
            </label>

            <input
              type="email"
              name="remittance_email"
              id="remittance_email"
              placeholder="example@gmail.com"
              className="bg-white  p-3 w-full"
              value={basicInfo.remittance_email}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Business Info */}

        <div
          id="business_info"
          className="flex flex-col mb:flex-wrap  lg:flex-auto bg-cubblue border-2 rounded-xl shadow-lg border-cubred px-3 lg:max-w-[400px] py-4"
        >
          <div className="mb-[5px] ">
            <h2 className="text-3xl text-white font-bold">Business Info</h2>
          </div>

          <div className="flex flex-col max-w-[250px] mb:max-w-full mx-auto mb:mx-0">
            <label htmlFor="service_provided" className="text-white">
              Service Provided
            </label>
            <input
              type="text"
              name="service_provided"
              id="service_provided"
              placeholder=""
              className="bg-white max-w-[250px]  mb:max-w-full  p-3"
              value={businessInfo.service_provided}
              onChange={handleChange}
            />
          </div>

          <div className="mb:w-full mb:flex mb:flex-wrap mb:justify-between">
            <div className="mb:w-[49%]">
              <label htmlFor="authorized_name" className="text-white">
                Authorized Name
              </label>
              <input
                type="text"
                name="authorized_name"
                id="authorized_name"
                placeholder=""
                className="bg-white max-w-[250px] mb:w-full  p-3"
                value={businessInfo.authorized_name}
                onChange={handleChange}
              />
            </div>

            <div className="mb:w-[49%]">
              <label htmlFor="authorized_phone_number" className="text-white">
                Authorized Phone #
              </label>
              <input
                type="tel"
                name="authorized_phone_number"
                id="authorized_phone_number"
                placeholder=""
                className="bg-white max-w-[250px] mb:w-full  p-3"
                value={businessInfo.authorized_phone_number}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col mb:w-[120px]">
            <label htmlFor="minority_ownership" className="text-white">
              Minority Owned
            </label>
            <select
              name="minority_ownership"
              id="minority_ownership"
              className="bg-white w-[80px] mx-auto mb:mx-0 rounded-sm mb:w-[80px]  text-center p-3 h-12"
              value={businessInfo.minority_ownership}
              onChange={handleChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div className="w-full" ref={canvasContainerRef}>
            <label htmlFor="authorized_signature" className="text-white">
              Authorized Signature
            </label>
            <SignatureCanvas
              id="authorized_signature"
              ref={signaturePadRef}
              penColor="black"
              canvasProps={{
                className:
                  "signature-canvas  w-full h-[150px] rounded lg:h-[250px]",
                style: { backgroundColor: "white" },
              }}
            />
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={clearSignature}
              id="clearSignature"
              className="cursor-pointer bg-cubred border rounded px-2  font-semibold w-[100px] mt-2 text-white hover:bg-cubblue"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Bank Info */}

        <div>
          <div
            id="bank_info"
            className="flex flex-col mb:flex-wrap max-w-[250px] mx-auto  lg:flex-auto bg-cubblue border-2 rounded-xl shadow-lg border-cubred px-3 lg:min-w-[250px] py-4"
          >
            <div className="mb-[5px] text-center mb:text-center">
              <h2 className="text-3xl text-white font-bold">Banking Info</h2>
            </div>

            <div className="flex flex-col justify-center items-center mb:max-w-full mb:flex mb:flex-col mb:justify-center mb:items:center mx-auto text-center">
              <label htmlFor="bank_name" className=" text-white">
                Bank Name
              </label>
              <input
                type="text"
                name="bank_name"
                id="bank_name"
                placeholder=""
                className="bg-white max-w-[250px] mb:max-w-full text-center w-full  p-3"
                value={bankInfo.bank_name}
                onChange={handleChange}
              />

              <label htmlFor="account_number" className="text-white">
                Account Number
              </label>
              <input
                type="text"
                name="account_number"
                id="account_number"
                placeholder=""
                className="bg-white w-full mb:max-w-full text-center max-w-[250px]  p-3"
                value={bankInfo.account_number}
                onChange={handleChange}
              />

              <label htmlFor="routing_number" className="text-white">
                Routing Number
              </label>
              <input
                type="text"
                name="routing_number"
                id="routing_number"
                placeholder=""
                className="bg-white w-full mb:max-w-full text-center max-w-[250px] p-3"
                value={bankInfo.routing_number}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-center mt-3 mb-5 lg:mb-0 ">
            <button
              type="submit"
              className="bg-cubred border focus:bg-cubblue lg:w-[250px] text-center text-white px-8 py-2 rounded"
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

const mapStateToProps = (state) => ({
  basicInfo: state.basicInfo,
  businessInfo: state.businessInfo,
  bankInfo: state.bankInfo
});

const mapDispatchToProps = (dispatch) => ({
  updateBasicInfo: (data) => dispatch(updateBasicInfo(data)),
  updateBusinessInfo: (data) => dispatch(updateBusinessInfo(data)),
  updateBankInfo: (data) => dispatch(updateBankInfo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorSignup);
