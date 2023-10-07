import React, { useEffect, useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { HeartIcon, XIcon } from "@heroicons/react/solid";
import { quizDataKoreanToEnglish } from "../utils";
import { useRouter } from "next/router";
import { useFlow } from "../context/FlowContext";
import { FailedModal, WinModal } from "../components/quiz";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [lives, setLives] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [failed, setFailed] = useState(false);
  const route = useRouter();
  const { setActive } = useFlow();

  useEffect(() => {
    if (gameOver) {
      setFailed(true);
    }
  }, [gameOver]);

  const question = quizDataKoreanToEnglish[currentQuestion];
  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === question.correctAnswer.toLowerCase()) {
      setCorrectAnswer(true);
    } else {
      setLives(lives - 1);
      setCorrectAnswer(false);

      if (lives < 1) {
        setGameOver(true);
        setFailed(true);
      }
    }
  };
  const handleNextQuestion = () => {
    const userAnswer = userAnswers.join("").toLowerCase();
    const isCorrect = userAnswer === question.correctAnswer;

    if (isCorrect) {
      // Update the lives and track the correct answer

      setCorrectAnswers([...correctAnswers, userAnswer]);
    } else {
      // Track the wrong answer
      setWrongAnswers([...wrongAnswers, userAnswer]);
    }

    // Check if the user has reached the last question
    if (currentQuestion >= quizDataKoreanToEnglish.length - 1) {
      setShowModal(true);
    } else {
      // Move to the next question
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setUserAnswers([]);
    }
  };

  return (
    <DefaultLayout>
      <Navbar />
      <div className="text-Black">
        {showModal && (
          <WinModal
            closeModal={() => setShowModal(false)}
            actionButton={() => {}}
          />
        )}

        {failed && (
          <FailedModal
            closeModal={() => setFailed(false)}
            actionButton={() => {}}
          />
        )}
        <div className="flex items-center justify-around py-4 px-6">
          <XIcon className="w-[20px] h-[20px]" />
          <input
            type="range"
            className="w-[80%] in-range:bg-Accent"
            value={currentQuestion}
            min="0"
            max={quizDataKoreanToEnglish.length - 1}
            readOnly
          />
          <button className="bg-Black text-Accent p-2 rounded-[5px]">
            <div className="flex items-center space-x-6">
              {/* {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-6 h-6">
                  {index < lives ? (
                    <HeartIcon className="text-Accent w-[32px] h-[32px]" />
                  ) : (
                    <HeartIcon className="text-Grey w-[32px] h-[32px]" />
                  )}
                </div>
              ))} */}
              <HeartIcon className="text-Accent w-[32px] h-[32px]" />
              <span>{lives}</span>
            </div>
          </button>
        </div>

        <div className="flex mt-[42px] flex-col items-center justify-center">
          <h1 className="text-[32px] text-Black font-medium">
            {question?.question}
          </h1>
          {/** uestion */}
          <span className="mt-[32px] border-2 text-[24px] border-[#FEEBDD] items-center justify-center gap-[10px] text-Black py-[15px] px-[25px]">
            {question.sentenceKorean}
          </span>
          {selectedAnswer && (
            <span
              className={
                correctAnswer
                  ? `mt-[16px] p-4 bg-gray-300 text-lg space-x-2 text-green-600`
                  : `mt-[16px] p-4 bg-gray-300 text-lg space-x-2 text-red-600`
              }
            >
              {correctAnswer && "Correct"}
              {!correctAnswer && "Incorrect"}
            </span>
          )}
          <div className="flex flex-wrap items-center justify-center gap-[24px] j mt-[102px] w-full">
            {question.options?.map((item, i) => (
              <button
                key={i}
                disabled={lives < 0}
                className={`text-Black text-[24px] font-medium w-[40%] flex item-center justify-center border-2 py-[20px]   ${
                  selectedAnswer === item.toLowerCase() && correctAnswer
                    ? "border-green-500 text-green-500"
                    : ""
                }
                ${
                  selectedAnswer === item.toLowerCase() && !correctAnswer
                    ? "border-red-500 text-red-500"
                    : ""
                }`}
                onClick={() => handleSelectAnswer(item.toLowerCase())} // Add this line
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextQuestion}
            className="bg-Accent items-center justify-center mt-[134px] py-[20px] px-[80px] text-[20px] font-medium text-Black"
            disabled={!correctAnswer}
          >
            Submit answer
          </button>
        </div>
      </div>
      {/* <QuizModal showModal={showModal} onClose={() => setShowModal(false)} /> */}
    </DefaultLayout>
  );
};

export default Quiz;
