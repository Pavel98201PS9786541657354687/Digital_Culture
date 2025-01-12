import { Form } from "@/pages/MainPage/components";
import "./style.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LoadingContext, LanguageContext } from "../../App";
import { PuffLoader } from "react-spinners";
import { Modal, Footer, Header } from "../../components";
import arrowRight from "@/assets/arrow-right.svg";
import { renderFileByType } from "@/utils";
import { literalContent } from "../../constants";

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

  const fetchProject = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/projectsFiles/${projectId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
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
              <div className="breadcrumb" onClick={() => navigate("/")}>
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
            {loading ? <PuffLoader /> : projectInfo?.files?.map((file) => (
              <div className="project-page--container__file">
                {renderFileByType(file?.fileName)}
              </div>
            ))}
          </div>
        </div>
        <div className="form-wrapper">
          <h2>{literalContent.letsDiscuss[language]}</h2>
          <Form />
        </div>
        <Footer handleSwitchLanguage={handleSwitchLanguage} />
      </div>
      <Modal
        title={literalContent.weWillContactYou[language]}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <Form onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};
