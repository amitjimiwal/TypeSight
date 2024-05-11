import React, { useEffect, useRef, useState } from "react";
import ContentWrapper from "@/components/ContentWrapper";
import Control from "@/components/Typing/Control";
import TypingFooter from "@/components/Typing/TypingFooter";
import shuffleWords from "@/lib/helpers/shufflewords";
import { Game, KeyboardEventCustom, word } from "@/types/typinggame";
import clsx from "clsx";
import WrongWord from "@/components/WrongWord";
import { set } from "lodash";
import CameraComponent from "@/components/Typing/CameraComponent";
const TypingTest = () => {
  const [time, setTime] = useState<number>(30);
  const [game, setGame] = useState<Game>("waiting");
  const typedLetter = useRef<string>("");
  const words = useRef<word[]>(shuffleWords("words"));
  const [wordIdx, setwordIdx] = useState<number>(0);
  const [letterIdx, setLetterIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctLetters, setCorrectLetters] = useState<number>(0);
  const [wrongLetters, setWrongLetters] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wordBoxRef = useRef<HTMLDivElement>(null);
  const cursorEl = useRef<HTMLDivElement>(null);
  let letterRef: HTMLSpanElement;
  function setGameTimer() {
    function gameTimer() {
      if (time > 0) {
        setTime((t) => t - 1);
      }
      if (game === "waiting" || time === 0) {
        clearInterval(interval);
      }

      if (time === 0) {
        setGame("finished");
        // getResults()
      }
    }
    const interval = setInterval(gameTimer, 1000);
  }
  function updateGameState(event: React.ChangeEvent<HTMLInputElement>) {
    typedLetter.current = event.target.value;
    console.log("typed" + typedLetter.current);
    setLetter();
    // console.log(
    //   "Checking letter with " + typedLetter.current + letterRef.innerText
    // );
    checkLetter();
    setLetterIdx((l) => l + 1);
    updateLine();
    // moveCaret();
    // resetLetter();
  }
  // function moveCaret() {
  //   const offset = 4;
  //   console.log(letterRef);
  //   if (cursorEl.current) {
  //     cursorEl.current.style.top = `${letterRef.offsetTop + offset}px`;
  //     cursorEl.current.style.left = `${
  //       letterRef.offsetLeft + letterRef.offsetWidth
  //     }px`;
  //   }
  // }

  function resetLetter() {
    typedLetter.current = "";
  }
  function nextWord() {
    const isNotFirstLetter = letterIdx !== 0;
    const isOneLetterWord = words.current[wordIdx].length === 1;

    if (isNotFirstLetter || isOneLetterWord) {
      // moveCaret();
      setwordIdx((w) => w + 1);
      setLetterIdx(0);
      increaseScore();
    }
  }
  function startGame() {
    setGame("in progress");
    setGameTimer();
  }
  function setLetter() {
    //used for setting the currentLetter that is being checked
    //check if current word completed
    const wordCompleted = letterIdx > words.current[wordIdx].length - 1;
    console.log(letterIdx + "" + wordCompleted);
    // if (wordCompleted && typedLetter.current === " ") {
    //   console.log("Word completed and space");
    //   nextWord();
    //   letterRef = wordBoxRef?.current?.children[wordIdx].children[
    //     letterIdx
    //   ] as HTMLSpanElement;
    // }
    // console.log(wordBoxRef?.current);
    // console.log(wordBoxRef?.current?.children[wordIdx].children[letterIdx]);
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
      setWrongLetters((w) => w + 1);
    }
  }
  function updateLine() {
    const wordEl = wordBoxRef?.current?.children[wordIdx];
    const wordsY = wordBoxRef?.current?.getBoundingClientRect().y ?? 0;
    const wordY = wordEl?.getBoundingClientRect().y ?? 0;
    if (wordY > wordsY) {
      wordBoxRef?.current?.scrollIntoView({ block: "center" });
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
      setWrongLetters((w) => w + 1);
      letterRef.classList.add("wrong");
    }
  }
  function increaseScore() {
    setScore((score) => score + 1);
  }
  function decreaseScore() {
    setScore((score) => score - 1);
  }

  function previousWord() {
    if (wordIdx === 0 && letterIdx === 0) return;
    if (letterIdx == 0 && wordIdx > 0) {
      console.log(letterRef);
      setwordIdx((w) => w - 1);
      letterRef.classList.remove("correct");
      letterRef.classList.remove("wrong");
      setLetterIdx(words.current[wordIdx].length - 1);
      setLetter();
      setLetter();
      return;
    }
    if (letterIdx > 0) {
      letterRef.classList.remove("correct");
      letterRef.classList.remove("wrong");
      setLetterIdx((l) => l - 1);
      setLetter();
    }
  }
  function handleKeyDown(event: KeyboardEventCustom<HTMLInputElement>) {
    console.log("Writing SOmething");
    if (event.code === "Space") {
      event.preventDefault();
      if (game === "in progress") {
        typedLetter.current = "";
        nextWord();
      }
    }
    if (event.code === "Backspace") {
      console.log("Backspace");
      // previousWord();
    }
    if (game === "waiting") startGame();
  }
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="typingBackgroundColor">
      <ContentWrapper props="w-screen h-screen flex flex-col justify-around">
        <Control />
        <CameraComponent isGameStarted={game==='in progress'}/>
        <div className="text-2xl font-extrabold text-green-400">{time}s</div>
        {/* Hidden input to take user's typed words */}
        <input
          type="text"
          className=""
          value={typedLetter.current}
          onInput={updateGameState}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <div className="w-full flex flex-wrap gap-4 relative" ref={wordBoxRef}>
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
        <TypingFooter />
      </ContentWrapper>
    </div>
  );
};

export default TypingTest;
