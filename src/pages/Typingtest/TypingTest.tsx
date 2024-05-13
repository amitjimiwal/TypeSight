import React, { useEffect, useRef, useState } from "react";
import ContentWrapper from "@/components/ContentWrapper";
import Control from "@/components/Typing/Control";
import shuffleWords from "@/lib/helpers/shufflewords";
import { Game, KeyboardEventCustom, word } from "@/types/typinggame";
import clsx from "clsx";
import CameraComponent from "@/components/Typing/CameraComponent";
import { ArrowTopLeftIcon } from "@radix-ui/react-icons";
import TypingResult from "@/components/Typing/TypingResult";
const TypingTest = () => {
  const [time, setTime] = useState<number>(30);
  const [game, setGame] = useState<Game>("waiting");
  const typedLetter = useRef<string>("");
  const countLookedOnKeyboard = useRef<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const words = useRef<word[]>(shuffleWords("words"));
  const [wordIdx, setwordIdx] = useState<number>(0);
  const [letterIdx, setLetterIdx] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [correctLetters, setCorrectLetters] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wordBoxRef = useRef<HTMLDivElement>(null);
  const cursorEl = useRef<HTMLDivElement>(null);
  let letterRef: HTMLSpanElement;
  function updateGameState(event: React.ChangeEvent<HTMLInputElement>) {
    if (game === "in progress") {
      typedLetter.current = event.target.value;
      // console.log("typed" + typedLetter.current);
      setLetter();
      checkLetter();
      setLetterIdx((l) => l + 1);
      updateLine();
      moveCaret();
    }
  }
  function countKeyboardFaults(){
    countLookedOnKeyboard.current++;
  }
  function moveCaret() {
    const offset = 4;
    if (cursorEl.current) {
      cursorEl.current.style.top = `${letterRef.offsetTop + offset}px`;
      cursorEl.current.style.left = `${
        letterRef.offsetLeft + letterRef.offsetWidth
      }px`;
    }
  }
  function nextWord() {
    const isNotFirstLetter = letterIdx !== 0;
    const isOneLetterWord = words.current[wordIdx].length === 1;

    if (isNotFirstLetter || isOneLetterWord) {
      setwordIdx((w) => w + 1);
      setLetterIdx(0);
      increaseScore();
    }
  }
  function startGame() {
    setGame("in progress");
  }
  function setLetter() {
    //used for setting the currentLetter that is being checked
    //check if current word completed
    const wordCompleted = letterIdx > words.current[wordIdx].length - 1;
    console.log(letterIdx + "" + wordCompleted);
    if (!wordCompleted) {
      letterRef = wordBoxRef?.current?.children[wordIdx].children[
        letterIdx
      ] as HTMLSpanElement;
    } else {
      const span = document.createElement("span");
      span.classList.add("wrong");
      span.classList.add("letter");
      span.innerText = typedLetter.current.slice(-1);
      wordBoxRef?.current?.children[wordIdx].appendChild(span);
      letterRef = span;
    }
  }
  function getWordsPerMinute() {
    const word = 5;
    const minutes = 0.5;
    return Math.floor((correctLetters-countLookedOnKeyboard.current) / word / minutes);
  }
  function getAccuracy() {
    const totalLetters = getTotalLetters(words.current);
    return Math.floor(((correctLetters-countLookedOnKeyboard.current) / totalLetters) * 100);
  }
  function getTotalLetters(words: word[]) {
    return words.reduce((count, word) => count + word.length, 0);
  }
  function getResults() {
    setWpm(getWordsPerMinute());
    setAccuracy(getAccuracy());
    setShowResults(true);
  }
  function updateLine() {
    const wordEl = wordBoxRef?.current?.children[wordIdx];
    const wordsY = wordBoxRef?.current?.getBoundingClientRect().y ?? 0;
    const wordY = wordEl?.getBoundingClientRect().y ?? 0;
    console.log("word " + wordY);
    console.log("words " + wordsY);
    if (wordY > wordsY) {
      wordBoxRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }
  function checkLetter() {
    const currentLetter = words.current[wordIdx][letterIdx];
    console.log("curr " + currentLetter);
    console.log("typed " + typedLetter.current.slice(-1));
    if (typedLetter.current.slice(-1) === currentLetter) {
      letterRef.classList.add("correct");
      increaseScore();
    }
    if (
      letterIdx < typedLetter.current.length &&
      typedLetter.current.slice(-1) !== currentLetter
    ) {
      letterRef.classList.add("wrong");
    }
  }
  function increaseScore() {
    setCorrectLetters((letter) => letter + 1);
  }

  // function previousWord() {
  //   if (wordIdx === 0 && letterIdx === 0) return;
  //   if (letterIdx == 0 && wordIdx > 0) {
  //     console.log(letterRef);
  //     setwordIdx((w) => w - 1);
  //     letterRef.classList.remove("correct");
  //     letterRef.classList.remove("wrong");
  //     setLetterIdx(words.current[wordIdx].length - 1);
  //     setLetter();
  //     setLetter();
  //     return;
  //   }
  //   if (letterIdx > 0) {
  //     letterRef.classList.remove("correct");
  //     letterRef.classList.remove("wrong");
  //     setLetterIdx((l) => l - 1);
  //     setLetter();
  //   }
  // }
  function handleKeyDown(event: KeyboardEventCustom<HTMLInputElement>) {
    console.log("Writing SOmething");
    if (event.code === "Space") {
      event.preventDefault();
      if (game === "in progress") {
        typedLetter.current = "";
        nextWord();
        moveCaret();
      }
    }
    if (event.code === "Backspace") {
      console.log("Backspace");
    }
    if (game === "waiting") startGame();
  }
  useEffect(() => {
    const id = setInterval(() => {
      if (game == "in progress") setTime((prev) => prev - 1);
    }, 1000);
    if (game === "finished" || time === 0) {
      clearInterval(id);
      setTime(30);
      setGame("finished");
      getResults();
      setShowResults(true);
    }
    return () => clearInterval(id);
  }, [game, time]);
  useEffect(() => {
    window.addEventListener("keydown", () => {
      console.log(inputRef.current?.value);
      typedLetter.current = "";
      setIsFocused(true);
      inputRef.current?.focus();
    });
    return () => {
      window.removeEventListener("keydown", function () {});
    };
  }, []);
  return (
    <div className="typingBackgroundColor">
      <ContentWrapper props="w-screen h-screen flex flex-col gap-20">
        <Control />
        {!showResults ? (
          <>
            {/* Camera Component */}
            <CameraComponent isGameStarted={game === "in progress"} countFaults={countKeyboardFaults} />
            <div className="text-2xl font-extrabold text-green-400">
              {time}s
            </div>
            <div className="relative w-full">
              <input
                type="text"
                className="absolute left-0 top-12 opacity-0 -z-0"
                value={typedLetter.current}
                onInput={updateGameState}
                onKeyDown={handleKeyDown}
                ref={inputRef}
              />
              {!isFocused && (
                <div className="absolute w-full text-center text-white font-bold z-[999] pointer-events-none">
                  <div>
                    <ArrowTopLeftIcon style={{ display: "inline" }} /> Click or
                    type to Focus
                  </div>
                </div>
              )}{" "}
              {/* Words Container */}
              <div
                className={clsx(
                  "relative w-full flex flex-wrap gap-4  -mt-20 overflow-hidden select-none",
                  !isFocused && "blurred"
                )}
                ref={wordBoxRef}
                onClick={() => {
                  if (!isFocused) {
                    setIsFocused(true);
                    inputRef.current?.focus();
                  }
                }}
              >
                {words.current.map((word, index) => (
                  <span
                    className={clsx(
                      "word",
                      wordIdx === index && "underline underline-offset-8"
                    )}
                    key={index}
                  >
                    {word.split("").map((character, idx) => (
                      <span className={clsx("letter")} key={idx}>
                        {character}
                      </span>
                    ))}
                  </span>
                ))}
                <div className="caret" ref={cursorEl}></div>
              </div>
            </div>
          </>
        ) : (
          <TypingResult wpm={wpm} accuracy={accuracy} faults={countLookedOnKeyboard.current} />
        )}
      </ContentWrapper>
    </div>
  );
};

export default TypingTest;
