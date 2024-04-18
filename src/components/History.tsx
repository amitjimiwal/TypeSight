import { ResultData } from "@/redux-store/slices/resultslice";
import React from "react";
interface Props {
  results: ResultData[] | undefined;
}
const History: React.FC<Props> = ({ results }) => {
  if (!results) {
    return <div>No Test Reesults</div>;
  }
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border-collapse text-left dark:bg-gray-950 dark:text-gray-50">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 font-medium">WPM</th>
            <th className="px-4 py-3 font-medium">Accuracy</th>
            <th className="px-4 py-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {results?.map((result) => (
            <tr
              key={result.id}
              className="border-b border-gray-200 dark:border-gray-800"
            >
              <td className="px-4 py-3"> {result.score}</td>
              <td className="px-4 py-3">{result.accuracy}</td>
              <td className="px-4 py-3">{new Date(result.createdAt).getDate() +"/"+ new Date(result.createdAt).getMonth()+"/"+new Date(result.createdAt).getFullYear()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
