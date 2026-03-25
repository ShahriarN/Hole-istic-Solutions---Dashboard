import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "./StatusBadge";
import SeverityBadge from "./SeverityBadge";

function ReportTable({
  reports = [],
  searchTerm = "",
  selectedReportId = null,
  onReportSelect,
  statusFilter = "All",
  severityFilter = "All",
  sortConfig = { key: "date", direction: "desc" },
  onSort = () => {},
  title = "Recent Reports",
}) {
  const [popupReport, setPopupReport] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 20;

  useEffect(() => {
    setCurrentPage(1);
    setPopupReport(null);
  }, [searchTerm, statusFilter, severityFilter, sortConfig, reports]);

  const filteredReports = useMemo(() => {
    const filtered = reports.filter((report) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        report.location.toLowerCase().includes(search) ||
        report.status.toLowerCase().includes(search) ||
        report.severity.toLowerCase().includes(search) ||
        String(report.id).includes(search);

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      const matchesSeverity =
        severityFilter === "All" || report.severity === severityFilter;

      return matchesSearch && matchesStatus && matchesSeverity;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "status") {
        const statusOrder = {
          Open: 1,
          "In Progress": 2,
          Resolved: 3,
        };

        aValue = statusOrder[a.status];
        bValue = statusOrder[b.status];
      }

      if (sortConfig.key === "severity") {
        const severityOrder = {
          Low: 1,
          Medium: 2,
          High: 3,
        };

        aValue = severityOrder[a.severity];
        bValue = severityOrder[b.severity];
      }

      if (sortConfig.key === "location") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortConfig.key === "date") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }

      return 0;
    });

    return filtered;
  }, [reports, searchTerm, statusFilter, severityFilter, sortConfig]);

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  const startRecord =
    filteredReports.length === 0 ? 0 : (currentPage - 1) * reportsPerPage + 1;

  const endRecord = Math.min(
    currentPage * reportsPerPage,
    filteredReports.length
  );

  function getSortArrow(columnKey) {
    if (sortConfig.key !== columnKey) {
      return "";
    }

    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  }

  function goToPreviousPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  function goToNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  function handleRowClick(report) {
    setPopupReport((prev) =>
      prev && String(prev.id) === String(report.id) ? null : report
    );

    if (onReportSelect) {
      onReportSelect(report);
    }
  }

  function handleOpenReport(event, reportId) {
    event.stopPropagation();
    navigate(`/reports/${reportId}`);
  }

  return (
    <div className="table-section">
      <h2>{title}</h2>

      <table>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                className="sortable-header"
                onClick={() => onSort("id")}
              >
                ID{getSortArrow("id")}
              </button>
            </th>

            <th>
              <button
                type="button"
                className="sortable-header"
                onClick={() => onSort("location")}
              >
                Location{getSortArrow("location")}
              </button>
            </th>

            <th>
              <button
                type="button"
                className="sortable-header"
                onClick={() => onSort("date")}
              >
                Date{getSortArrow("date")}
              </button>
            </th>

            <th>
              <button
                type="button"
                className="sortable-header"
                onClick={() => onSort("status")}
              >
                Status{getSortArrow("status")}
              </button>
            </th>

            <th>
              <button
                type="button"
                className="sortable-header"
                onClick={() => onSort("severity")}
              >
                Severity{getSortArrow("severity")}
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {paginatedReports.map((report) => (
            <Fragment key={report.id}>
              <tr
                className={`clickable-row ${
                  String(report.id) === String(selectedReportId)
                    ? "selected-row"
                    : ""
                }`}
                onClick={() => handleRowClick(report)}
              >
                <td>{report.id}</td>
                <td>{report.location}</td>
                <td>{report.date}</td>
                <td>
                  <StatusBadge status={report.status} />
                </td>
                <td>
                  <SeverityBadge severity={report.severity} />
                </td>
              </tr>

              {popupReport && String(popupReport.id) === String(report.id) && (
                <tr className="popup-row">
                  <td colSpan="5">
                    <div className="inline-popup">
                      <span>
                        Report #{report.id} — {report.location}
                      </span>

                      <button
                        type="button"
                        onClick={(event) => handleOpenReport(event, report.id)}
                      >
                        Open Report
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}

          {paginatedReports.length === 0 && (
            <tr>
              <td colSpan="5">No matching reports found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="pagination-button"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="pagination-info">
            <span>
              Showing {startRecord}-{endRecord} of {filteredReports.length}{" "}
              reports
            </span>
            <span>Page {currentPage} of {totalPages}</span>
          </div>

          <button
            type="button"
            className="pagination-button"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ReportTable;