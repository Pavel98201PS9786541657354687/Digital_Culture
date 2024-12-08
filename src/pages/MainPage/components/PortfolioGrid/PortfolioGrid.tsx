import { useGSAP } from "@gsap/react";
import { toArray } from "gsap/gsap-core";
import { gsap } from "gsap";
import "./style.scss";

export const PortfolioGrid = () => {
  useGSAP(() => {
    const portfolioGrid = document.getElementById("portfolio-grid");
    const tiles = toArray(".tile");

    // gsap.to(portfolioGrid, {
    //   scrollTrigger: {
    //     trigger: "#portfolio-grid",
    //     start: "top bottom",
    //     onEnter: () => {
    //       console.log("Grid entered the viewport!");
    //       gsap.to("#portfolio-grid", { opacity: 1, duration: 0.5 }); // Появление грида
    //       tiles.forEach((tile, index) => {
    //         gsap.to(tile, {
    //           y: 0,
    //           opacity: 1,
    //           duration: 0.5,
    //           delay: index * 0.1, // Задержка для каждого элемента
    //         });
    //       });
    //     },
    //   }
    // });

    // TODO: можно сделать не грид, а каждую строку отдельным блоком и на каждый такой блок анимацию при скролле до него!
    tiles.forEach((tile, index) => {
      gsap.to(tile, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: index * 0.1,
        scrollTrigger: {
          start: "top bottom",
        }
      });
    });
  });

  return (
    <div id="portfolio-grid" className="grid">
      {Array.from({ length: 5 }).map((_, index) => {
        const isDouble = Math.random() < 0.4;
        const doubleIndex = isDouble && Math.floor(Math.random() * 2);

        return (
          <>
            <div
              key={index * 3}
              className={`tile ${doubleIndex === 0 ? "double" : ""}`}>
              {index * 3}
            </div>
            <div
              key={index * 3 + 1}
              className={`tile ${doubleIndex === 1 ? "double" : ""}`}>
              {index * 3 + 1}
            </div>
            {!doubleIndex && (
              <div key={index * 3 + 2} className="tile">
                {index * 3 + 2}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
