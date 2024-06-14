import { useNavigate } from "react-router-dom";
import { lazy } from "react";

const Welcome = lazy(() => import("../components/welcome"));

const Landing = () => {
  const navigate = useNavigate();

  const handleNewVendorClick = () => {
    navigate("/vendor/new-vendor");
  };

  return (
    <div className="flex justify-center items-center">
      <Welcome onNewVendorClick={handleNewVendorClick} />
    </div>
  );
};

export default Landing;
