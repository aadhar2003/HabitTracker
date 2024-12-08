import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import Home from './pages/Home';
import AddQuestion from './pages/AddQuestion.tsx';
import QuestionDetails from './pages/QuestionDetails.tsx';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import './App.css';
import QuestionState from './context/Questions/QuestionState';

function App() {
  return (
    <Router>
      <QuestionState>
        <div className="App bg-[#121212] text-[#B0B0B0] min-h-screen flex flex-col">
          <main className="flex-grow pb-16">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-question" element={<AddQuestion />} />
            <Route path="/question/:id" element={<QuestionDetails />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <NavigationBar />
      </div>
      </QuestionState>
    </Router>
  );
}

export default App;

