// layout/Layout.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatbotTrigger from "../features/chatbot/ChatbotTrigger";



const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatbotTrigger />
    </>
  );
};

export default Layout;
