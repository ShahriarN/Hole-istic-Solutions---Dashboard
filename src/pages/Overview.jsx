import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import DashboardStats from "../components/DashboardStats";
import ReportMap from "../components/ReportMap";
import ReportTable from "../components/ReportTable";
import mockReports from "../data/mockReports";

function Overview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReportId, setSelectedReportId] = useState(null);
  const navigate = useNavigate();
  const [hoveredReportId, setHoveredReportId] = useState(null);
  const recentReports = mockReports.slice(0, 10);

  const selectedReport =
    recentReports.find(
      (report) => String(report.id) === String(selectedReportId)
    ) || null;

  function handleViewSelectedReport() {
    if (!selectedReportId) return;
    navigate(`/reports/${selectedReportId}`);
  }

  function handleSelectReport(report) {
    setSelectedReportId((prev) =>
      String(prev) === String(report.id) ? null : report.id
    );
  }

  return (
    <Layout
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      showSearch={false}
    >
      <div className="dashboard-page overview-page">
        <div className="overview-header">
          <div>
            <h1>Overview</h1>
            <p>Monitor and manage pothole reports across the city.</p>
          </div>
        </div>

        <DashboardStats />

        <div className="overview-main-grid">
          <div className="overview-left-column">
            <ReportTable
              reports={recentReports}
              searchTerm={searchTerm}
              selectedReportId={selectedReportId}
              hoveredReportId={hoveredReportId}
              onReportSelect={handleSelectReport}
              onReportHover={(report) => setHoveredReportId(report.id)}
              onReportHoverEnd={() => setHoveredReportId(null)}
            />

            <div className="recent-reports-footer">
              Showing 10 recent reports.
              <button
                type="button"
                className="view-all-reports-button"
                onClick={() => navigate("/reports")}
              >
                View all reports →
              </button>
            </div>
          </div>

          <div className="map-column">
            <ReportMap
              reports={recentReports}
              selectedReportId={selectedReportId}
              hoveredReportId={hoveredReportId}
              onReportSelect={handleSelectReport}
            />

            <div className="map-action-bar">
              <div className="selected-report-indicator">
                {selectedReport
                  ? `Selected: Report #${selectedReport.id} - ${selectedReport.location}`
                  : "Selected: None"}
              </div>

              <button
                type="button"
                className="view-report-button"
                onClick={handleViewSelectedReport}
                disabled={!selectedReportId}
              >
                View Selected Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Overview;