import { useEffect } from "react";
import "./style.scss";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

export const ServicesCarousel = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".carousel-item");
    const totalSections = sections.length;

    // Настройка ScrollTrigger
    ScrollTrigger.create({
      trigger: ".carousel-container",
      pin: true,
      scrub: 1,
      snap: 1 / (totalSections - 1), // Прокрутка будет "щелкать" на каждую секцию
      end: `+=${totalSections * 100}vh` // Длина прокрутки
    });

    // Анимация секций
    gsap.to(sections, {
      yPercent: -100 * (totalSections - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".carousel-container",
        start: "top top",
        end: `+=${totalSections * 100}vh`,
        scrub: true,
        pin: true,
      }
    });
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-item">Блок 1</div>
      <div className="carousel-item">Блок 2</div>
      <div className="carousel-item">Блок 3</div>
      <div className="carousel-item">Блок 4</div>
      <div className="carousel-item">Блок 5</div>
    </div>
  );
}