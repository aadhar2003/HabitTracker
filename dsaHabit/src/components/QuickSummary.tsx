// import {useState,useEffect} from "react";
import { useContext } from "react";
import QuestionContext from "../context/Questions/QuestionContext";
export function QuickSummary() {
  const {questions} = useContext(QuestionContext);
  // const [pendingReviews, setPendingReviews] = useState(0);

  // useEffect(() => {
  //   setPendingReviews(questions.length);
  // }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* <SummaryCard title="Total Questions Tracked" value="50" /> */}
      <SummaryCard
        title="Pending Reviews"
        value={`${questions.length}`}
      />
      {/* <SummaryCard
        title="Success Rate"
        value="78%"
        subtitle="Solved Independently"
      /> */}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-[#1E1E1E] p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-3xl font-bold text-[#FFA500] mt-2">{value}</p>
      {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
