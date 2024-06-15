import Welcome from "../assets/images/WELCOME.webp";
import { useNavigate } from "react-router-dom";

const VendorSubmitted = () => {
  const navigate = useNavigate();

  const handleNewVendorClick = () => {
    console.log("New Vendor button clicked");
    navigate("/vendor/new-vendor");
  };

  return (
    <>
      <div
        className="mx-auto w-full flex flex-col pb-6 bg-gradient-to-b from-cubblue to-cubblue bg-[length:100%_5%,100%_100%] bg-no-repeat"
        id="submitted_background"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--tw-gradient-stops)), linear-gradient(to bottom, var(--tw-gradient-stops) 10%, transparent 100%)"
        }}
      >
        <div className="bg-cubblue p-10 w-full flex flex-col pb-6"></div>

        <img
          className="drop-shadow-lg w-[350px] sm:w-[500px] md:w-[550px] lg:w-[650px] mx-auto"
          src={Welcome}
          alt="Welcome"
        />

        <p className="drop-shadow-lg text-sm sm:text-lg w-[325px] sm:w-[580px] md:w-[500px] lg:w-[550px] mx-auto sm:px-16 md:px-3 -mt-3 sm:-mt-4 md:-mt-5 lg:-mt-8 leading-relaxed md:leading-normal text-center text-lg md:text-xl lg:text-2xl text-white">
          Thank you for submitting your form. We will reach out if additional
          information is needed. To submit another vendor form, click the button
          below. Otherwise, you may close this window.
        </p>

        <button
          id="newVendor"
          className="mt-5 px-3 py-2 font-bold bg-cubred hover:bg-cubblue rounded-md text-white cursor-pointer mt-3 mx-auto border"
          onClick={handleNewVendorClick}
        >
          New Vendor
        </button>
      </div>
    </>
  );
};

export default VendorSubmitted;
