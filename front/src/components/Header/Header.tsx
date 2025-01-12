import { gsap } from "gsap";
import { useContext, useRef, useState } from "react";
import "./style.scss";
import liveLogoLettersGif from "../../assets/live-logo-letters.gif";
import { useNavigate } from "react-router";
import { LanguageContext } from "../../App";
import { literalContent } from "../../constants";

type Props = {
  onOpenModal: () => void;
  handleSwitchLanguage: () => void;
}

export const Header = (props: Props) => {
  const { onOpenModal, handleSwitchLanguage } = props;

  const language = useContext(LanguageContext);

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
          {/*<video width="9%" autoPlay loop muted>*/}
          {/*  <source src={liveLogoEye} type="video/webm" />*/}
          {/*  Ваш браузер не поддерживает видео.*/}
          {/*</video>*/}
          <img className="logo-letters" width="50%" src={liveLogoLettersGif} alt="" />
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
        <div className="lang-choice" onClick={onChangeLanguage}>RU / ENG</div>
        <ul>
          <li onClick={handleClickMenuItem}>
            <a href="/front/public">
              {literalContent.main[language]?.toLowerCase()}
            </a>
          </li>
          <li onClick={handleClickMenuItem}>
            <a href="#projects">{literalContent.portfolio[language]?.toLowerCase()}</a>
          </li>
          <li onClick={handleClickMenuItem}>
            <a href="#services">{literalContent.services[language]?.toLowerCase()}</a>
          </li>
        </ul>
        <button onClick={onOpenModal}>{literalContent.contactUs[language]?.toLowerCase()}</button>
      </div>
    </div>
  );
};
