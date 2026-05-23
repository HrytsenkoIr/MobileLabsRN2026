import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState('light');
  const [challenges, setChallenges] = useState([
    { id: 1, text: 'Tap 10 times', current: 0, target: 10, done: false },
    { id: 2, text: 'Double-tap 5 times', current: 0, target: 5, done: false },
    { id: 3, text: 'Long press 3 seconds', current: 0, target: 1, done: false },
    { id: 4, text: 'Drag the object', current: 0, target: 1, done: false },
    { id: 5, text: 'Swipe right', current: 0, target: 1, done: false },
    { id: 6, text: 'Swipe left', current: 0, target: 1, done: false },
    { id: 7, text: 'Pinch to resize', current: 0, target: 1, done: false },
    { id: 8, text: 'Reach 100 points', current: 0, target: 100, done: false },
    { id: 9, text: 'Custom: Triple click', current: 0, target: 3, done: false },
  ]);


  useEffect(() => {
    if (score >= 100) {
      setChallenges(prev => prev.map(ch => 
        ch.id === 8 && !ch.done ? { ...ch, current: score, done: true } : ch
      ));
    }
  }, [score]);

  const updateChallenge = (id, amount = 1) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === id && !ch.done) {
        const nextVal = ch.current + amount;
        return { ...ch, current: nextVal, done: nextVal >= ch.target };
      }
      return ch;
    }));
  };

  const addPoints = (amount) => {
    setScore(prev => prev + amount);
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <AppContext.Provider value={{ score, addPoints, challenges, updateChallenge, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};