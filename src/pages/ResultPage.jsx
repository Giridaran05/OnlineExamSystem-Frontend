import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function ResultPage() {

  const { attemptId } = useParams();

  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {

    try {

      const res = await API.post(`/attempt/finish/${attemptId}`);

      setResult(res.data.result);

    } catch (err) {

      console.log(err);

    }

  };

  if (!result) {
    return <p className="p-10">Loading result...</p>;
  }

  return (

    <div className="p-10 text-center">

      <h1 className="text-3xl font-bold mb-6">
        Exam Result
      </h1>

      <div className="bg-white shadow-lg p-8 rounded w-96 mx-auto">

        <p className="text-lg mb-2">
          Score: <b>{result.score}</b>
        </p>

        <p className="text-lg mb-2">
          Total Questions: <b>{result.totalQuestions}</b>
        </p>

        <p className="text-lg mb-2">
          Percentage: <b>{result.percentage}%</b>
        </p>

      </div>

    </div>

  );

}