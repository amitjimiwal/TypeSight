import { SetStateAction, createContext, useState, Dispatch } from "react";
import React from "react";
export type TestModes = "words" | "sentences";
interface TypingType {
  testSeconds: number;
  setTestSeconds: Dispatch<SetStateAction<number>>;
  testWords: number;
  setTestWords: Dispatch<SetStateAction<number>>;
  testMode: TestModes;
  setTestMode: Dispatch<SetStateAction<TestModes>>;
}
export const TestModeContext = createContext<TypingType>({
  testSeconds: 30,
  setTestSeconds: () => {},
  testMode: "words",
  setTestMode: () => {},
  testWords: 50,
  setTestWords: () => {},
});

export const TestModeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [testMode, setTestMode] = useState<TestModes>("words"); // time or word
  const [testSeconds, setTestSeconds] = useState(15);
  const [testWords, setTestWords] = useState(10); // 10 or 20 or 30

  const values = {
    testSeconds,
    setTestSeconds,
    testWords,
    setTestWords,
    testMode,
    setTestMode,
  };

  return (
    <TestModeContext.Provider value={values}>
      {children}
    </TestModeContext.Provider>
  );
};
