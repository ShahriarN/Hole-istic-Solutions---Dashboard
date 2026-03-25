import mockReports from "../data/mockReports";

function DashboardStats() {
  const totalReports = mockReports.length;
  const openReports = mockReports.filter(
    (report) => report.status === "Open"
  ).length;
  const inProgressReports = mockReports.filter(
    (report) => report.status === "In Progress"
  ).length;
  const resolvedReports = mockReports.filter(
    (report) => report.status === "Resolved"
  ).length;
  const reportsToday = mockReports.filter(
    (report) => report.date === "2026-03-10"
  ).length;

  const stats = [
    { label: "Total Reports", value: totalReports },
    { label: "Reports Today", value: reportsToday },
    { label: "Open Reports", value: openReports },
    { label: "In Progress Reports", value: inProgressReports },
    { label: "Resolved Reports", value: resolvedReports },
    
  ];

  return (
    <div className="stats-section">
      {stats.map((stat, index) => (
        <div className="stat-card compact-stat-card" key={index}>
          <span className="stat-inline-text">
            {stat.label}: <strong>{stat.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;