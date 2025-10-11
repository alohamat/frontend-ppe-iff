import { useNavigate } from "react-router-dom";
import type { JSX } from "react";

import { useAuth } from "../context/AuthContext";
import QuickLinks from "./QuickLinks";

import { ExitIcon } from "../assets/icons/Icons";
import { UserIcon } from "../assets/icons/Icons";
import { LockPersonIcon } from "../assets/icons/Icons";
import { RestaurantIcon } from "../assets/icons/Icons";

type FooterItemProps = {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
  show?: boolean; // condicionar exibicao
};

function FooterItem({ icon, label, onClick, show = true }: FooterItemProps) {
  if (!show) return null;
  return (
    <span
      className="hover:cursor-pointer flex items-center mr-3"
      onClick={onClick}
    >
      {icon}
      <p className="font-light ml-2 text-sm sm:font-bold" id="LabelFooter">{label}</p>
    </span>
  );
}

function Footer() {
  const { logout, isAuthenticated, user } = useAuth();
  const roles = user?.roles;
  const isAdmin = roles?.includes("ROLE_SER");
  const navigate = useNavigate();

  return (
    <div className="flex items-center fixed bottom-0 pt-1 w-full bg-green-700 text-white justify-between">
      <QuickLinks />
      {isAuthenticated && (
        <div className="flex items-center">
          <FooterItem icon={<LockPersonIcon />} label="Admin" show={isAdmin} onClick={() => navigate("/admin")} />
          <FooterItem icon={<RestaurantIcon />} label="Restaurante" onClick={() => navigate("/restaurante")}/>
          <FooterItem icon={<ExitIcon />} label="Sair" onClick={logout} />
          <FooterItem
            icon={<UserIcon />}
            label="Sobre nós"
            onClick={() => navigate("/about")}
          />
        </div>
      )}
    </div>
  );
}

export default Footer;