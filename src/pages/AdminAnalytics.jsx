import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {

  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchExams();

  }, []);

  const fetchExams = async () => {

    try {

      const res = await API.get("/exams");

      setExams(res.data.data || []);

    } catch (error) {

      console.error("Error fetching exams", error);

    } finally {

      setLoading(false);

    }

  };

  const startExam = (examId) => {

    navigate(`/exam/${examId}`);

  };

  const goToCreateExam = () => {

    navigate("/admin/create-exam");

  };

  const logout = () => {

    localStorage.removeItem("token");
    navigate("/");

  };

  if (loading) {

    return (

      <div className="flex justify-center items-center h-screen text-lg">
        Loading exams...
      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">

        <h1 className="text-3xl font-bold text-blue-600">
          Online Examination System
        </h1>

        <div className="flex gap-3">

          <button
            onClick={goToCreateExam}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create Exam
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

      {/* TITLE */}

      <h2 className="text-xl font-semibold mb-6">
        Available Exams
      </h2>

      {/* EMPTY STATE */}

      {exams.length === 0 && (

        <div className="bg-white p-8 rounded shadow text-center text-gray-500">

          No exams available yet.

          <div className="mt-4">
            <button
              onClick={goToCreateExam}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create First Exam
            </button>
          </div>

        </div>

      )}

      {/* EXAMS GRID */}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {exams.map((exam) => {

          const totalQuestions = exam.sections?.reduce(
            (acc, section) => acc + section.questions.length,
            0
          );

          return (

            <div
              key={exam._id}
              className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition"
            >

              <h3 className="text-lg font-bold mb-2">
                {exam.title}
              </h3>

              <div className="text-gray-600 text-sm space-y-1 mb-4">

                <p>
                  ⏱ Duration: {exam.totalDuration} minutes
                </p>

                <p>
                  📚 Sections: {exam.sections?.length || 0}
                </p>

                <p>
                  ❓ Questions: {totalQuestions}
                </p>

              </div>

              <button
                onClick={() => startExam(exam._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
              >
                Start Exam
              </button>

            </div>

          );

        })}

      </div>

    </div>

  );

}