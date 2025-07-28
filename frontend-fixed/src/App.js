// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./layout/Home";
import PhysicalDiagnosis from "./features/physical/PhysicalDiagnosis";
import AuthPortal from "./auth/AuthPortal";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPortal />} />
          <Route path="/physical" element={<PhysicalDiagnosis />} />
          {/* add more routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
