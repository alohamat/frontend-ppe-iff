import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import QuickLinks from "./QuickLinks";
import Img from "./LinkImg";

import ExitImg from "../assets/exit.png"
import UserImg from "../assets/user.png"

function Footer() {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return(
        <div className="flex items-center fixed bottom-0 pt-1 w-full bg-green-700 text-white justify-between">
            <QuickLinks />
        { isAuthenticated && (
            <div className="flex items-center">
                <span className="hover:cursor-pointer flex items-center" onClick={logout}>
                    <Img src={ExitImg} alt="Sair" size="small" />   
                    <p className="font-bold mr-5">Sair</p>
                </span>
                <span className="hover:cursor-pointer flex items-center" onClick={() => {navigate("/about")}}>
                    <Img src={UserImg} alt="Sobre" size="small" />
                    <p className="font-bold">Sobre nós</p>
                </span>
            </div>
            )}
        </div>
    );
}

export default Footer;