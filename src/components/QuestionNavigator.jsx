export default function QuestionNavigator({
  questions,
  answers,
  current,
  setCurrent
}) {

  return (

    <div className="mb-6">

      {/* Legend */}

      <div className="flex gap-4 mb-3 text-sm">

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          Current
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          Answered
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          Not Answered
        </div>

      </div>


      {/* Question Grid */}

      <div className="grid grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">

        {questions.map((q, index) => {

          const answered = answers[q._id] !== undefined;

          let colorClass = "bg-gray-300";

          if (index === current) {
            colorClass = "bg-blue-600 text-white";
          } 
          else if (answered) {
            colorClass = "bg-green-500 text-white";
          }

          return (

            <button
              key={q._id}
              onClick={() => setCurrent(index)}
              className={`p-2 rounded text-sm font-semibold hover:scale-105 transition ${colorClass}`}
            >
              {index + 1}
            </button>

          );

        })}

      </div>

    </div>

  );

}