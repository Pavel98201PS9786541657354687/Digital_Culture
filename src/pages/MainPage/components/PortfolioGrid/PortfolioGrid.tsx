import { useGSAP } from "@gsap/react";
import { toArray } from "gsap/gsap-core";
import { gsap } from "gsap";
import "./style.scss";
import { videoPaths } from "@/pages/MainPage/components/PortfolioGrid/constants";
import { chunkArrayRandomSize } from "@/pages/MainPage/components/PortfolioGrid/utils";

export const PortfolioGrid = () => {
  useGSAP(() => {
    const lines = document.querySelectorAll(".portfolio-line");

    lines.forEach((line) => {
      const tiles = line.querySelectorAll(".tile");

      gsap.fromTo(
        tiles,
        {
          y: 500,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power1.out",
          stagger: 0.2, // Задержка между анимациями
          scrollTrigger: {
            trigger: line,
            start: "top+=100 bottom", // Начинается, когда верхняя часть линии достигает нижней части видимой области
            once: true,
            onEnter: () => {
              console.log("onEnter");
            },
          },
        },
      );
    });
  });

  const lineGroups = chunkArrayRandomSize(videoPaths);

  return (
    <div id="portfolio-section">
      {lineGroups?.map((lineGroup, index) => {
        const indexOfDoubleElement =
          lineGroup?.length === 2 ? Math.floor(Math.random() * 2) : -1;

        return (
          <div className="portfolio-line">
            {lineGroup.map((fileName, videoRowIndex) => (
              <div
                key={index}
                className={`tile ${indexOfDoubleElement === videoRowIndex ? "double" : ""} ${lineGroup?.length === 1 ? "full" : ""}`}>
                <video autoPlay muted loop>
                  <source
                    src={`src/assets/video/${fileName}`}
                    type="video/mp4"
                  />
                  Ваш браузер не поддерживает видео.
                </video>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
