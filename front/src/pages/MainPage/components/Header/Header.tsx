import eyeLogoFrame from "@/assets/eyeLogoFrame.png";
import eyeLogo from "@/assets/eyeLogo.png";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import "./style.scss";
import { useGSAP } from "@gsap/react";
import kulturaLogo from "@/assets/kultura.png";
import headerLogo from "@/assets/header-logo.gif";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  useGSAP(() => {
    gsap.to(".eye-logo", {
      duration: 1,
      motionPath: {
        path: "#path",
        align: "#path",
        alignOrigin: [0.5, 0.6],
      },
      repeat: -1,
      yoyo: true, // Цикличность анимации
      repeatDelay: 1.5, // Задержка перед следующим повторением
      ease: "power3.in", // Плавность анимации
    });
  });

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
  
  const img = new Image();
  img.src = eyeLogo;

  return (
    <div className="header-container">
      <div className={`header ${menuOpen ? "menu-open" : ""}`}>
        <div className="header-left">
          <div className="animated-logo" style={{ height: 70, overflow: "hidden", display: "flex", alignItems: "center", marginTop: -20 }}>
            <img src={headerLogo} alt="" height={170} />
          </div>
          {/*<div className="logo-container">*/}
          {/*  <img className="eye-logo-frame" src={eyeLogoFrame} alt="Frame" />*/}
          {/*  <img className="eye-logo" src={eyeLogo} alt="Logo" />*/}
          {/*  <svg className="eye-path" width="0" height="0">*/}
          {/*    <path id="path" d="M 20 -6 L 29 -12" />*/}
          {/*  </svg>*/}
          {/*</div>*/}
          {/*<div className="logo-container--literal">*/}
          {/*  <div className="letters-digital-container">*/}
          {/*    {Array.from("DIGITAL").map((letter, index) => (*/}
          {/*      <span*/}
          {/*        key={index}*/}
          {/*        className="letter"*/}
          {/*        style={{ display: "inline-block" }}>*/}
          {/*        {letter}*/}
          {/*      </span>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*  <img id="kultura-logo" src={kulturaLogo} alt="Kultura Logo" />*/}
          {/*</div>*/}
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
        <button>связаться с нами</button>
      </div>
    </div>
  );
};
