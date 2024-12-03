import { gsap } from "gsap";
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import eyeLogo from "../../assets/eyeLogo.png";
import eyeLogoFrame from "../../assets/eyeLogoFrame.png";
import "./style.scss";
import { toArray } from "gsap/gsap-core";
import { ServicesCarousel } from "./components";

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

const MainPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
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
            ease: "power3.in" // Плавность анимации
        });
    }, []);

    const handleToggleMenu = () => {
        if (menuOpen) {
            gsap.to(menuRef.current, {
                y: -600,
                opacity: 1,
                duration: 0.2,
                ease: "power2.in"
            });
        } else {
            gsap.to(menuRef.current, {
                y: 90,
                opacity: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        }
    }

    useEffect(() => {
        const tiles = toArray('.tile');

        ScrollTrigger.create({
            trigger: '.grid',
            start: 200, // Начинаем анимацию после скролла 200px
            onEnter: () => {
                gsap.to('.grid', { opacity: 1, duration: 0.5 }); // Появление грида
                tiles.forEach((tile, index) => {
                    gsap.to(tile, {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        delay: index * 0.1 // Задержка для каждого элемента
                    });
                });
            }
        });
    }, []);

    return (
      <div className="container">
          <div className="header-container">
              <div className={`header ${menuOpen ? "menu-open" : ""}`}>
                  <div className="logo-container">
                      <img className="eye-logo-frame" src={eyeLogoFrame}
                           alt="Frame" />
                      <img className="eye-logo" src={eyeLogo}
                           alt="Logo" />
                      <svg className="eye-path" width="0" height="0">
                          <path id="path" d="M 20 -6 L 29 -12" />
                      </svg>
                  </div>
                  <div id="menu-button" onClick={() => {
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
          <div className="banner">
              <div className="slogan-container">
                  <div className="slogan-big">СОЗДАЕМ</div>
                  <div className="slogan-big">3D РЕКЛАМУ</div>
                  <div className="slogan-small">
                      <div>КОТОРУЮ</div>
                      <div>ЗАПОМНЯТ</div>
                  </div>
              </div>
              <button className="banner-action-button">ЗАКАЗАТЬ РЕКЛАМУ</button>
          </div>
          <div className="grid">
              <div className="tile">1</div>
              <div className="tile">2</div>
              <div className="tile">3</div>
              <div className="tile">4</div>
              <div className="tile">5</div>
              <div className="tile">6</div>
          </div>
          <ServicesCarousel />
      </div>
    )
}

export default MainPage;