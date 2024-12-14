import "./App.css";
import MainPage from "./pages/MainPage";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { ProjectPage } from "@/pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/projects/:fileName" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
