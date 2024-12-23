import "./style.scss";
import { gsap } from "gsap";
import { toArray } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

type Props = {
  blocks: any[];
  openModal: () => void;
}

export const ServicesCarousel = (props: Props) => {
  const { blocks = [], openModal } = props;

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
        scrub: 2,
        snap: {
          snapTo: 1 / (panels.length - 1),
          inertia: false,
          duration: {min: 0.1, max: 0.1}
        },
        end: () =>  "+=" + (panelsContainer?.offsetWidth - innerWidth),
      },
    });
  }, [blocks]);

  return (
    <div id="page" className="site">
      <section id="panels" style={{ overflow: "hidden" }}>
        <div id="panels-container" style={{ width: `${blocks?.length * 100}%` }}>
          {blocks.map((tileContent, index) => (
            <div
              key={index}
              id={`panel-${index + 1}`}
              className="panel full-screen gradient-green">
              <div className="service-tile">
                <div className="service-tile--title">{tileContent.title}:</div>
                <div className="service-tile--description">{tileContent.description}</div>
                <button className="service-tile--action" onClick={openModal}>ЗАКАЗАТЬ</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
