import "./style.scss";
import { gsap } from "gsap";
import { toArray } from "gsap/gsap-core";

export const ServicesCarousel = () => {
  /* Panels */
  const panelsContainer = document.getElementById("panels-container");
  const panels = toArray("#panels-container .panel");

  gsap.to(panels, {
    xPercent: -100 * ( panels.length - 1 ),
    ease: "none",
    scrollTrigger: {
      trigger: "#panels-container",
      start: "top top",
      scrub: 1,
      snap: {
        snapTo: 1 / (panels.length - 1),
        inertia: false,
        duration: {min: 0.1, max: 0.1}
      },
      end: () =>  "+=" + (panelsContainer?.offsetWidth - innerWidth)
    }
  });

  return (
    <div id="page" className="site">

        <section id="panels">

          <div id="panels-container" style={{ width: "500%" }}>
            <article id="panel-1" className="panel full-screen gradient-green">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <img src="" alt="" />
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <h2>Panel 1</h2>
                    <div className="panels-navigation text-right">
                      <div className="nav-panel" data-sign="plus"><a href="#panel-2" className="anchor">Next</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article id="panel-2" className="panel full-screen gradient-blue">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <img src="" alt="" />
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <h2>Panel 2</h2>
                    <div className="panels-navigation">
                      <div className="nav-panel" data-sign="minus"><a href="#panel-1" className="anchor">Prev</a></div>
                      <div className="nav-panel" data-sign="plus"><a href="#panel-3" className="anchor">Next</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article id="panel-3" className="panel full-screen gradient-green">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <img src="" alt="" />
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <h2>Panel 3</h2>
                    <div className="panels-navigation">
                      <div className="nav-panel" data-sign="minus"><a href="#panel-2" className="anchor">Prev</a></div>
                      <div className="nav-panel" data-sign="plus"><a href="#panel-4" className="anchor">Next</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article id="panel-4" className="panel full-screen gradient-blue">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <img src="" alt="" />
                  </div>
                  <div className="col-6 d-flex flex-column">

                    <h2>Panel 4</h2>

                    <div className="panels-navigation">
                      <div className="nav-panel" data-sign="minus"><a href="#panel-3" className="anchor">Prev</a></div>
                      <div className="nav-panel" data-sign="plus"><a href="#panel-5" className="anchor">Next</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article id="panel-5" className="panel full-screen gradient-green">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <img src="" alt="" />
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <h2>Panel 5</h2>
                    <div className="panels-navigation text-right">
                      <div className="nav-panel" data-sign="minus"><a href="#panel-4" className="anchor">Prev</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="map" className="full-screen gradient-orange"></section>
    </div>
  );
};
