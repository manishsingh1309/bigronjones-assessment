import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import FunnelA from "./components/FunnelA";
import { initAssessmentTelemetry } from "./lib/tracker";

export default function App() {
  useEffect(() => {
    initAssessmentTelemetry();
  }, []);

  return (
    <BrowserRouter>
      <FunnelA />
    </BrowserRouter>
  );
}
