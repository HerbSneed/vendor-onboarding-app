import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { updateDisclaimerInfo } from "../utils/redux/actions/actions";

const Disclaimer = ({ disclaimerInfo, updateDisclaimerInfo }) => {
  const navigate = useNavigate();



  const handleAgree = async (event) => {
    event.preventDefault();
    // Update the disclaimer_agreement property to true
    const updatedDisclaimerInfo = {
      ...disclaimerInfo,
      disclaimer_agreement: "Agreed",
    };
    // Call updateDisclaimerInfo with the updated object
    updateDisclaimerInfo(updatedDisclaimerInfo);
    navigate("/vendor/business-info");
  };

  const handleDisagree = async (event) => {
    event.preventDefault();
    alert("Please agree to above disclaimer to continue.")
  };




  return (
    <div className=" top-0 bg-cubblue w-full bg-opacity-50 py-4  h-screen flex flex-col justify-start items-center">
      <div className=" px-[6px] text-center sm:w-[700px] lg:w-[800px]">
        <div className="text-center w-[300px]  sm:text-lg mx-auto ">
          <h2 className="text-3xl  drop-shadow-lg text-white font-bold">
            Disclaimer
          </h2>
          <p className="text-white font-bold">
            To continue the vendor must read and agree to the disclaimer.
          </p>
        </div>

        <div className="mt-2 mx-auto sm:w-10/12">
          <p className="text-center text-white mx-4 md:leading-relaxed md:text-lg">
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

          <p className="font-bold my-2 md:leading-relaxed text-center text-white mx-4 sm:px-10 md:px-9 md:text-lg">
            The above-named vendor is able to, and will, charge appropriate
            local and state sales and other taxes on its invoices:
          </p>

          <div className="text-white mx-5 mt-5 font-bold flex justify-between sm:justify-center sm:gap-x-10">
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  disclaimerInfo: state.disclaimerInfo,
});

const mapDispatchToProps = (dispatch) => ({
  updateDisclaimerInfo: (data) => dispatch(updateDisclaimerInfo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Disclaimer);
