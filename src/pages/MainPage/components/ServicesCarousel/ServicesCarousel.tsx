import "./style.scss";
import { gsap } from "gsap";
import { toArray } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

export const ServicesCarousel = () => {
  useGSAP(() => {
    const panelsContainer = document.getElementById("panels-container");
    const panels = toArray("#panels-container .panel");

    gsap.to(panels, {
      xPercent: -100 * ( panels.length - 1 ),
      ease: "none",
      scrollTrigger: {
        trigger: "#panels-container",
        pin: true,
        start: "top top",
        scrub: 1,
        snap: {
          snapTo: 1 / (panels.length - 1),
          inertia: false,
          duration: {min: 0.1, max: 0.1}
        },
        end: () =>  "+=" + (panelsContainer?.offsetWidth - innerWidth),
        onEnter: () => {
          console.log("Element entered the viewport!");
        },
      },
    });
  })

  return (
    <div id="page" className="site">
      <section id="panels" style={{ overflow: "hidden" }}>
        <div id="panels-container" style={{ width: "500%" }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <article key={index} id={`panel-${index + 1}`} className="panel full-screen gradient-green">
              <h2>Panel {index + 1}</h2>
            </article>
          ))}
        </div>
      </section>
      <section id="map" className="full-screen"></section>
    </div>
);
};
