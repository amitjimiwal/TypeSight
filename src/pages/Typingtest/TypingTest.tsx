import ContentWrapper from "@/components/ContentWrapper";
import Control from "@/components/Typing/Control";
import Typing from "@/components/Typing/Typing";
import shuffleWords from "@/lib/helpers/shufflewords";
import React from "react";
const TypingTest = () => {
  const words = shuffleWords("sentences");
  return (
    <div className="bg-gradient-to-bl from-slate-50 to-gray-200 dark:text-black">
      <ContentWrapper props="w-screen h-screen flex flex-col justify-around">
        <Control />
        <Typing text={words.join(" ")} />
        
      </ContentWrapper>
    </div>
  );
};

export default TypingTest;
