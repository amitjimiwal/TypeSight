import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
type TypeProps = {
  text: string;
};
const Typing = ({ text }: TypeProps) => {
  const ref=useRef<HTMLInputElement>(null);
  const [time, settime] = useState<number>(30);
  const [istimercompleted, setcomlete] = useState<boolean>(false);
  useEffect(() => {
    const id = setInterval(() => {
      if (!istimercompleted) settime((prev) => prev - 1);
    }, 1000);
    if (istimercompleted) {
      clearInterval(id);
      settime(30);
      toast.success("Times Up");
    }
    return () => clearInterval(id);
  }, [istimercompleted]);
  useEffect(() => {
    if (time === -1) setcomlete(true);
  }, [time]);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div className="w-full relative">
      <input type="text" className="absolute top-10 opacity-0" onChange={()=>{
        console.log("Pressed something")
      }} ref={ref}/>
      <div className="text-2xl font-extrabold text-green-400">{time}s</div>
      <div className="text-justify text-3xl font-bold leading-10 text-gray-500">
        {text}
      </div>
    </div>
  );
};

export default Typing;
