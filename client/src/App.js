
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoard from "./pages/DashBoard";
import NoticeBoard from "./pages/NoticeBoard";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/NoticeBoard" element={<NoticeBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;