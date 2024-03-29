import React from "react";
import { useNavigate } from "react-router";

const TypingTest = () => {
  const navigate = useNavigate();
  return (
    <div>
      TypingTest Page{" "}
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go Home
      </button>
    </div>
  );
};

export default TypingTest;
