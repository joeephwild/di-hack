import React, { useEffect, useState } from "react";
// import { quizData } from "../utils/index";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { HeartIcon, XIcon } from "@heroicons/react/solid";
import { useUser } from "../context/UserContext";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { quizDataKoreanToEnglish } from "../utils";
import ReactModal from "react-modal";
import { useRouter } from "next/router";
import { useFlow } from "../context/FlowContext";
import Image from "next/image";
import { badges } from "../assets/images";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [lives, setLives] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const route = useRouter();
  const { setActive } = useFlow();

  useEffect(() => {
    if (gameOver) {
      setActive("podcast");
      route.push("/podcast"); // Replace with the actual route to your podcast page
    }
  }, [gameOver]);

  const question = quizDataKoreanToEnglish[currentQuestion];
  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === question.correctAnswer.toLowerCase()) {
      setCorrectAnswer(true);
    } else {
      setLives(lives - 1);
      setCorrectAnswer(false);

      if (lives < 1) {
        setGameOver(true);
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

const WinModal = ({ closeModal, actionButton }) => {
  return (
    <div className="w-[30%] bg-white px-12 py-12 rounded-2xl absolute left-[40%] top-[20%]">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-semibold">Congratulations🎉 </h1>
        <div>
          <button onClick={closeModal}>
            <XIcon className="w-[20px] h-[20px] bg-Grey/20 text-white " />
          </button>
        </div>
      </div>
      <div className="my-8 w-full">
        <p className="text-gray-400 text-xl w-[85%]">
          You completed this Level, claim your NFT badge below
        </p>
      </div>

      <div className="border border-1 rounded-2xl mb-4 flex flex-col justify-center items-center space-y-4 py-4">
        <Image src={badges} alt="badge" width={150} height={150} />
        <p className="text-xl font-bold">Level 1 Korean Badge</p>
      </div>
      <div className="w-full mt-8">
        <button
          className="bg-Accent w-full text-center rounded font-semibold py-4"
          onClick={actionButton}
        >
          Claim your NFT Badge
        </button>
      </div>
    </div>
  );
};

export default Quiz;
