import React from "react";

const Control = () => {
  return (
    <nav className="w-full flex flex-col gap-5 p-3 sm:flex-row sm:justify-between sm:p-5 shadow-2xl rounded-xl text-white bg-subColor">
      <h1 className="font-bold text-3xl flex items-center gap-2">
        <img src="/logo.png" alt="Typesight Logo" className="h-10 w-10" />
        TypeSight
      </h1>
      <div className="flex justify-end gap-5">
        {/* <select className="px-3 rounded-xl bg-white text-black">
          <option>30s</option>
          <option>60s</option>
        </select> */}
        {/* <select className="px-3 rounded-xl bg-white text-black">
          <option>words</option>
          <option>sentences</option>
        </select> */}
      </div>
    </nav>
  );
};

export default Control;
