import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { gsap } from "gsap";

import liveLogoEyeGif from "../../assets/live-logo-eye.gif";
import liveLogoLettersGif from "../../assets/live-logo-letters.gif";
import { literalContent } from "../../constants";

import "./style.scss";

type Props = {
  onOpenModal: () => void;
  handleSwitchLanguage: () => void;
  language: "ru" | "eng";
};

export const Header = (props: Props) => {
  const { onOpenModal, handleSwitchLanguage, language } = props;

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    if (menuOpen) {
      gsap.to(menuRef.current, {
        y: -600,
        opacity: 1,
        duration: 0.2,
        ease: "power2.in",
      });
    } else {
      gsap.to(menuRef.current, {
        y: 90,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleClickMenuItem = () => {
    setMenuOpen(false);
    handleToggleMenu();
  };

  const onChangeLanguage = () => {
    handleSwitchLanguage();
    setMenuOpen(false);
    handleToggleMenu();
  };

  return (
    <div className="header-container">
      <div className={`header ${menuOpen ? "menu-open" : ""}`}>
        <div className="header-left" onClick={() => navigate("/")}>
          <img className="logo-eye" src={liveLogoEyeGif} alt="" />
          <img className="logo-letters" src={liveLogoLettersGif} alt="" />
        </div>
        <div
          id="menu-button"
          onClick={() => {
            setMenuOpen(!menuOpen);
            handleToggleMenu();
          }}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div ref={menuRef} className="menu-container">
        <div className="lang-choice" onClick={onChangeLanguage}>
          RU / ENG
        </div>
        <ul>
          <li onClick={handleClickMenuItem}>
            <a href="/">{literalContent.main[language]?.toLowerCase()}</a>
          </li>
          <li onClick={handleClickMenuItem}>
            <a href="#projects">
              {literalContent.portfolio[language]?.toLowerCase()}
            </a>
          </li>
          <li onClick={handleClickMenuItem}>
            <a href="#services">
              {literalContent.services[language]?.toLowerCase()}
            </a>
          </li>
        </ul>
        <button onClick={onOpenModal}>
          {literalContent.contactUs[language]?.toLowerCase()}
        </button>
      </div>
    </div>
  );
};
