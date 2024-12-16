import { Header } from "@/pages/MainPage/components";
import "./style.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { LoadingContext, ProjectDataContext } from "../../App";

type Props = {
  setLoading: (boolean) => void;
};

export const ProjectPage = (props: Props) => {
  const { setLoading } = props;

  const projectData = useContext(ProjectDataContext)
  const loading = useContext(LoadingContext);

  const { projectId } = useParams();
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

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="project-page--container">
      <Header />
      <div className="project-page--content">
        <div className="title">
          {projectInfo?.title}
        </div>
        <div className="description">
          {projectInfo?.description}
        </div>
        {loading ? <h2>Loading...</h2> : projectFiles.map((file) => (
          <div className="project-page--container__file">
            {renderFileByType(file?.fileName)}
          </div>
        ))}
      </div>
    </div>
  );
};
