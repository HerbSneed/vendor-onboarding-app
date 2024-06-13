import Welcome from "../assets/images/WELCOME.webp"

const VendorSubmitted = () => {

  return (
    <>
      <div className="absolute bg-cubblue  top-0 h-screen bg-opacity-50 w-full">
        <div className="flex mt-[45px] sm:mt-[65px] flex-col w-screen md:w-[610px] lg:w-[700px] justify-center  mx-auto">
          <img
            className=" drop-shadow-lg  w-[350px] sm:w-[500px] lg:w-[650px]  mx-auto"
            src={Welcome}
          />

          <p className="drop-shadow-lg text-sm sm:text-lg w-[325px] sm:w-[580px] md:w-[500px] lg:w-[620px] mx-auto sm:px-16 md:px-3 -mt-3 sm:-mt-4 md:-mt-5 lg:-mt-8 leading-relaxed md:leading-normal text-center text-lg md:text-xl lg:text-2xl text-white">
            Thank you for submitting your form. We will reach out if additional
            information is needed. To submit another vendor form, click the
            button below. Otherwise, you may close this window.
          </p>

          <a
            id="newVendor"
            className="text-center mt-5 px-3 py-2 font-bold bg-cubred hover:bg-cubblue rounded-md text-white cursor-pointer mt-3 mx-auto border"
            href="/vendor/new-vendor"
          >
            New Vendor
          </a>
        </div>
      </div>
    </>
  );
};

export default VendorSubmitted;



