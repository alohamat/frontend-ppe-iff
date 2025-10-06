import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import QuickLinks from "./QuickLinks";
import Img from "./LinkImg";

import { ExitIcon } from "../assets/icons/Icons";
import { UserIcon } from "../assets/icons/Icons";

function Footer() {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return(
        <div className="flex items-center fixed bottom-0 pt-1 w-full bg-green-700 text-white justify-between">
            <QuickLinks />
        { isAuthenticated && (
            <div className="flex items-center">
                <span className="hover:cursor-pointer flex items-center" onClick={logout}>
                    <ExitIcon /> 
                    <p className="font-bold mr-5">Sair</p>
                </span>
                <span className="hover:cursor-pointer flex items-center mr-3" onClick={() => {navigate("/about")}}>
                    <UserIcon />
                    <p className="font-bold">Sobre nós</p>
                </span>
            </div>
            )}
        </div>
    );
}

export default Footer;