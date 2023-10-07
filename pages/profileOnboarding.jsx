import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { logo } from "../assets/images";
import { languages } from "../utils";

const ProfileOnboarding = () => {
  const [selectedSpeakLanguage, setSelectedSpeakLanguage] = useState(null);
  const [selectedLearnLanguage, setSelectedLearnLanguage] = useState(null);
  const [step, setStep] = useState(1);
  const router = useRouter();
  console.log("selected langues", selectedLearnLanguage, selectedSpeakLanguage)

  // Load the selected languages from localStorage on component mount
  useEffect(() => {
    const storedSpeakLanguage = localStorage.getItem("selectedSpeakLanguage");
    if (storedSpeakLanguage) {
      setSelectedSpeakLanguage(storedSpeakLanguage);
    }

    const storedLearnLanguage = localStorage.getItem("selectedLearnLanguage");
    if (storedLearnLanguage) {
      setSelectedLearnLanguage(storedLearnLanguage);
    }
  }, []);

  // Function to handle language selection
  const handleLanguageSelect = (language) => {
    if (step === 1) {
      setSelectedSpeakLanguage(language);
      localStorage.setItem("selectedSpeakLanguage", language);
      // Change the color of the selected spoken language
      setStep(2); // Move to the next step
    } else if (step === 2) {
      setSelectedLearnLanguage(language);
      localStorage.setItem("selectedLearnLanguage", language);
    }
  };

  return (
    <div className="mx-[120px] my-[70px]">
      <div className="flex items-center">
        <Image
          src={logo}
          alt="logo"
          className="w-[58px] h-[58px] object-contain"
        />
        <span className="text-Black">Lancent</span>
      </div>

      {step === 1 && (
        <span className="flex items-center justify-center text-Black">
          What language do you speak?
        </span>
      )}
      {step === 2 && (
        <span className="flex items-center justify-center text-Black">
          What language do you want to learn?
        </span>
      )}

      <div className="grid grid-cols-4 mt-[115px] items-center justify-center gap-[40px]">
        {languages.map((item, i) => (
          <div
            onClick={() => handleLanguageSelect(item.name)}
            key={i}
            className={`${
              (step === 1 && selectedSpeakLanguage === item.name) ||
              (step === 2 && selectedLearnLanguage === item.name)
                ? "bg-Accent"
                : "bg-white"
            }  px-[77px] py-[20px] flex flex-col items-center space-y-[36px]`}
          >
            <Image
              src={item.image}
              alt={item.name}
              className="w-[116px] h-[80px] object-contain"
            />
            <span className="text-Black">{item.name}</span>
          </div>
        ))}
      </div>

      {step === 2 && (
        <button
          className="bg-Accent text-white px-4 py-2 mt-4"
          onClick={() => router.push("/")} // Redirect to the home page
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default ProfileOnboarding;
