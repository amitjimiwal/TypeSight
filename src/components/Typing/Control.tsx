import React from "react";

const Control = () => {
  return (
    <nav className="w-full flex flex-col gap-5 p-3 sm:flex-row sm:justify-between sm:p-5 shadow-2xl rounded-xl border-2 border-gray-400">
      <h1>TypeSight</h1>
      <div className="flex justify-end gap-5">
        <select className="px-3 rounded-xl bg-gray-200">
          <option>30s</option>
          <option>60s</option>
        </select>
        <select className="px-3 rounded-xl bg-gray-200">
          <option>words</option>
          <option>sentences</option>
        </select>
      </div>
    </nav>
  );
};

export default Control;
