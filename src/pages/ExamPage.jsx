import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import ExamTimer from "../components/ExamTimer";
import QuestionNavigator from "../components/QuestionNavigator";

export default function ExamPage() {

  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {

    fetchExam();
    setupAntiCheat();
    enableFullscreen();

    return cleanupAntiCheat;

  }, []);

  // =============================
  // LOAD EXAM
  // =============================

  const fetchExam = async () => {

    try {

      const res = await API.get(`/exams/${examId}`);

      setExam(res.data.data);

    } catch (err) {

      console.log("Failed to load exam");

    }

  };

  // =============================
  // ENABLE FULLSCREEN
  // =============================

  const enableFullscreen = () => {

    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }

  };

  // =============================
  // ANTI CHEAT DETECTION
  // =============================

  const handleVisibility = () => {

    if (document.hidden) {

      API.post("/cheat/log", {
        type: "tab_switch"
      });

      alert("Tab switching detected!");

    }

  };

  const handleBlur = () => {

    API.post("/cheat/log", {
      type: "window_blur"
    });

    alert("Window focus lost!");

  };

  const disableRightClick = (e) => e.preventDefault();

  const disableCopy = (e) => e.preventDefault();

  const disableKeys = (e) => {

    if (
      e.ctrlKey &&
      (e.key === "c" || e.key === "v" || e.key === "x")
    ) {
      e.preventDefault();
    }

  };

  const setupAntiCheat = () => {

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("copy", disableCopy);
    document.addEventListener("keydown", disableKeys);

  };

  const cleanupAntiCheat = () => {

    document.removeEventListener("visibilitychange", handleVisibility);
    window.removeEventListener("blur", handleBlur);
    document.removeEventListener("contextmenu", disableRightClick);
    document.removeEventListener("copy", disableCopy);
    document.removeEventListener("keydown", disableKeys);

  };

  // =============================
  // ANSWER SELECTION
  // =============================

  const handleAnswer = (questionId, index) => {

    setAnswers({
      ...answers,
      [questionId]: index
    });

  };

  // =============================
  // SUBMIT EXAM
  // =============================

  const submitExam = async () => {

    try {

      const res = await API.post("/attempt/submit", {
        examId,
        answers
      });

      alert("Exam submitted successfully");

      const attemptId = res.data.attemptId;

      navigate(`/result/${attemptId}`);

    } catch (err) {

      alert("Submission failed");

    }

  };

  if (!exam) return <p className="p-10">Loading exam...</p>;

  const questions = exam.sections.flatMap(s => s.questions);

  const q = questions[currentQuestion];

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          {exam.title}
        </h1>

        <ExamTimer
          duration={exam.totalDuration}
          onTimeUp={submitExam}
        />

      </div>

      {/* QUESTION NAVIGATOR */}

      <QuestionNavigator
        questions={questions}
        answers={answers}
        current={currentQuestion}
        setCurrent={setCurrentQuestion}
      />

      {/* QUESTION CARD */}

      <div className="bg-white border p-6 rounded shadow mb-6">

        <h2 className="font-semibold mb-4">

          Question {currentQuestion + 1}

        </h2>

        <p className="mb-4">{q.question}</p>

        {q.options.map((opt, i) => (

          <label key={i} className="block mb-2 cursor-pointer">

            <input
              type="radio"
              name={q._id}
              checked={answers[q._id] === i}
              onChange={() => handleAnswer(q._id, i)}
            />

            <span className="ml-2">{opt}</span>

          </label>

        ))}

      </div>

      {/* NAVIGATION */}

      <div className="flex justify-between">

        <button
          disabled={currentQuestion === 0}
          onClick={() =>
            setCurrentQuestion(currentQuestion - 1)
          }
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={currentQuestion === questions.length - 1}
          onClick={() =>
            setCurrentQuestion(currentQuestion + 1)
          }
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

      {/* SUBMIT */}

      <div className="mt-6 text-center">

        <button
          onClick={submitExam}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded"
        >
          Submit Exam
        </button>

      </div>

    </div>

  );

}