import { gsap } from "gsap";
import { useRef, useState } from "react";
import "./style.scss";
import liveLogoLetters from "@/assets/live-logo-letters.webm";
import liveLogoLettersGif from "@/assets/live-logo-letters.gif";
import liveLogoEye from "@/assets/live-logo-eye.webm";
import { useNavigate } from "react-router";

type Props = {
  onOpenModal: () => void;
}

export const Header = (props: Props) => {
  const { onOpenModal } = props;

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

  return (
    <div className="header-container">
      <div className={`header ${menuOpen ? "menu-open" : ""}`}>
        <div className="header-left" onClick={() => navigate("/")}>
          <video width="12%" autoPlay loop muted>
            <source src={liveLogoEye} type="video/webm" />
            Ваш браузер не поддерживает видео.
          </video>
          <img className="logo-letters" width="60%" src={liveLogoLettersGif} alt="" />
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
        <div className="lang-choice">RU / ENG</div>
        <ul>
          <li onClick={handleClickMenuItem}>
            <a href="/">
              главная
            </a>
          </li>
          <li onClick={handleClickMenuItem}><a href="#projects">портфолио</a></li>
          <li onClick={handleClickMenuItem}><a href="#services">услуги</a></li>
        </ul>
        <button onClick={onOpenModal}>связаться с нами</button>
      </div>
    </div>
  );
};
