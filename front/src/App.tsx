import React, { createContext, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ProjectPage, MainPage } from "@/pages";

export const LanguageContext = createContext("ru");
export const LoadingContext = createContext(false);

export const App = () => {
  const [language, setLanguage] = useState<"ru" | "eng">("ru");
  const [loading, setLoading] = useState(false);

  const handleSwitchLanguage = () => {
    if (language === "ru") {
      setLanguage("eng");
    } else {
      setLanguage("ru");
    }
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage setLoading={setLoading} handleSwitchLanguage={handleSwitchLanguage} />,
    },
    {
      path: '/projects/:projectId',
      element: <ProjectPage setLoading={setLoading} handleSwitchLanguage={handleSwitchLanguage} />,
    },
  ]);

  return (
    // <React.StrictMode>
      <LoadingContext.Provider value={loading}>
        <LanguageContext.Provider value={language}>
          <RouterProvider router={router} />
        </LanguageContext.Provider>
      </LoadingContext.Provider>
    // </React.StrictMode>
  );
}
