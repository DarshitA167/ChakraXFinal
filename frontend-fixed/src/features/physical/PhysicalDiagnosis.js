import React, { useState } from "react";
// @ts-ignore
import { diagnoseDisease } from "../../services/physicalHealth";

const PhysicalDiagnosis = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const data = await diagnoseDisease(symptoms);
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Physical Security - Disease Diagnosis</h2>
      <input
        type="text"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Enter symptoms (e.g., cough, fever)"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button
        onClick={handleSubmit}
        style={{ width: "100%", padding: "10px", background: "black", color: "white" }}
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Disease"}
      </button>

      {result && (
        <div style={{ marginTop: "15px", background: "#f5f5f5", padding: "10px" }}>
          <p><strong>Disease:</strong> {result.disease}</p>
          <p><strong>Advice:</strong> {result.advice}</p>
        </div>
      )}
    </div>
  );
};

export default PhysicalDiagnosis;
