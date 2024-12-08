import { useContext, useEffect } from 'react';
import QuestionContext from '../context/Questions/QuestionContext.tsx';
import { Button } from '../components/ui/button';

interface Question{
  id: string;
  title: string;
  daysLeft: number;
  status: string;
  url: string;
  dateAdded: string;
  
}
// ... keep the existing calculateDaysLeft function ...
function calculateDaysLeft(solvedDate: string, status: string): number {
  if (!solvedDate) return 0;

  const today = new Date();
  const completionDate = new Date(solvedDate);

  let reviewIntervalDays;
  switch (status.toLowerCase()) {
    case 'solved':
      reviewIntervalDays = 14;
      break;
    case 'hints':
      reviewIntervalDays = 4;
      break;
    case 'tutorial':
      reviewIntervalDays = 2;
      break;
    case 'gaveup':
      reviewIntervalDays = 1;
      break;
    default:
      reviewIntervalDays = 0;
  }

  const nextReviewDate = new Date(completionDate);
  nextReviewDate.setDate(nextReviewDate.getDate() + reviewIntervalDays);

  const diffTime = nextReviewDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
}

function extractProblemName(url: string | undefined): string {
  if (!url) return 'Unknown Problem';
  
  try {
    // Match the pattern between /problems/ and /description or end of string
    const match = url.match(/\/problems\/([^/]+)/);
    if (!match) return 'Unknown Problem';
    
    // Convert kebab-case to Title Case
    return match[1]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch (error) {
    console.error('Error extracting problem name:', error);
    return 'Unknown Problem';
  }
}

export default function Notifications() {
  const { questions, setQuestions, deleteQuestion } = useContext(QuestionContext);
  

  useEffect(() => {
    const existingQuestionsStr = localStorage.getItem('questions') || '[]';
    const existingQuestions = JSON.parse(existingQuestionsStr);
    const transformedData = existingQuestions.map((question: Question) => ({
      ...question,
      title: extractProblemName(question.url),
      daysLeft: calculateDaysLeft(question.dateAdded, question.status),
    }));
    setQuestions(transformedData);
  }, [setQuestions]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Notifications</h1>
      <div className="space-y-4">
        {questions.map((question: Question) => (
          <NotificationCard
            key={question.id}
            {...question}
            deleteQuestion={deleteQuestion}
          />
        ))}
      </div>
    </div>
  );
}

function NotificationCard({ 
  title, 
  daysLeft, 
  status, 
  url ,
  deleteQuestion,
  id

}: { 
  title: string; 
  daysLeft: number; 
  status: string;
  url: string;
  deleteQuestion: (id: string) => void;
  id: string;
}) {
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'solved independently':
        return 'text-green-400';
      case 'used hints':
        return 'text-yellow-400';
      case 'watched tutorial':
        return 'text-orange-400';
      case 'gave up':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const handleReview = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#1E1E1E] p-4 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-[#FFA500]">
          {daysLeft === 0 ? "Due Today" : daysLeft > 0 ? `Due in ${daysLeft} days` : `Overdue by ${Math.abs(daysLeft)} days`}
        </p>
        <p className={`text-sm ${getStatusColor(status)}`}>{status}</p>
      </div>
      <div className="space-x-2">
        <Button 
          className={`${daysLeft === 0 ? 'bg-[#FFA500] hover:bg-[#FF8C00]' : 'bg-gray-600 hover:bg-gray-700'} text-black`}
          onClick={handleReview}
        >
          Review Now
        </Button>
        <Button variant="outline" className="border-gray-700 text-gray-300" onClick={() => deleteQuestion(id)}>
          Dismiss
        </Button>
      </div>
    </div>
  );
}

