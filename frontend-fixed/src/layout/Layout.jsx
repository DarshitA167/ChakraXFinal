import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatbotTrigger from "../features/chatbot/ChatbotTrigger";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="layout-main">{children}</main>
      <Footer />
      <ChatbotTrigger />
    </div>
  );
};

export default Layout;
