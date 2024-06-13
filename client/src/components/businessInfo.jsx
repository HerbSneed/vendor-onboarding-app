import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { updateBusinessInfo } from "../../src/utils/redux/actions/actions";
import SignatureCanvas from "react-signature-canvas";

const BusinessInfo = ({ businessInfo, updateBusinessInfo }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const signaturePadRef = useRef(null);
  const canvasContainerRef = useRef(null);

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

   const handleBackClick = () => {
     navigate(-1);
   };

  const handleBusinessClick = async (event) => {
    event.preventDefault();

    const {
      service_provided,
      minority_ownership,
      authorized_name,
      authorized_phone_number,
    } = businessInfo;
    const authorized_signature = signaturePadRef.current.isEmpty()
      ? ""
      : signaturePadRef.current.toDataURL();

    if (
      !service_provided ||
      !minority_ownership === undefined ||
      !authorized_name ||
      !authorized_phone_number ||
      !authorized_signature
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      updateBusinessInfo({ ...businessInfo, authorized_signature });
      navigate("/vendor/bank-info");
    } catch (err) {
      setError("Business information is not correct");
      console.error("Business Info error", err);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    updateBusinessInfo({ [name]: type === "checkbox" ? checked : value });
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      updateBusinessInfo({ authorized_signature: "" });
    }
  };

  return (
    <div
      id="business_info"
      className="flex flex-col items-center justify-center mx-auto"
    >
      <div>
        <h2 className="text-3xl drop-shadow-lg mt-5 text-white font-bold">
          Business Information
        </h2>
      </div>

      <form
        method="POST"
        onSubmit={handleBusinessClick}
        className="bg-cubblue border-2 border-cubred bg-opacity-80 shadow-lg rounded-xl mx-auto flex flex-col sm:flex-row sm:flex-wrap my-[1%] lg:my-[2%] lg:my-0 gap-2 p-3 w-[350px]"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="service_provided" className="text-white">
            Service Provided
          </label>
          <input
            type="text"
            name="service_provided"
            id="service_provided"
            placeholder="Service Provided"
            className="bg-white mb-1 p-3 w-full"
            value={businessInfo.service_provided}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col w-full sm:w-[36%]">
          <label htmlFor="minority_ownership" className="text-white sm:w-full">
            Minority Owned
          </label>
          <select
            name="minority_ownership"
            id="minority_ownership"
            className="bg-white mb-1 w-4/12 sm:w-full p-3 h-12"
            value={businessInfo.minority_ownership}
            onChange={handleChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <div className="flex flex-col w-full sm:w-[60%]">
          <label htmlFor="authorized_name" className="text-white">
            Authorized Name
          </label>
          <input
            type="text"
            name="authorized_name"
            id="authorized_name"
            placeholder="Authorized Name"
            className="bg-white mb-1 p-3"
            value={businessInfo.authorized_name}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col w-full sm:w-[60%]">
          <label htmlFor="authorized_phone_number" className="text-white">
            Authorized Phone #
          </label>
          <input
            type="text"
            name="authorized_phone_number"
            id="authorized_phone_number"
            placeholder="222-333-1234"
            className="bg-white w-full mb-1 p-3"
            value={businessInfo.authorized_phone_number}
            onChange={handleChange}
          />
        </div>

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

        <div className="w-full">
          <button
            type="button"
            onClick={clearSignature}
            id="clearSignature"
            className="cursor-pointer bg-cubred border rounded-md px-2 w-5/12 mt-1 text-white hover:bg-cubblue"
          >
            Clear Signature
          </button>

          <div className="mt-3 flex gap-x-3">
            <button
              type="backButton"
              id="newVendorSubmit"
              onClick={handleBackClick}
              className="cursor-pointer bg-cubred hover:bg-cubblue border text-white px-4 py-3 rounded-lg font-medium w-full rounded-md"
            >
              Back
            </button>

            <button
              type="submit"
              id="nextButton"
              className="cursor-pointer bg-cubred hover:bg-cubblue border text-white px-4 py-3 rounded-lg font-medium w-full rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  businessInfo: state.businessInfo,
});

const mapDispatchToProps = (dispatch) => ({
  updateBusinessInfo: (data) => dispatch(updateBusinessInfo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessInfo);
