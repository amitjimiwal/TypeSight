import { ResultData } from "@/redux-store/slices/resultslice";
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const generateChartData = (results: ResultData[]) => {
     const labels = results.map((test) => {
          const d = new Date(test.createdAt);
          return `${d.getDate() + month[d.getMonth()]}`
     })
     const scoresval = results.map((v) => v.score);
     const accuracyval = results.map((v) => v.accuracy);
     return { labels, scoresval, accuracyval };
}
export { generateChartData };