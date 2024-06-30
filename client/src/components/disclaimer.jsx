import { useNavigate } from "react-router-dom";

const Disclaimer = () => {
  const navigate = useNavigate();



  const handleAgree = async (event) => {
    event.preventDefault();
    // Update the disclaimer_agreement property to true

    // Call updateDisclaimerInfo with the updated object

    navigate("/vendor/review-info");
  };

  const handleDisagree = async (event) => {
    event.preventDefault();
    alert("Please agree to above disclaimer to continue.")
  };




  return (
    <div className=" top-0 bg-cubblue w-full pt-24 bg-opacity-50 py-4 absolute top-0 bottom-0 flex flex-col justify-start lg:justify-center lg:pt-0 items-center">

        <div className="text-center w-[280px] lg:w-[310px] ">
          <h2 className="text-3xl lg:text-4xl  drop-shadow-lg text-white font-bold">
            Disclaimer
          </h2>
          <p className="text-white  lg:text-xl font-bold">
            To continue the vendor must read and agree to the disclaimer.
          </p>
        </div>

        <div className="mt-2 mx-auto max-w-[300px] mb:max-w-[500px] md:max-w-[600px]">
          <p className="text-center text-white mx-4 md:leading-relaxed md:text-lg px-2">
            Except in limited situations, the Company*** is not eligible for any
            state sales tax exemptions, and as such, expects its vendors and
            suppliers to charge it the appropriate local sales tax on taxable
            transactions. The Company expects sales tax to be collected based on
            where the goods are shipped. In addition, the Company expects its
            vendors and suppliers to charge it any other applicable local taxes;
            i.e. lease tax. Please confirm that you are able to collect the
            appropriate taxes from the Company under the applicable
            jurisdiction's tax rules. If you are unable to collect the
            appropriate taxes, please let us know so we can set up our processes
            to report the required taxes.
          </p>

          <p className="font-bold my-2 md:leading-relaxed text-center max-w-[280px] mb:max-w-[400px] md:max-w-[500px] mx-auto text-white mx-4 sm:px-10 md:px-9 md:text-lg">
            The above-named vendor is able to, and will, charge appropriate
            local and state sales and other taxes on its invoices:
          </p>

          <div className="text-white mx-5 mt-5 font-bold flex gap-x-5 justify-center sm:gap-x-10">
            <button
              className="bg-cubred py-2 px-6 w-[100px]  bg-cubred  border text-white px-4 py-3 rounded-md  hover:bg-cubblue rounded-md border   rounded-md"
              onClick={handleAgree}
              id="agreeButton"
            >
              Agree
            </button>
            <button
              className="bg-cubred p-2  w-[100px] bg-cubred  border text-white px-4 py-3 rounded-md  hover:bg-cubblue rounded-md border   rounded-md"
              onClick={handleDisagree}
              id="disagreeButton"
            >
              Disagree
            </button>
          </div>
        </div>
      </div>
  );

}


export default Disclaimer;
