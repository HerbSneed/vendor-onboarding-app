import "./App.css";
import Header from "./components/header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="bg-custom-bg bg-cover bg-center bg-fixed bg-no-repeat w-screen bottom-0 overflow-scroll absolute top-0 flex">
        <Outlet />
      </main>
    </>
  );
}

export default App;
