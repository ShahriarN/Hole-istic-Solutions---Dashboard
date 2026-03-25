import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Overview from "./pages/Overview";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import ReportDetails from "./pages/ReportDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/:id" element={<ReportDetails />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;