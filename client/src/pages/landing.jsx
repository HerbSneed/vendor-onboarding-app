import { useNavigate } from "react-router-dom";
import { lazy } from "react";
const Welcome = lazy(() =>  import("../components/welcome"));


const Landing = () => {
  const navigate = useNavigate();

  const handleNewVendorClick = () => {
    navigate('/vendor/new-vendor')

  };

  return (
    <>
      <Welcome onNewVendorClick={handleNewVendorClick} />
    </>
  );
};

export default Landing;
