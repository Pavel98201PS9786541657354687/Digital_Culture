import { Form, Header } from "@/pages/MainPage/components";
import "./style.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { LoadingContext, ProjectDataContext } from "../../App";
import { PuffLoader } from "react-spinners";
import { Modal } from "../../components";
import { Footer } from "../MainPage/components/Footer";

type Props = {
  setLoading: (boolean) => void;
};

export const ProjectPage = (props: Props) => {
  const { setLoading } = props;

  const projectData = useContext(ProjectDataContext)
  const loading = useContext(LoadingContext);

  const { projectId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectInfo, setProjectInfo] = useState(null);
  const [projectFiles, setProjectFiles] = useState([]);

  useEffect(() => {
    if (projectData) {
      setProjectInfo(projectData);
    }
  }, [projectData]);

  const fetchProject = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/projectsFiles/${projectId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const files = response.data?.results;
      setProjectFiles(files);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const renderFileByType = (path) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.svg'];
    const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.mkv', '.flv', '.webm'];

    const extension = path.toLowerCase().split('.').pop();

    if (imageExtensions.includes(`.${extension}`)) {
      return (
        <img src={path} alt="" />
      );
    } else if (videoExtensions.includes(`.${extension}`)) {
      return (
        <video autoPlay muted loop>
          <source src={path} type="video/mp4" />
          Не удалось воспроизвести видео
        </video>
      );
    } else {
      return "Тип файла не поддерживается";
    }
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div className="loader">
    <PuffLoader />
  </div>;

  return (
    <>
      <div className="project-page">
        <div className="project-page--container">
          <Header />
          <div className="project-page--content">
            <div className="title">
              {projectInfo?.title}
            </div>
            <div className="description">
              {projectInfo?.description}
            </div>
            {loading ? <PuffLoader /> : projectFiles.map((file) => (
              <div className="project-page--container__file">
                {renderFileByType(file?.fileName)}
              </div>
            ))}
          </div>
        </div>
        <div className="form-wrapper">
          <h2>Обсудим ваш проект?</h2>
          <Form />
        </div>
        <Footer />
      </div>
      <Modal title="Свяжемся, чтобы обсудить детали" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};
