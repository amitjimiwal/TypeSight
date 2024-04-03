import { ResultData } from "@/redux-store/slices/resultslice";

const calculateAverage = function (Results: ResultData[]) {
  const n=Results.length;
  const res=Results.reduce((acc,curr)=>{
    acc.averageScore+=curr.score/n;
    acc.averageAccuracy+=curr.accuracy/n;
    return acc;
  },{
    averageScore:0,
    averageAccuracy:0
  });
  return res;
};

export { calculateAverage };
