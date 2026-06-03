import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import GrammarPage from "./pages/GrammarPage/GrammarPage";
import LessonDetailPage from "./pages/LessonPage/LessonDetailPage/LessonDetailPage";
import LessonPage from "./pages/LessonPage/LessonPage/LessonPage";
console.log(window.APP_CONFIG.API_URL);
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<HomePage/>} />
            <Route path="/grammar" element={<GrammarPage/>} />
            <Route path="/course/:courseId" element={<LessonPage/>} />
            <Route path="/lesson/:lessonId" element={<LessonDetailPage/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;