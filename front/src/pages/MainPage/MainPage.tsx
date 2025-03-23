import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { observer } from "mobx-react";

import { FileGrid, Form } from "@/components";
import { literalContent } from "@/constants";

import { Footer, Modal } from "../../components";
import { getGridChunksByFileFormats } from "../../components/FileGrid/utils";
import { useGetListBlocks, useGetListVideo } from "../../hooks";
import { appViewStore } from "../../stores/app.store";

import { LandingContainer, ServicesCarousel } from "./components";

import "./style.scss";

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollToPlugin, ScrollTrigger);

const LoadingComponent = () => (
  <div className="loader-container">
    <PuffLoader />
  </div>
);

export const MainPage = observer(() => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const anchorName = searchParams.get("anchor");

  const { language, videoList, totalProjectCount, eyeVideoLoading } =
    appViewStore;

  const { data: videosByPage, isLoading: isListVideoLoading } =
    useGetListVideo();
  const { data: blocks, isLoading: isListBlocksLoading } = useGetListBlocks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineGroups, setLineGroups] = useState([]);

  const loading = isListVideoLoading || isListBlocksLoading || eyeVideoLoading;

  useEffect(() => {
    if (anchorName) {
      setTimeout(() => {
        const element = document.querySelector(`#${anchorName}`);
        element?.scrollIntoView({ behavior: "smooth" });
        setSearchParams({});
      }, 1000);
    }
  }, [anchorName]);

  useEffect(() => {
    if (videosByPage.length) {
      appViewStore.addItemsToVideoList(videosByPage);
    }
  }, [videosByPage]);

  useEffect(() => {
    if (videoList.size > 0) {
      const groups = getGridChunksByFileFormats(Array.from(videoList));
      setLineGroups(groups);
    }
  }, [videoList.size]);

  useEffect(() => {
    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const blockID = anchor.getAttribute("href").substr(1);

        document.getElementById(blockID).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, []);

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {loading && (
        <div className="loader">
          <PuffLoader />
        </div>
      )}
      <div
        className="container"
        style={loading ? { display: "none" } : undefined}>
        <LandingContainer
          language={language}
          openFormModal={() => setIsModalOpen(true)}
        />
        <FileGrid
          lineGroups={lineGroups}
          videos={Array.from(videoList)}
          increaseOffset={() => appViewStore.increaseOffset()}
          total={totalProjectCount}
          language={language}
          containerStyles={{ paddingTop: "100px", paddingInline: "16px" }}
          loading={isListVideoLoading}
          onItemClick={(projectId) => navigate(`/projects/${projectId}`)}
        />
        {isListBlocksLoading ? (
          <LoadingComponent />
        ) : (
          <ServicesCarousel
            blocks={blocks}
            openModal={() => setIsModalOpen(true)}
            lineGroups={lineGroups}
            language={language}
          />
        )}
        <Footer
          language={language}
          handleSwitchLanguage={appViewStore.switchLanguage}
        />
      </div>
      <Modal
        title={literalContent.weWillContactYou[language]}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <Form onSubmit={handleSubmit} language={language} />
      </Modal>
    </>
  );
});
