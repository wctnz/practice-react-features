import { Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage/PostPage";
import HomePage from "./pages/HomePage/HomePage";
import Toggle from "./components/toggle/Toggle";

function App() {
  return (
    <>
      <div className="container">
        <div className="content">
        <Toggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<PostPage />} />
        </Routes>
        </div>
      </div>
    </>

  );
}

export default App;
