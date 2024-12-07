import { gsap } from "gsap";
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import "./style.scss";
import { toArray } from "gsap/gsap-core";
import { Header, ServicesCarousel } from "./components";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, ScrollTrigger);

const MainPage = () => {
    useEffect(() => {
        const tiles = toArray('.tile');

        ScrollTrigger.create({
            trigger: '#portfolio-grid',
            start: "top top",
            onEnter: () => {
                gsap.to("#portfolio-grid", { opacity: 1, duration: 0.5 }); // Появление грида
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
          <Header />
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
          <div id="portfolio-grid" className="grid">
              {Array.from({ length: 5 }).map((_, index) => {
                  const isDouble = Math.random() < 0.4;
                  const doubleIndex = isDouble && Math.floor(Math.random() * 2);
                  console.log(doubleIndex);

                  return (
                    <>
                        <div
                          key={index * 3}
                          className={`tile ${doubleIndex === 0 ? "double" : ""}`}
                        >
                            {index * 3}
                        </div>
                        <div
                          key={index * 3 + 1}
                          className={`tile ${doubleIndex === 1 ? "double" : ""}`}
                        >
                            {index * 3 + 1}
                        </div>
                        {!doubleIndex && (
                          <div
                            key={index * 3 + 2}
                            className="tile"
                          >
                              {index * 3 + 2}
                          </div>
                        )}
                    </>
                  )
              })}
          </div>
          <ServicesCarousel />
      </div>
    )
}

export default MainPage;