import { useEffect, useState } from "react";

export default function ExamTimer({ duration, onTimeUp }) {

  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timer);

          onTimeUp();

          return 0;

        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (

    <div className="text-red-600 font-bold text-lg">

      Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}

    </div>

  );

}