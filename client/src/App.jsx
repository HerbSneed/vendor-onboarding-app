import "./App.css";
import Header from "./components/header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen  bg-custom-bg bg-cover bg-left-center lg:bg-center bg-fixed bg-no-repeat bg-cover lg:bg-cover">
      <Header />
      <main className="flex-grow flex items-center">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
