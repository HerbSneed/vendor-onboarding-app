import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { updateBankInfo } from "../../src/utils/redux/actions/actions";

const BankInfo = ({ bankInfo, updateBankInfo }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleBackClick = () => {
    navigate(-1);
  };


  const handleBankInfoClick = async (event) => {
    event.preventDefault();
    if (
      !bankInfo.bank_name ||
      !bankInfo.account_number ||
      !bankInfo.routing_number
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      updateBankInfo(bankInfo);
      navigate("/vendor/review-info");
    } catch (err) {
      setError("Bank information is not correct");
      console.error("Bank Info error", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateBankInfo({ [name]: value });
  };

  return (
    <div
      id="bank_info"
      className="flex flex-col items-center justify-center mx-auto "
    >
      <form
        method="POST"
        onSubmit={handleBankInfoClick}
        className="bg-cubblue border-2 border-cubred bg-opacity-80 shadow-lg rounded-xl mx-auto flex flex-col mx-[9px] max-w-[350px] my-4 gap-2 p-3 sm:w-[350px]"
      >
        <div className="text-center mx-2">
          <h2 className="text-3xl drop-shadow-lg text-white font-bold">
            Banking Information
          </h2>
          <p className="text-white font-bold">
            Here you'll provide the vendor's banking information.
          </p>
        </div>

        <div className="flex flex-col w-full lg:w-full">
          <label htmlFor="bank_name" className="text-white">
            Bank Name
          </label>
          <input
            type="text"
            name="bank_name"
            id="bank_name"
            placeholder="Bank Name"
            className="bg-white mb-3 p-3"
            value={bankInfo.bank_name}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col w-full lg:w-full">
          <label htmlFor="account_number" className="text-white">
            Account Number
          </label>
          <input
            type="number"
            name="account_number"
            id="account_number"
            placeholder="Account Number"
            className="bg-white mb-3 p-3 w-full sm:w-full"
            value={bankInfo.account_number}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col w-full  lg:w-full flex-auto">
          <label htmlFor="routing_number" className="text-white">
            Routing Number
          </label>
          <input
            type="text"
            name="routing_number"
            id="routing_number"
            placeholder="Routing Number"
            className="bg-white mb-3 p-3"
            value={bankInfo.routing_number}
            onChange={handleChange}
          />
        </div>

        <div className="mt-3 flex gap-x-3">
          <button
            type="button"
            id="backButton"
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
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bankInfo: state.bankInfo,
});

const mapDispatchToProps = (dispatch) => ({
  updateBankInfo: (data) => dispatch(updateBankInfo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BankInfo);

