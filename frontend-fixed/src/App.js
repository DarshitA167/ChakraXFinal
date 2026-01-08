import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';

import Layout from "./layout/Layout";
import Home from "./layout/Home";
import AuthPage from "./auth/AuthPage";

import MentalChatBot from './features/mental/MentalChatBot';
import MentalQuiz from './features/mental/MentalQuiz';
import MentalSection from "./features/mental/MentalSection";
import PhysicalDiagnosis from './features/physical/PhysicalDiagnosis';
import CyberSection from './features/cyber/CyberSection';



import HomePage from './features/home/HomePage';

import PasswordVault from './features/passwords/PasswordVault';



const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
  <Routes>
    <Route path="/" element={isLoggedIn ? <Layout><HomePage /></Layout> : <AuthPage />} />


    {isLoggedIn && (
      <>
        <Route path="/physical" element={<Layout><PhysicalDiagnosis /></Layout>} />
        <Route path="/mental" element={<Layout><MentalSection /></Layout>} />
        <Route path="/mental/quiz" element={<Layout><MentalQuiz /></Layout>} />
        <Route path="/mental/chat" element={<Layout><MentalChatBot /></Layout>} />
        <Route path="/cyber" element={<Layout><CyberSection /></Layout>} />
        <Route path="/vault" element={<Layout><PasswordVault /></Layout>} />
      </>
    )}

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
</Router>

  );
};

export default App;
