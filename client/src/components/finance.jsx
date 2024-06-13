
const financeLogin = () => {
  return(
    <section id="main" className="py-3 lg:py-6 px-2 md:px-4 sm:px-3 lg:px-8 min-h-screen">

      <div className="border-4 rounded-2xl border-cubblue overflow-hidden">

        <div
        className="bg-cubblue -mt-1 landscape:h-[150px]  sm:h-[16%] h-[150px] w-[100.5%] rounded-t-xl">
        </div>

        <form id="financeForm" method="POST" action="/api/finance">
          <div className="bg-white bg-opacity-70  rounded-b-xl px-2 py-2">

            <div id="finance_info" className="bg-cubblue border-2 rounded-xl shadow-lg border-cubred p-3 w-full h-1/4 lg:w-1/2 xl:w-1/2 lg:flex-auto">

              <div>
                <label hmtlFor="finance_name" className="text-white">Name</label>
                <input type="text" name="finace_name" id="finance_name" placeholder="first & last name"
                className="bg-white w-5/12 my-2 p-3 mr-2" value="">
              </div>

              <div>
              <label for="finance_email" className="text-white">Finance Email</label>
              <input type="text" email="finance_email" id="finance_email" placeholder="Finance email to recieve vendor info" className="bg-white my-2 w-5/12 p-3" value="">
              </div>

              <div>
              <label for="document_password" className="text-white">Document Password</label>
              <input type="password" name="docuemtn_password" id="document_password" placeholder="Document Password"
              className="bg-white w-5/12 my-2 p-3 mr-2" value="">
              </div>

              <div className="py-2 signup">
              <button type="submit" id="newFinanceSubmit"
                className="hover:bg-cubred bg-cubblue border-cubred border-2 text-white px-4 py-3 rounded-xl font-medium w-full">Submit</button>
              </div>
            </div>
        </form>
      </div>
    </section>
  );
};

export default financeLogin;