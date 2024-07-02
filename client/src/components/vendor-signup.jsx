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
import scrollToTop from "../utils/helper/topScroll";

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
      updateBusinessInfo({businessInfo, authorized_signature});
      updateBankInfo(bankInfo);
      navigate("/vendor/disclaimer");
      scrollToTop();
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
    <div className="text-center  pt-24 pb-3 mb:text-left">
      <p className="w-[300px] font-bold text-center mx-auto text-xl drop-shadow-lg text-white">
        Complete all required fields before sumbiting your information.
      </p>

      <form
        id="vendorForm"
        className="lg:bg-gray-300 lg:mx-auto lg:mt-3  lg:max-w-[775px] lg:bg-opacity-50 lg:rounded-lg lg:py-6"
        onSubmit={handleSubmit}
      >
        <section
          className="
          flex flex-col  gap-y-5 my-3 lg:max-w-[700px]  lg:flex lg:flex-row lg:mx-auto lg:flex-wrap"
        >
          {/* Basic Info */}
          <section
            id="basic_info"
            className="bg-cubblue border-2 border-cubred bg-opacity-80 shadow-lg rounded-xl mx-auto flex flex-col lg:my-0 gap-2 p-3 w-[300px] mb:w-[330px] mx-auto"
          >
            <h2 className="text-3xl text-white font-bold">Contact Info</h2>

            <div className="w-full flex flex-col">
              <label htmlFor="vendor_name" className="text-white">
                Vendor Name:
              </label>
              <input
                type="text"
                name="vendor_name"
                id="vendor_name"
                placeholder=""
                className="bg-white  px-1"
                value={basicInfo.vendor_name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-2 ">
              <div className="flex flex-col w-full mb:w-[48%]">
                <label htmlFor="contact_firstName" className="text-white">
                  First Name:
                </label>
                <input
                  type="text"
                  name="contact_firstName"
                  id="contact_firstName"
                  placeholder=""
                  className="bg-white px-1"
                  value={basicInfo.contact_firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col w-full mb:w-[48%]">
                <label htmlFor="contact_lastName" className="text-white">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="contact_lastName"
                  id="contact_lastName"
                  placeholder=""
                  className="bg-white px-1"
                  value={basicInfo.contact_lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full flex flex-col mb:flex-row gap-x-3">
                <div className="flex flex-col w-full mb:w-[48%]">
                  <label htmlFor="tax_id" className="text-white">
                    Tax ID/SSN:
                  </label>
                  <input
                    type="number"
                    name="tax_id"
                    id="tax_id"
                    placeholder=""
                    className="bg-white px-1 "
                    value={basicInfo.tax_id}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col w-full mb:w-[48%]">
                  <label htmlFor="contact_phone_number" className="text-white">
                    Contact Phone #:
                  </label>
                  <input
                    type="tel"
                    name="contact_phone_number"
                    id="contact_phone_number"
                    placeholder=""
                    className="bg-white px-1"
                    value={basicInfo.contact_phone_number}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full lg:w-full">
                <label htmlFor="remittance_address" className="text-white">
                  Remittance Address:
                </label>

                <input
                  type="text"
                  name="remittance_address"
                  id="remittance_address"
                  placeholder=""
                  className="bg-white  px-1 w-full"
                  value={basicInfo.remittance_address}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col w-full mb:w-[68%]">
                <label htmlFor="city" className="text-white">
                  City:
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder=""
                  className="bg-white px-1 "
                  value={basicInfo.city}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col w-[50%] mb:w-[28%]">
                <label htmlFor="zip_code" className="text-white">
                  Zip Code:
                </label>
                <input
                  type="text"
                  name="zip_code"
                  id="zip_code"
                  placeholder=""
                  className="bg-white px-1 "
                  value={basicInfo.zip_code}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col w-full mb:w-[68%]">
                <label htmlFor="state" className="text-white">
                  State/Province:
                </label>
                <select
                  name="state"
                  id="state"
                  value={basicInfo.state}
                  onChange={handleChange}
                  className="bg-white text-center rounded  py-[2px]"
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

              <div className="flex flex-col mt-1 mb:mt-0 w-[28%]">
                <label htmlFor="country" className="text-white">
                  Country:
                  <select
                    name="country"
                    id="country"
                    className="bg-white  text-black text-center rounded-sm py-[2px] w-full"
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

            <div className="flex flex-col mt-2 w-full">
              <label htmlFor="remittance_email" className="text-white">
                Remittance Email:
              </label>

              <input
                type="email"
                name="remittance_email"
                id="remittance_email"
                placeholder="example@gmail.com"
                className="bg-white  px-1 w-full"
                value={basicInfo.remittance_email}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Business Info */}

          <section
            id="business_info"
            className="bg-cubblue border-2 border-cubred bg-opacity-80 shadow-lg rounded-xl mx-auto flex flex-col lg:my-0 gap-2 p-3  w-[300px] mb:w-[330px]"
          >
            <div className="flex flex-col">
              <h2 className="text-3xl text-white font-bold">Business Info</h2>
            </div>

            <div className="flex flex-col w-full lg:w-full">
              <label htmlFor="service_provided" className="text-white">
                Service Provided
              </label>
              <input
                type="text"
                name="service_provided"
                id="service_provided"
                placeholder=""
                className="bg-white px-1"
                value={businessInfo.service_provided}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-wrap gap-x-2 justify-between gap-y-2">
              <div className="flex flex-col w-full lg:w-full">
                <label htmlFor="authorized_name" className="text-white">
                  Authorized Name
                </label>
                <input
                  type="text"
                  name="authorized_name"
                  id="authorized_name"
                  placeholder=""
                  className="bg-white px-1"
                  value={businessInfo.authorized_name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col w-full mb:w-1/2">
                <label htmlFor="authorized_phone_number" className="text-white">
                  Auth Phone #
                </label>
                <input
                  type="tel"
                  name="authorized_phone_number"
                  id="authorized_phone_number"
                  placeholder=""
                  className="bg-white px-1 py-[1px]"
                  value={businessInfo.authorized_phone_number}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col  w-1/2 mb:w-[46%]">
                <label htmlFor="minority_ownership" className="text-white">
                  Minority Owned:
                </label>
                <select
                  name="minority_ownership"
                  id="minority_ownership"
                  className="bg-white px-1 text-center rounded-sm w-1/2 mb:w-full py-[2px]"
                  value={businessInfo.minority_ownership}
                  onChange={handleChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col w-full" ref={canvasContainerRef}>
              <label htmlFor="authorized_signature" className="text-white">
                Authorized Signature:
              </label>
              <SignatureCanvas
                ref={signaturePadRef}
                penColor="black"
                canvasProps={{
                  className:
                    "signature-canvas  w-full h-[150px] rounded lg:h-[175px]",
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
          </section>

          {/* Bank Info */}

          <section
            id="bank_info"
            className="bg-cubblue border-2 border-cubred bg-opacity-80 shadow-lg rounded-xl mx-auto flex flex-col lg:my-0 p-3  w-[300px] mb:w-[330px]"
          >
            <div className="text-center text-center">
              <h2 className="text-3xl text-white font-bold">Banking Info</h2>
            </div>

            <div className="w-full flex justify-center items-center flex-col mt-3 ">
              <label htmlFor="bank_name" className=" text-white">
                Bank Instituion:
              </label>
              <input
                type="text"
                name="bank_name"
                id="bank_name"
                placeholder=""
                className="bg-white px-1 w-[55%]"
                value={bankInfo.bank_name}
                onChange={handleChange}
              />

              <label htmlFor="account_number" className="text-white">
                Account Number:
              </label>
              <input
                type="text"
                name="account_number"
                id="account_number"
                placeholder=""
                className="bg-white px-1 w-[55%]"
                value={bankInfo.account_number}
                onChange={handleChange}
              />

              <label htmlFor="routing_number" className="text-white">
                Routing Number:
              </label>
              <input
                type="text"
                name="routing_number"
                id="routing_number"
                placeholder=""
                className="bg-white px-1 w-[55%]"
                value={bankInfo.routing_number}
                onChange={handleChange}
              />
            </div>
          </section>
        </section>

        <div className="flex justify-center mt-3 mb-5">
          <button
            type="submit"
            className="bg-cubred border focus:bg-cubblue lg:w-[250px] text-center text-white px-8 py-2 rounded"
          >
            Submit
          </button>
        </div>

        {error && <p className="text-red-600 mt-4">{error}</p>}
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
