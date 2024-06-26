import useAppDispatch from "@/hooks/useAppDispatch";
import { addResultIfo } from "@/redux-store/slices/resultslice";
import React, { useEffect } from "react";
import ResultGraph from "../TestResultChart";
const data = {
  duration: 30,
  score: 0,
  accuracy: 0,
};
const TypingResult = ({
  wpm,
  accuracy,
  faults,
  graphData,
  duration
}: {
  wpm: number;
  accuracy: number;
  faults: number;
  duration:number;
  graphData: [number, number, number][];
}) => {
  const dispatch = useAppDispatch();
  //   update the data to the database
  function updateData() {
    data.score = wpm >0 ? wpm :0;
    data.accuracy = accuracy >0 ? accuracy :0;
    data.duration=duration || 15;
    if (import.meta.env.VITE_APP_ENV === "development") console.log(data);
    dispatch(addResultIfo(data));
  }
  useEffect(() => {
    updateData();
  }, []);
  return (
    <div className="w-full text-center grid grid-cols-3 gap-10 ">
      <Wrapper>
        <Wrapper>
          <Heading text="Wpm" />
          <Result>
            {" "}
            {wpm} <span className="text-3xl">wpm</span>
          </Result>
        </Wrapper>
        <Wrapper>
          <Heading text="Accuracy" />
          <Result>
            {accuracy} <span className="text-3xl">%</span>
          </Result>
        </Wrapper>
        <Wrapper>
          <Heading text="Faults" />
          <Result>
            {faults} <span className="text-3xl">%</span>
          </Result>
        </Wrapper>
      </Wrapper>
      <Wrapper classname="col-span-2">
        <ResultGraph graphData={graphData} />
      </Wrapper>
    </div>
  );
};
function Wrapper({ children ,classname}: { children: React.ReactNode,classname?:string }) {
  return <div className={classname}>{children}</div>;
}
function Heading({ text }: { text: string }) {
  return (
    <h1 className="text-lg sm:text-4xl font-bold  text-typingText">{text}</h1>
  );
}
function Result({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-2xl sm:text-6xl font-bold  text-mainColor">
      {children}
    </span>
  );
}

export default TypingResult;
