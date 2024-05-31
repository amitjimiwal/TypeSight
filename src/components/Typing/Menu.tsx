import React from "react";
import useTestMode from "@/hooks/useTextContext";
import DashboardIcon from "./DashboardIcon";
import { TestModes } from "@/context/TypingContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Menu = ({ countDown }: { countDown: number }) => {
  const { setTestSeconds, setTestMode, setTestWords } = useTestMode();

  return (
    <div>
      <nav className="w-full flex flex-col gap-5 p-3 sm:flex-row sm:justify-between sm:p-5 shadow-2xl rounded-xl text-white bg-subColor">
        <h1 className="font-bold text-3xl flex items-center gap-2">
          <img src="/logo.png" alt="Typesight Logo" className="h-10 w-10" />
          TypeSight
        </h1>
        <div className="flex gap-5 items-center">
          <Select
            onValueChange={(e) => {
              setTestSeconds(Number(e));
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="15" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15" defaultChecked>
                15s
              </SelectItem>
              <SelectItem value="30">30s</SelectItem>
              <SelectItem value="60">60s</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(e) => {
              setTestMode(e as TestModes);
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="words" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="words" defaultChecked>
                words
              </SelectItem>
              <SelectItem value="sentences">sentences</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(e) => {
              setTestWords(Number(e));
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="50" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50" defaultChecked>
                50
              </SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          {/* <select
            className="rounded-xl text-black"
            onChange={(e) => {
              setTestSeconds(Number(e.target.value));
            }}
          >
            <option disabled>Duration</option>
            <option className="" value={15}>
              15s
            </option>
            <option className="" value={30}>
              30s
            </option>
            <option className="" value={60}>
              60s
            </option>
          </select> */}
          {/* <select
            className="px-3 rounded-xl text-black"
            defaultValue="words"
            onChange={(e) => {
              setTestMode(e.target.value as TestModes);
            }}
          >
            <option disabled>Mode</option>
            <option value="words" defaultChecked>
              words
            </option>
            <option value="sentences">sentences</option>
          </select> */}
          {/* <select className="px-3 rounded-xl bg-white text-black">
            <option>50</option>
            <option>100</option>
          </select> */}
        </div>
        <DashboardIcon />
      </nav>
      <div className="w-full mt-20 font-extrabold text-3xl text-green-300">
        {countDown}
      </div>
    </div>
  );
};

export default Menu;
