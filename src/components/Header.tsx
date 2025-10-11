import { useAuth } from "../context/AuthContext";
import Img from "./LinkImg";

import IFFMobile from "../assets/images/IFF-MOBILE.jpg";
import IFFPc2 from "../assets/images/IFF-PC2.jpg";

function Header() {
  const { user, isAuthenticated } = useAuth();

  return (
    // flexcol no mobile e grid no pc
    <header
      className="bg-gradient-to-b from-green-700 to-green-800
             sm:grid sm:grid-cols-3 items-center flex flex-col
             px-4 py-3 shadow-md w-full"
    >
      <div className="flex justify-start">
        <span className="block sm:hidden">
          <Img src={IFFMobile} alt="IFF" size="small" link="/main" internal={true}/>
        </span>
        <span className="hidden sm:block">
          <Img src={IFFPc2} alt="IFF" size="small" link="/main" internal={true}/>
        </span>
      </div>

      {/* meio */}
      <h1 className="text-center text-xl sm:text-2xl text-white font-bold">
        Cardápio Digital
      </h1>

      {/* direita */}
      <div className="flex justify-end items-center gap-4">
        {isAuthenticated && (
          <p className="text-white font-bold sm:text-xl">Olá, {user?.nome}!</p>
        )}
      </div>
    </header>
  );
}

export default Header;
