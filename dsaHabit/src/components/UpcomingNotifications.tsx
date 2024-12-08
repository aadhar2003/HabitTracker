import {useEffect, useContext } from 'react';
import { Button } from './ui/button.tsx';
import QuestionContext from '../context/Questions/QuestionContext.tsx';

interface Question {
  id: string;
  url?: string;
  title: string;
  status: string;
  dateAdded: string;
  daysLeft: number;
}

export function UpcomingNotifications() {
  // Context for managing questions
  const questionContext = useContext(QuestionContext);
  if (!questionContext) {
    throw new Error('QuestionContext is not provided.');
  }

  const { questions, setQuestions } = questionContext;

  // Load notifications from localStorage on component mount
  useEffect(() => {
    const existingQuestionsStr = localStorage.getItem('questions') || '[]';
    const existingQuestions = JSON.parse(existingQuestionsStr);
    const transformedQuestions = existingQuestions.map((question: Question) => ({
      id: question.id,
      title: extractProblemName(question.url),
      status: question.status || 'Not Started',
      daysLeft: calculateDaysLeft(question.dateAdded, question.status),
    }));
    setQuestions(transformedQuestions);
  }, [setQuestions]);

  // Delete question function
  const deleteQuestion = (id: string) => {
    setQuestions((prevQuestions: Question[]) => {
      const updatedQuestions = prevQuestions.filter((question: Question) => question.id !== id);
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
      return updatedQuestions;
    });
  };

  return (
    <div className="flex overflow-x-auto space-x-4 pb-4">
      {questions.slice(0, 4).map((question: Question) => (
        <NotificationCard
          key={question.id}
          {...question}
          deleteQuestion={deleteQuestion}
        />
      ))}
    </div>
  );
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

// Helper function to calculate days left
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

function NotificationCard({
  title,
  status,
  daysLeft,
  id,
  deleteQuestion,
}: {
  title: string;
  status: string;
  daysLeft: number;
  id: string;
  deleteQuestion: (id: string) => void;
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

  return (
    <div className="bg-[#1E1E1E] p-4 rounded-lg min-w-[250px]">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className={`text-sm mt-1 ${getStatusColor(status)}`}>{status}</p>
      <p className="text-sm text-[#FFA500] mt-2">
        {daysLeft === 0 ? 'Due today' : `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`}
      </p>
      <Button
        className={`mt-4 w-full ${
          daysLeft === 0 ? 'bg-[#FFA500] hover:bg-[#FF8C00]' : 'bg-gray-600 hover:bg-gray-700'
        } text-black`}
        disabled={daysLeft > 0}
      >
        {daysLeft === 0 ? 'Review Now' : 'Review Later'}
      </Button>
      <Button
        className="mt-4 w-full bg-red-600 hover:bg-red-700"
        onClick={() => deleteQuestion(id)}
      >
        Delete
      </Button>
    </div>
  );
}
