import { createContext } from "react";

interface Question {
  id: string;
  url?: string;
  title: string;
  status: string;
  dateAdded: string;
  daysLeft: number;
  deleteQuestion?: (id: string) => void;
}

interface QuestionContextType {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  deleteQuestion: (id: string) => void;
}

const QuestionContext = createContext<QuestionContextType | null>(null);

export default QuestionContext;