import { Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage/PostPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<PostPage />} />
      </Routes>
    </>

  );
}

export default App;
