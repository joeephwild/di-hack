import React, { useEffect, useState } from "react";
// import { quizData } from "../utils/index";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { XIcon } from "@heroicons/react/solid";
import { useUser } from "../context/UserContext";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { quizDataKoreanToEnglish } from "../utils";
import ReactModal from "react-modal";
import { useRouter } from "next/router";
import { useFlow } from "../context/FlowContext";


const QuizModal = ({ showModal, onClose }) => {
  const { setModalOpen, logIn, currentUser } = useFlow();
  const { checkIfUserExist } = useUser();
  const [email, setEmail] = useState("");
  const route = useRouter();

  const handleLogIn = async () => {
    const res = logIn(email);
    console.log("response", res);

    if (res) {
      setModalOpen(false);
      checkIfUserExist();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white py-[27px] px-[24px] rounded-lg shadow-lg w-[434px] h-[352px]">
        <div className="flex items-center justify-between w-full mb-9">
          <h2 className="text-[22px] font-semibold text-black">
            Connect wallet
          </h2>
          <button onClick={() => setModalOpen(false)} className="bg-[#C0C0CF]">
            <XIcon className="w-[20px] h-[20px] bg-Grey/20 text-white " />
          </button>
        </div>
        <p className="text-gray-700">
          To receive a one-time magic link and connect your wallet, please
          provide your email address below.
        </p>
        <form className="mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full h-12 px-3 text-black border border-gray-300 rounded-lg"
          />
        </form>
        <div className="mt-6">
          <button
            onClick={handleLogIn}
            className="bg-Accent text-white w-full rounded-lg py-3"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};


const quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const question = quizDataKoreanToEnglish[currentQuestion];
  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };
  const handleNextQuestion = () => {
    const userAnswer = userAnswers.join("").toLowerCase();
    const isCorrect = userAnswer === question.correctAnswer;

    if (isCorrect) {
      // Update the score and track the correct answer
      setScore(score + 1);
      setCorrectAnswers([...correctAnswers, userAnswer]);
    } else {
      // Track the wrong answer
      setWrongAnswers([...wrongAnswers, userAnswer]);
    }

    // Move to the next question
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setUserAnswers([]);

    // Check if the user has reached the last question
    if (currentQuestion === quizDataKoreanToEnglish.length - 1) {
      setShowModal(true);
    }
  };

  return (
    <DefaultLayout>
      <Navbar />
      <div className="text-Black">
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
          <button className="bg-Black text-Accent p-5 rounded-[5px]">
            {currentQuestion}/{quizDataKoreanToEnglish.length}
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
          <div className="flex flex-wrap items-center justify-center gap-[24px] j mt-[102px] w-full">
            {question.options?.map((item, i) => (
              <button
                key={i}
                className={`text-Black text-[24px] font-medium w-[40%] flex item-center justify-center border-2 py-[20px] ${
                  selectedAnswer === item.toLowerCase() ? "bg-gray-400" : ""
                }`}
                onClick={() => handleSelectAnswer(item.toLowerCase())} // Add this line
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextQuestion}
            className="bg-Accent items-center justify-center mt-[134px] py-[20px] px-[80px] text-[24px] text-Black"
          >
            Submit
          </button>
        </div>
      </div>
      {/* <QuizModal showModal={showModal} onClose={() => setShowModal(false)} /> */}
    </DefaultLayout>
  );
};

export default quiz;
