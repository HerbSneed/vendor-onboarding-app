import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Welcome = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formState, setFormState] = useState({ finance_email: "" });

    const handleSubmit = async (event) => {
      event.preventDefault();
      if(
        !formState.finance_email
      ) {
        alert("Please provide a valid email address.");
        return;
      }
      try {

        // Send data to backend"
        await axios.post("/api/finance", { finance_email: formState.finance_email });
        navigate("/vendor/new-vendor");
      } catch (err) {
        setError("There was an error submitting the form. Please try again.");
        console.error("Form submission error:", err);
      }
    };

    const handleChange = (event) => {
      setFormState({ ...formState, [event.target.id]: event.target.value });
    };

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <form
        onSubmit={handleSubmit}
        id="financeForm"
        method="POST"
        className="text-center border mt-20 lg:mt-0 rounded-lg bg-gray-100    max-w-[500px] max-h-[250px] mx-[10px] px-2 py-1 bg-opacity-70"
      >
        <h1 className="font-bold text-2xl text-cubblue text-center">
          Welcome to the Vendor Onboarding App!
        </h1>
        <p>
          This application is for demonstration purposes only. To begin, provide
          the email address where you would like to receive vendor information
          below.
        </p>

        <input
          type="text"
          id="finance_email"
          placeholder="Email Address"
          className="bg-white my-2 p-3 w-full text-black text-center"
          value={formState.finance_email}
          onChange={handleChange}
        />

        <div className="py-2 signup">
          <button
            type="submit"
            id="newFinanceSubmit"
            className="hover:bg-cubred bg-cubblue border-cubred border-2 text-white px-4 py-3 rounded font-medium w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Welcome;
