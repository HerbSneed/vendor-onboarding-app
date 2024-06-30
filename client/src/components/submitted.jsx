import Welcome from "../assets/images/WELCOME.webp";
import { useNavigate } from "react-router-dom";

const VendorSubmitted = () => {
  const navigate = useNavigate();

  const handleNewVendorClick = () => {
    
    navigate("/vendor/new-vendor");
    window.location.reload();
  };

  return (
    <>
      <div
        className="mx-auto w-screen flex flex-col items-center pb-6 bg-gradient-to-b from-cubblue to-cubblue bg-[length:100%_5%,100%_100%] bg-no-repeat justify-start lg:justify-center"
        id="submitted_background"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--tw-gradient-stops)), linear-gradient(to bottom, var(--tw-gradient-stops) 10%, transparent 100%)",
        }}
      >


        <img
          className="drop-shadow-lg max-w-[300px]  mt-20 lg:-mt-16 mb:max-w-[360px] sm:max-w-[460px] lg:max-w-[550px] mx-[20px]"
          src={Welcome}
          alt="Welcome"
        />

        <p className="drop-shadow-lg text-[16px] sm:text-lg max-w-[280px] mb:max-w-[330px] sm:max-w-[440px] lg:max-w-[525px] mx-auto  -mt-3 sm:-mt-4  leading-relaxed lg:leading-[30px]  text-center text-lg font-bold  lg:text-[20px] text-white">
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
