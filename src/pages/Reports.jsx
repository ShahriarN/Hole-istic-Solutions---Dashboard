import { useState } from "react";
import Layout from "../components/Layout";
import ReportTable from "../components/ReportTable";
import ReportMap from "../components/ReportMap";
import mockReports from "../data/mockReports";

function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  function handleSort(columnKey) {
    setSortConfig((current) => {
      if (current.key === columnKey) {
        return {
          key: columnKey,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }

      return {
        key: columnKey,
        direction: "asc",
      };
    });
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
      <div className="dashboard-page reports-page">
        <div className="page-header">
          <div>
            <h1>Reports & Map</h1>
            <p>View and manage all submitted pothole reports.</p>
          </div>
        </div>

        <div className="reports-toolbar">
          <input
            type="text"
            className="reports-search"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="All">All Severities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="reports-main-grid">
          <div className="reports-left-column">
            <ReportTable
              title="All Reports"
              reports={mockReports}
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              severityFilter={severityFilter}
              selectedReportId={selectedReportId}
              onReportSelect={handleSelectReport}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>

          <div className="map-column">
            <ReportMap
              reports={mockReports.filter((report) => {
                const matchesSearch =
                  report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  report.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  report.severity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  String(report.id).includes(searchTerm);

                const matchesStatus =
                  statusFilter === "All" || report.status === statusFilter;

                const matchesSeverity =
                  severityFilter === "All" || report.severity === severityFilter;

                return matchesSearch && matchesStatus && matchesSeverity;
              })}
              selectedReportId={selectedReportId}
              onReportSelect={handleSelectReport}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Reports;