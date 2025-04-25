import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PuffLoader } from "react-spinners";
import { observer } from "mobx-react";

import arrowRight from "@/assets/arrow-right.svg";
import { FileGrid, Form } from "@/components";
import { literalContent } from "@/constants";

import { Footer, Header, Modal } from "../../components";
import { getGridChunksByFileFormats } from "../../components/FileGrid/utils";
import { useGetProjectData } from "../../hooks";
import { appViewStore } from "../../stores/app.store";

import "./style.scss";

export const ProjectPage = observer(() => {
  const { language } = appViewStore;
  const loading = false;

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: projectData, isLoading: isProjectDataLoading } =
    useGetProjectData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineGroups, setLineGroups] = useState([]);

  useEffect(() => {
    if (projectData?.files?.length) {
      const groups = getGridChunksByFileFormats(projectData?.files);
      setLineGroups(groups);
    }
  }, [projectData?.files]);

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  if (loading)
    return (
      <div className="loader">
        <PuffLoader />
      </div>
    );

  const title = language === "ru" ? projectData?.title : projectData?.title_en;
  const description =
    language === "ru" ? projectData?.description : projectData?.description_en;

  return (
    <>
      <div className="project-page">
        <div className="project-page--container">
          <Header
            language={language}
            handleSwitchLanguage={appViewStore.switchLanguage}
            onOpenModal={() => setIsModalOpen(true)}
          />
          {isProjectDataLoading ? (
            <div className="loader-container">
              <PuffLoader />
            </div>
          ) : (
            <div className="project-page--content">
              <div className="breadcrumbs">
                <div
                  className="breadcrumb"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => navigate("/")}>
                  {literalContent.main[language]}
                </div>
                <img src={arrowRight} width={8} alt="" />
                <div className="breadcrumb">
                  {literalContent.projects[language]}
                </div>
                <img src={arrowRight} width={8} alt="" />
                <div className="breadcrumb">{title}</div>
              </div>
              <div className="title">{title}</div>
              <div className="description">{description}</div>
              {loading ? (
                <PuffLoader />
              ) : (
                <div className="file-grid-container">
                  <FileGrid
                    lineGroups={lineGroups}
                    language={language}
                    customStyles={{
                      container: {
                        paddingInline: 0,
                      },
                      tile: {
                        maxHeight: "40vh",
                      },
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="form-wrapper">
          <h2>{literalContent.letsDiscuss[language]}</h2>
          <Form
            onSubmit={() => setIsModalOpen(false)}
            theme="dark"
            language={language}
          />
        </div>
      </div>
      <Footer
        language={language}
        handleSwitchLanguage={appViewStore.switchLanguage}
      />
      <Modal
        title={literalContent.weWillContactYou[language]}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <Form onSubmit={handleSubmit} language={language} />
      </Modal>
    </>
  );
});
