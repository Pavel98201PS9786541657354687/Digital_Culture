import { Header } from "@/pages/MainPage/components";
import "./style.scss";

export const ProjectPage = () => {
  const videoData = "BACKTOSCHOOL.mp4";

  return (
    <div className="project-page--container">
      <Header />
      <div className="project-page--content">
        <div className="title">
          Приглашение на вечеринку Kultura
          <br />
          16 марта
        </div>
        <div className="project-page--container__main-video">
          <video autoPlay muted loop>
            <source src={`src/assets/video/${videoData}`} type="video/mp4" />
            Не удалось воспроизвести видео
          </video>
        </div>
        <div className="description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </div>
    </div>
  );
};
