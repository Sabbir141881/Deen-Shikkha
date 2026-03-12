import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { QUIZ_DATA } from '../data';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export default function Quiz() {
  const [questions, setQuestions] = useState<typeof QUIZ_DATA>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    // Shuffle and pick 5 questions
    const shuffled = [...QUIZ_DATA].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
  }, []);

  const handleAnswerOptionClick = (option: string) => {
    if (selectedOption || questions.length === 0) return;
    setSelectedOption(option);

    if (option === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    const shuffled = [...QUIZ_DATA].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 font-sans flex items-center justify-center transition-colors">
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">ইসলামিক <span className="text-emerald-600 dark:text-emerald-400">কুইজ</span></h1>
          <p className="text-slate-600 dark:text-slate-400">আপনার জ্ঞান যাচাই করুন।</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
          {showScore ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">ফলাফল</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                আপনি {questions.length} টির মধ্যে <span className="font-bold text-emerald-600 dark:text-emerald-400">{score}</span> টি সঠিক উত্তর দিয়েছেন।
              </p>
              <button 
                onClick={resetQuiz}
                className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <RefreshCw size={20} /> আবার চেষ্টা করুন
              </button>
            </div>
          ) : (
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">প্রশ্ন {currentQuestion + 1}/{questions.length}</span>
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500">স্কোর: {score}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 leading-relaxed">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === questions[currentQuestion].correctAnswer;
                  
                  let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all font-medium flex justify-between items-center ";
                  
                  if (isSelected) {
                    if (isCorrect) {
                      buttonClass += "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400";
                    } else {
                      buttonClass += "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400";
                    }
                  } else {
                    buttonClass += "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300";
                  }

                  return (
                    <button 
                      key={index} 
                      onClick={() => handleAnswerOptionClick(option)}
                      className={buttonClass}
                      disabled={selectedOption !== null}
                    >
                      {option}
                      {isSelected && (
                        isCorrect ? <CheckCircle size={20} className="text-emerald-500 dark:text-emerald-400" /> : <XCircle size={20} className="text-red-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
