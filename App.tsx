import React, { useState } from 'react';
import { TabType } from './types';
import Calculator from './components/Calculator';
import About from './components/About';
import FoodList from './components/FoodList';
import Disclaimer from './components/Disclaimer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'calculator' | 'about' | 'food-list' | 'disclaimer'>('calculator');
  const [targetTab, setTargetTab] = useState<TabType | undefined>(undefined);

  const handleNavigate = (page: string, tab?: TabType) => {
    if (page === 'calculator') {
      setCurrentPage('calculator');
      if (tab) {
        setTargetTab(tab);
      }
    } else if (page === 'about') {
      setCurrentPage('about');
    } else if (page === 'food-list') {
      setCurrentPage('food-list');
    } else if (page === 'disclaimer') {
      setCurrentPage('disclaimer');
    }
  };

  return (
    <>
      {currentPage === 'calculator' && (
        <Calculator initialTab={targetTab} onNavigate={handleNavigate} />
      )}
      {currentPage === 'about' && (
        <About onNavigate={handleNavigate} />
      )}
      {currentPage === 'food-list' && (
        <FoodList onNavigate={handleNavigate} />
      )}
      {currentPage === 'disclaimer' && (
        <Disclaimer onNavigate={handleNavigate} />
      )}
    </>
  );
};

export default App;