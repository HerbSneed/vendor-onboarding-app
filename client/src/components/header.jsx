import CubsRedLogo from '../assets/images/CubsProductions_PrimaryLogo_v2.webp';


import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = CubsRedLogo;
    document.head.appendChild(link);

    // Cleanup function to remove the link when component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <header
        id="main"
        className="sticky z-50 flex justify-center items-center top-0 bg-cubblue h-16 md:h-20 w-full mx-auto"
      >
        <a href="/">
          <img
            src={CubsRedLogo}
            alt="cubs red logo"
            className="mx-auto w-[150px] md:w-[175px]"
          />
        </a>
      </header>
    </>
  );
};

export default Header;

