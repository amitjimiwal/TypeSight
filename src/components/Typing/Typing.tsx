import React from "react";
type TypeProps = {
  text: string;
};
const Typing = ({ text }: TypeProps) => {
  return <div>
     {text}
  </div>;
};

export default Typing;
