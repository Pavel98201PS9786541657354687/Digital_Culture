import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { initApiHttpClient } from "./stores";
import { MainPage, ProjectPage } from "./pages";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/projects/:projectId",
      element: <ProjectPage />,
    },
  ]);

  initApiHttpClient();

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};
