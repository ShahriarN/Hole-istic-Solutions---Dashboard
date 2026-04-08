import { useState } from "react";
import mockReports from "../data/mockReports";
import StatusBadge from "../components/StatusBadge";
import SeverityBadge from "../components/SeverityBadge";

const STATUS_STEPS = ["Open", "In Progress", "Resolved"];

const STATUS_DESCRIPTIONS = {
  Open: "Your report has been received and is awaiting review by our team.",
  "In Progress": "A crew has been assigned and work is scheduled or underway.",
  Resolved: "The pothole has been repaired. Thank you for your report!",
};

function ProgressTracker({ status }) {
  const currentIndex = STATUS_STEPS.indexOf(status);

  return (
    <div className="track-progress">
      {STATUS_STEPS.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div className="track-progress-step" key={step}>
            <div
              className={`track-step-circle ${
                isCompleted ? "completed" : isActive ? "active" : "pending"
              }`}
            >
              {isCompleted ? "✓" : index + 1}
            </div>
            <div className="track-step-label">{step}</div>
            {index < STATUS_STEPS.length - 1 && (
              <div
                className={`track-step-line ${isCompleted ? "completed" : ""}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Track() {
  const [inputValue, setInputValue] = useState("");
  const [submittedId, setSubmittedId] = useState(null);
  const [report, setReport] = useState(null);
  const [notFound, setNotFound] = useState(false);

  function handleSearch() {
    const cleaned = inputValue.replace("#", "").trim();
    if (!cleaned) return;

    const found = mockReports.find((r) => String(r.id) === cleaned);
    setSubmittedId(cleaned);

    if (found) {
      setReport(found);
      setNotFound(false);
    } else {
      setReport(null);
      setNotFound(true);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  function handleReset() {
    setInputValue("");
    setSubmittedId(null);
    setReport(null);
    setNotFound(false);
  }

  return (
    <div className="track-page">
      <div className="track-container">

        <div className="track-branding">
            <span className="track-brand-name">Hole-istic Solutions</span>
            <span className="track-brand-tagline">Pothole Reporting & Management</span>
        </div>

        <div className="track-header">
          <h1 className="track-title">Track Your Report</h1>
          <p className="track-subtitle">
            Enter the report ID you received after submitting your pothole
            report to check its current status.
          </p>
        </div>

        <div className="track-search-card">
          <label className="track-label" htmlFor="report-id-input">
            Report ID
          </label>
          <div className="track-input-row">
            <input
              id="report-id-input"
              className="track-input"
              type="text"
              placeholder="e.g. 42"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="track-search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {notFound && (
          <div className="track-result-card track-not-found">
            <p>
              No report found for ID <strong>#{submittedId}</strong>. Please
              double-check your report ID and try again.
            </p>
            <button className="track-reset-button" onClick={handleReset}>
              Try Again
            </button>
          </div>
        )}

        {report && (
          <div className="track-result-card">
            <div className="track-result-header">
              <div>
                <h2 className="track-result-title">Report #{report.id}</h2>
                <p className="track-result-location">{report.location}</p>
              </div>
              <button className="track-reset-button" onClick={handleReset}>
                Search Again
              </button>
            </div>

            <ProgressTracker status={report.status} />

            <p className="track-status-description">
              {STATUS_DESCRIPTIONS[report.status]}
            </p>

            <div className="track-detail-grid">
              <div className="track-detail-item">
                <span className="track-detail-label">Date Submitted</span>
                <span className="track-detail-value">{report.date}</span>
              </div>
              <div className="track-detail-item">
                <span className="track-detail-label">Status</span>
                <span className="track-detail-value">
                  <StatusBadge status={report.status} />
                </span>
              </div>
              <div className="track-detail-item">
                <span className="track-detail-label">Severity</span>
                <span className="track-detail-value">
                  <SeverityBadge severity={report.severity} />
                </span>
              </div>
              <div className="track-detail-item">
                <span className="track-detail-label">Description</span>
                <span className="track-detail-value">{report.description}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Track;