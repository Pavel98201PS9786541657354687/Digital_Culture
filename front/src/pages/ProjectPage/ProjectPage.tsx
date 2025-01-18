import { FileGrid, Form } from "@/pages/MainPage/components";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LoadingContext, LanguageContext } from "../../App";
import { PuffLoader } from "react-spinners";
import { Modal, Footer, Header } from "../../components";
import arrowRight from "@/assets/arrow-right.svg";
import { renderFileByType } from "@/utils";
import { literalContent, API_URL, axiosInstance } from "@/constants";
import { getGridChunksByFileFormats } from "../../components/FileGrid/utils";

type Props = {
  setLoading: (boolean) => void;
  handleSwitchLanguage: () => void;
};

export const ProjectPage = (props: Props) => {
  const { setLoading, handleSwitchLanguage } = props;

  const loading = useContext(LoadingContext);
  const language = useContext(LanguageContext);

  const { projectId } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectInfo, setProjectInfo] = useState(null);
  const [lineGroups, setLineGroups] = useState([]);
  const [filesLoadingState, setFilesLoadingState] = useState([]);

  useEffect(() => {
    if (filesLoadingState.length) {
      setLoading(filesLoadingState?.some(state => state === true));
    }
  }, [filesLoadingState]);

  useEffect(() => {
    if (projectInfo?.files?.length) {
      setFilesLoadingState(new Array(projectInfo?.files?.length).fill(true));
      preloadFiles(projectInfo?.files);
      const groups = getGridChunksByFileFormats(projectInfo?.files);
      setLineGroups(groups);
    }
  }, [projectInfo?.files]);

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

  const fetchProject = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_URL}/api/projectsFiles/${projectId}`);
      const projectInfo = response.data?.results?.[0];
      setProjectInfo(projectInfo)
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div className="loader">
    <PuffLoader />
  </div>;

  const title = language === "ru" ? projectInfo?.title : projectInfo?.title_en;
  const description = language === "ru" ? projectInfo?.description : projectInfo?.description_en;

  return (
    <>
      <div className="project-page">
        <div className="project-page--container">
          <Header onOpenModal={() => setIsModalOpen(true)} handleSwitchLanguage={handleSwitchLanguage} />
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
      <Footer handleSwitchLanguage={handleSwitchLanguage} />
      <Modal
        title={literalContent.weWillContactYou[language]}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <Form onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};
