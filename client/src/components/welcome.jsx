
const welcome = ({ onNewVendorClick }) => {
  return (
    <div className="flex flex-col mt-[200px] sm:mt-[250px] mx-auto">
      <div className="mx-auto text-center rounded-lg bg-gray-100 w-[350px] px-2 py-8 bg-opacity-70 gap-y-5">
        <h1 className="font-bold text-2xl text-cubblue text-center">
          Welcome to the Cubs Vendor Sign up app!
        </h1>
        <button
          className="bg-cubred hover:bg-cubblue mt-2 text-white font-semibold py-2 px-5 text-center rounded-md border"
          onClick={onNewVendorClick}
        >
          New Vendor
        </button>
      </div>
    </div>
  );
}

export default welcome;
