import React, {
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./typing.css";
import useTestMode from "@/hooks/useTextContext";
import shuffleWords from "@/lib/helpers/shufflewords";
import { KeyboardEventCustom, word } from "@/types/typinggame";
import Menu from "@/components/Typing/Menu";
import TypingResult from "@/components/Typing/TypingResult";
import ContentWrapper from "@/components/ContentWrapper";
import { clsx } from "clsx";
import CameraComponent from "@/components/Typing/CameraComponent";
const TypingPage = () => {
  const countLookedOnKeyboard = useRef<number>(0);
  const words = useRef<word[]>(shuffleWords("words"));
  const { testSeconds, testWords, testMode } = useTestMode();
  const [initialRender, setInitialRender] = useState(false);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [countDown, setCountDown] = useState(() => {
    return testSeconds;
  });
  const [testTime, setTestTime] = useState(() => {
    return testSeconds;
  });
  const [correctChars, setCorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectChars, setIncorrectChar] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [graphData, setGraphData] = useState<[number, number, number][]>([]);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [, setOpen] = useState(false);

  const emptySpans = () => {
    return Array(words.current.length)
      .fill(0)
      .map(() => createRef<HTMLSpanElement>());
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const [wordSpanRef, setWordSpanRef] = useState<
    React.RefObject<HTMLSpanElement>[]
  >(emptySpans());
  function countKeyboardFaults() {
    countLookedOnKeyboard.current += 2;
  }
  const resetTest = () => {
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestEnd(false);
    clearInterval(intervalId);

    //  setWords(randomWords(300));
    setWordSpanRef(emptySpans());
    setCountDown(testSeconds);
    setTestTime(testSeconds);
    setGraphData([]);
    setCorrectChars(0);
    setCorrectWords(0);
    setExtraChars(0);
    setIncorrectChar(0);
    setMissedChars(0);
    resetWordSpanRefClassname();
    focusInput();
  };

  // const redoTest = () => {
  //   setCurrCharIndex(0);
  //   setCurrWordIndex(0);
  //   setTestStart(false);
  //   setTestEnd(false);
  //   clearInterval(intervalId);
  //   if (testMode === "word") {
  //     setCountDown(180);
  //     setTestTime(180);
  //   } else {
  //     setCountDown(testSeconds);
  //     setTestTime(testSeconds);
  //   }
  //   setGraphData([]);
  //   setCorrectChars(0);
  //   setCorrectWords(0);
  //   setExtraChars(0);
  //   setIncorrectChar(0);
  //   setMissedChars(0);
  //   resetWordSpanRefClassname();
  //   focusInput();
  // };

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      // console.log("timer function is working");
      setCountDown((prevCountDown) => {
        setCorrectChars((correctChars) => {
          // console.log("correct chars",correctChars);
          setGraphData((data) => {
            return [
              ...data,
              [
                testTime - prevCountDown,
                Math.round(
                  correctChars / 5 / ((testTime - prevCountDown + 1) / 60)
                ),
                countLookedOnKeyboard.current,
              ],
            ];
          });
          return correctChars;
        });

        if (prevCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return prevCountDown - 1;
      });
    }
  };

  const handleKeyDown = (e: KeyboardEventCustom<HTMLInputElement>) => {
    if (e.code === "Tab") {
      if (testStart) {
        clearInterval(intervalId);
      }
      e.preventDefault();
      setOpen(true);
      return;
    }
    const allChildSpans = wordSpanRef[currWordIndex].current?.children;

    if (e.code !== "Backspace" && e.key.length > 1) {
      e.preventDefault();
      return;
    }
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }
    if (allChildSpans) {
      console.log("Working");
      //logic for space press -> increase my currWordIndex by 1
      if (e.code === "Space") {
        if (currWordIndex === words.current.length - 1) {
          clearInterval(intervalId);
          setCurrWordIndex(currWordIndex + 1);
          setTestEnd(true);
          return;
        }
        const correctChars =
          wordSpanRef[currWordIndex].current?.querySelectorAll(".correct");

        if (correctChars?.length === allChildSpans?.length) {
          setCorrectWords(correctWords + 1);
        }
        //removing cursor
        if (allChildSpans?.length <= currCharIndex) {
          //cursor present as a right one
          allChildSpans[currCharIndex - 1].classList.remove("right-current");
        } else {
          //cursor in between
          setMissedChars(missedChars + (allChildSpans.length - currCharIndex));
          for (let i = currCharIndex; i < allChildSpans.length; i++) {
            allChildSpans[i].className += " skipped";
          }
          allChildSpans[currCharIndex].className = allChildSpans[
            currCharIndex
          ].className.replace("current", "");
        }

        //scrollinig line condition
        if (
          wordSpanRef &&
          wordSpanRef[currWordIndex + 1].current?.offsetLeft &&
          wordSpanRef[currWordIndex].current?.offsetLeft &&
          (wordSpanRef[currWordIndex + 1].current?.offsetLeft as number) <
            (wordSpanRef[currWordIndex].current?.offsetLeft as number)
        ) {
          wordSpanRef[currWordIndex].current?.scrollIntoView();
        }
        if (wordSpanRef[currWordIndex + 1].current) {
          if (wordSpanRef[currWordIndex].current) wordSpanRef[currWordIndex + 1].current!.className = "char current";
        }
        setCurrWordIndex(currWordIndex + 1);
        setCurrCharIndex(0);

        return;
      }

      //logic for backspace
      if (e.code === "Backspace") {
        if (currCharIndex !== 0) {
          if (allChildSpans[currCharIndex - 1].className.includes("correct"))
            setCorrectChars((corr) => corr - 1);
          else if (
            allChildSpans[currCharIndex - 1].className.includes("incorrect")
          )
            setIncorrectChar((char) => char - 1);
          if (currCharIndex === allChildSpans.length) {
            if (allChildSpans[currCharIndex - 1].className.includes("extra")) {
              allChildSpans[currCharIndex - 1].remove();
              allChildSpans[currCharIndex - 2].className += " right-current";
            } else {
              allChildSpans[currCharIndex - 1].className = "char current";
            }

            setCurrCharIndex(currCharIndex - 1);
            return;
          }
          allChildSpans[currCharIndex].className = "char";
          allChildSpans[currCharIndex - 1].className = "char current";
          setCurrCharIndex(currCharIndex - 1);
        }
        return;
      }

      console.log("Pressed other thing");
      //handling code
      if (currCharIndex === allChildSpans?.length) {
        //add new extra characters
        setExtraChars(extraChars + 1);
        const newSpan = document.createElement("span"); // -> <span></span>
        newSpan.innerText = e.key;
        newSpan.className = "char incorrect extra right-current";
        allChildSpans[currCharIndex - 1].classList.remove("right-current");
        wordSpanRef[currWordIndex].current?.append(newSpan);
        setCurrCharIndex(currCharIndex + 1);
        return;
      }
      console.log(
        "Pressed " + e.key + "curr " + allChildSpans[currCharIndex].innerHTML
      );
      if (e.key === allChildSpans[currCharIndex].innerHTML) {
        allChildSpans[currCharIndex].className = "char correct";
        setCorrectChars(correctChars + 1);
        if (
          currWordIndex === words.current.length - 1 &&
          currCharIndex === allChildSpans.length - 1
        ) {
          clearInterval(intervalId);
          setCurrWordIndex(currWordIndex + 1);
          setTestEnd(true);
          return;
        }
      } else {
        allChildSpans[currCharIndex].className = "char incorrect";
        setIncorrectChar(incorrectChars + 1);
      }
      if (currCharIndex + 1 === allChildSpans.length) {
        allChildSpans[currCharIndex].className += " right-current";
      } else {
        allChildSpans[currCharIndex + 1].className = "char current";
      }
    }
    setCurrCharIndex(currCharIndex + 1);
  };

  // const handleDialogBoxEvents = (e) => {
  //   if (e.keyCode === 32) {
  //     //logic for redo game
  //     e.preventDefault();
  //     redoTest();
  //     setOpen(false);
  //     return;
  //   }
  //   if (e.keyCode === 9 || e.keyCode === 13) {
  //     //logic for reset game
  //     e.preventDefault();
  //     resetTest();
  //     setOpen(false);
  //     return;
  //   }

  //   e.preventDefault();
  //   setOpen(false);
  //   startTimer();
  // };

  const resetWordSpanRefClassname = () => {
    wordSpanRef.map((i) => {
      if (i.current) {
        Array.from(i.current.children).map((j) => {
          if (j.className.includes("extra")) {
            j.remove();
          }
          j.className = "char";
        });
      }
    });
    if (wordSpanRef[0].current)
      wordSpanRef[0].current.children[0].className = "char current";
  };

  const calculateWPM = () => {
    return Math.round(
      correctChars / 5 / ((graphData[graphData.length - 1][0] + 1) / 60)
    );
  };

  const calculateAccuracy = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
    if (wordSpanRef[0].current)
      wordSpanRef[0].current.children[0].className = "char current";
  }, []);

  useLayoutEffect(() => {
    if (initialRender) {
      console.log("running");
      resetTest();
    } else {
      setInitialRender(true);
    }
  }, [testSeconds, testWords, testMode]);

  return (
    <div className="typingBackgroundColor">
      <ContentWrapper props="w-screen min-h-screen flex flex-col gap-4">
        <Menu countDown={countDown} />
        {testEnd ? (
          <TypingResult
            wpm={calculateWPM()}
            faults={countLookedOnKeyboard.current}
            accuracy={calculateAccuracy()}
            graphData={graphData}
            duration={testTime}
          />
        ) : (
          <>
            <CameraComponent
              isGameStarted={testStart}
              countFaults={countKeyboardFaults}
            />
            <div onClick={focusInput}>
              <div
                className={clsx(
                  "relative w-full flex flex-wrap gap-4 overflow-hidden select-none font-mono text-pretty"
                )}
              >
                {words.current.map((word, index) => (
                  <span
                    ref={wordSpanRef[index]}
                    key={index}
                    className={clsx(
                      "word",
                      currWordIndex === index && "underline underline-offset-8"
                    )}
                  >
                    {word.split("").map((char, i) => (
                      <span className={clsx("letter")} key={i}>
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        <input
          type="text"
          className="absolute left-0 top-12 opacity-0 -z-0"
          ref={inputRef}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </ContentWrapper>
    </div>
  );
};

export default TypingPage;
