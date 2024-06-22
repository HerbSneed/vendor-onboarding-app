import "./App.css";
import Header from "./components/header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="bg-custom-bg bg-cover bg-center bg-fixed  bg-no-repeat flex flex-col justify-center items-center">
        <Outlet />
      </main>
    </>
  );
}

export default App;
