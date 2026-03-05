import { useState } from "react";
import API from "../api/axios";

export default function AdminCreateExam() {

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const createExam = async (e) => {

    e.preventDefault();

    try {

      await API.post("/exams", {
        title,
        totalDuration: duration,
        sections: []
      });

      alert("Exam created successfully");

      setTitle("");
      setDuration("");

    } catch (err) {

      alert("Failed to create exam");

    }

  };

  return (

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Create Exam
      </h1>

      <form onSubmit={createExam} className="space-y-4 w-96">

        <input
          type="text"
          placeholder="Exam Title"
          className="border p-2 w-full"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          className="border p-2 w-full"
          value={duration}
          onChange={(e)=>setDuration(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Exam
        </button>

      </form>

    </div>

  );

}