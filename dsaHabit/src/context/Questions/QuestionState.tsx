import { ReactNode, useState, useEffect } from 'react';
import QuestionContext from './QuestionContext';

interface Question {
  id: string;
  url?: string;
  title: string;
  status: string;
  dateAdded: string;
  daysLeft: number;
  deleteQuestion?: (id: string) => void;
}

type QuestionStateProps = {
  children: ReactNode;
};

const QuestionState = ({ children }: QuestionStateProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  // Load questions from localStorage on component mount
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
    setQuestions(storedQuestions);
  }, []);
  const deleteQuestion = (id: string) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions); // Update state
    localStorage.setItem('questions', JSON.stringify(updatedQuestions)); // Sync with localStorage
  };
  
  return (
    <QuestionContext.Provider value={{questions, setQuestions, deleteQuestion}}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;