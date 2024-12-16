import React, { createContext, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ProjectPage, MainPage } from "@/pages";

export const ProjectDataContext = createContext(null);
export const LoadingContext = createContext(false);

export const App = () => {
  const [projectInfo, setProjectInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage setProjectInfo={setProjectInfo} setLoading={setLoading} />,
    },
    {
      path: '/projects/:projectId',
      element: <ProjectPage setLoading={setLoading} />,
    },
  ]);

  return (
    // <React.StrictMode>
      <LoadingContext.Provider value={loading}>
        <ProjectDataContext.Provider value={projectInfo}>
          <RouterProvider router={router} />
        </ProjectDataContext.Provider>
      </LoadingContext.Provider>
    // </React.StrictMode>
  );
}
