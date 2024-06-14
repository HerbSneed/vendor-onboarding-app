import CubsRedLogo from "../assets/images/CubsProductions_PrimaryLogo_v2.webp";
import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = CubsRedLogo;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 flex justify-center items-center bg-cubblue h-20 md:h-20  w-full">
      <a href="/">
        <img
          src={CubsRedLogo}
          alt="Cubs Red Logo"
          className="w-[175px]"
        />
      </a>
    </header>
  );
};

export default Header;
