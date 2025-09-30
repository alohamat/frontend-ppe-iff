import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="bg-green-700 flex min-h-[60px] items-center">
      <img src="src/assets/IFF-PC2.jpg" onClick={() => navigate("/main")} alt="IFF" className="h-[50px] rounded-4xl hidden sm:block ml-5 hover:cursor-pointer"/>
      <img src="src/assets/IFF-MOBILE.jpg" alt="IFF" onClick={() => navigate("/main")} className="h-[50px] rounded-4xl block sm:hidden ml-5"/>
      <h1 className="ml-5 text-3xl text-white font-bold sm:ml-45">Cardápio Digital</h1>
      {isAuthenticated &&
       <h1>
        Olá, {user?.nome}!  
      </h1>
        }
    </header>
  );
}

export default Header;