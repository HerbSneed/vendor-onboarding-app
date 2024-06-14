import "./App.css";
import Header from "./components/header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-custom-bg bg-cover bg-left-center lg:bg-center bg-fixed bg-no-repeat min-h-screen  grid grid-cols-1 min-w-screen">
      <Header />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
