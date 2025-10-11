import { useAuth } from "../context/AuthContext";
import Img from "./LinkImg";

import IFFMobile from "../assets/images/iffcol.png";
import IFF from "../assets/images/iff.png"

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
          <Img src={IFFMobile} alt="IFF" size="medium" link="/main" internal={true}/>
        </span>
        <span className="hidden sm:flex items-center gap-4">
          <Img src={IFF} alt="IFF" size="small" link="/main" internal={true}>
          <section className="text-white">
            <h1 className="font-bold">Instituto Federal Fluminense</h1>
            <p>Campus Quissamã</p>
          </section>
          </Img>
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
