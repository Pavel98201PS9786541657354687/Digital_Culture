import { gsap } from "gsap";
import { useRef, useState } from "react";
import "./style.scss";
import { useGSAP } from "@gsap/react";
import liveLogoLetters from "@/assets/live-logo-letters.webm";
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

  return (
    <div className="header-container">
      <div className={`header ${menuOpen ? "menu-open" : ""}`}>
        <div className="header-left" onClick={() => navigate("/")}>
            <video width="12%" autoPlay loop muted>
              <source src={liveLogoEye} type="video/webm" />
              Ваш браузер не поддерживает видео.
            </video>
            <video className="logo-letters" width="60%" autoPlay loop muted>
              <source src={liveLogoLetters} type="video/webm" />
              Ваш браузер не поддерживает видео.
            </video>
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
          <li>главная</li>
          <li>портфолио</li>
          <li>услуги</li>
          <li id="about-menu-item">о нас</li>
        </ul>
        <button onClick={onOpenModal}>связаться с нами</button>
      </div>
    </div>
  );
};
