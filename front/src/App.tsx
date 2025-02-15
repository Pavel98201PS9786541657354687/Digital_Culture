import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ProjectPage, MainPage } from "@/pages";
import { initApiHttpClient } from "./stores";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/projects/:projectId',
      element: <ProjectPage />,
    },
  ]);

  initApiHttpClient();

  return (
    // <React.StrictMode>
      <RouterProvider router={router} />
    // </React.StrictMode>
  );
}
