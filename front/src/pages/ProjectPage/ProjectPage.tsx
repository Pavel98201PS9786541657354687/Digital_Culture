import { FileGrid, Form } from "@/pages/MainPage/components";
import "./style.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PuffLoader } from "react-spinners";
import { Modal, Footer, Header } from "../../components";
import arrowRight from "@/assets/arrow-right.svg";
import { literalContent } from "@/constants";
import { getGridChunksByFileFormats } from "../../components/FileGrid/utils";
import { appViewStore } from "../../stores/app.store";
import { useGetProjectData } from "../../hooks";
import { observer } from "mobx-react";

export const ProjectPage = observer(() => {
  const { language } = appViewStore;
  const loading = false;

  const navigate = useNavigate();

  const { data: projectData, isLoading: isProjectDataLoading } = useGetProjectData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineGroups, setLineGroups] = useState([]);
  const [filesLoadingState, setFilesLoadingState] = useState([]);

  useEffect(() => {
    if (projectData?.files?.length) {
      setFilesLoadingState(new Array(projectData?.files?.length).fill(true));
      preloadFiles(projectData?.files);
      const groups = getGridChunksByFileFormats(projectData?.files);
      setLineGroups(groups);
    }
  }, [projectData?.files]);

  const handleFileLoad = (index) => {
    setFilesLoadingState((prev) => {
      const newStates = [...prev];
      newStates[index] = false; // Устанавливаем состояние загрузки в false для загруженного видео
      return newStates;
    });
  };

  const preloadFiles = async (videos) => {
    const videoPromises = videos.map((videoData, index) => {
      return new Promise((resolve) => {
        const video = document.createElement('video');
        video.src = videoData?.fileName;
        video.onloadeddata = () => {
          handleFileLoad(index);
          resolve();
        };
        video.load();
      });
    });

    await Promise.all(videoPromises);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div className="loader">
    <PuffLoader />
  </div>;

  const title = language === "ru" ? projectData?.title : projectData?.title_en;
  const description = language === "ru" ? projectData?.description : projectData?.description_en;

  return (
    <>
      <div className="project-page">
        <div className="project-page--container">
          <Header language={language} handleSwitchLanguage={appViewStore.switchLanguage} onOpenModal={() => setIsModalOpen(true)} />
          <div className="project-page--content">
            <div className="breadcrumbs">
              <div className="breadcrumb" style={{ textDecoration: "underline" }} onClick={() => navigate("/")}>
                {literalContent.main[language]}
              </div>
              <img src={arrowRight} width={8} alt="" />
              <div className="breadcrumb">
                {literalContent.projects[language]}
              </div>
              <img src={arrowRight} width={8} alt="" />
              <div className="breadcrumb">
                {title}
              </div>
            </div>
            <div className="title">
              {title}
            </div>
            <div className="description">
              {description}
            </div>
            {loading ? <PuffLoader /> : <FileGrid lineGroups={lineGroups} />}
          </div>
        </div>
        <div className="form-wrapper">
          <h2>{literalContent.letsDiscuss[language]}</h2>
          <Form onSubmit={() => setIsModalOpen(false)} theme="dark" />
        </div>
      </div>
      <Footer language={language} handleSwitchLanguage={appViewStore.switchLanguage} />
      <Modal
        title={literalContent.weWillContactYou[language]}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <Form onSubmit={handleSubmit} />
      </Modal>
    </>
  );
});
