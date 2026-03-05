import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExamPage from "./pages/ExamPage";
import ResultPage from "./pages/ResultPage";
import AdminCreateExam from "./pages/AdminCreateExam";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/exam/:examId" element={<ExamPage />} />

        <Route path="/result/:attemptId" element={<ResultPage />} />

        <Route path="/admin/create-exam" element={<AdminCreateExam />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;