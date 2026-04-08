import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import mockReports from "../data/mockReports";

function Analytics() {
  const [searchTerm, setSearchTerm] = useState("");

  const analytics = useMemo(() => {
    const reports = [...mockReports].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const totalReports = reports.length;

    const statusCounts = {
      Open: 0,
      "In Progress": 0,
      Resolved: 0,
    };

    const severityCounts = {
      High: 0,
      Medium: 0,
      Low: 0,
    };  

    const locationCounts = {};
    const reportsByDate = {};

    reports.forEach((report) => {
      statusCounts[report.status] = (statusCounts[report.status] || 0) + 1;
      severityCounts[report.severity] =
        (severityCounts[report.severity] || 0) + 1;
      locationCounts[report.location] = (locationCounts[report.location] || 0) + 1;
      reportsByDate[report.date] = (reportsByDate[report.date] || 0) + 1;
    });

    const resolvedCount = statusCounts.Resolved;
    const openCount = statusCounts.Open;
    const inProgressCount = statusCounts["In Progress"];
    const highSeverityCount = severityCounts.High;

    const resolutionRate =
      totalReports === 0 ? 0 : Math.round((resolvedCount / totalReports) * 100);

    const activeCases = openCount + inProgressCount;

    const topLocations = Object.entries(locationCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const allDates = Object.keys(reportsByDate).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    const recentTrend = allDates.slice(-7).map((date) => ({
      date,
      count: reportsByDate[date],
    }));

    const highestTrendValue = Math.max(
      ...recentTrend.map((item) => item.count),
      1
    );

    const statusBreakdown = Object.entries(statusCounts).map(([label, value]) => ({
      label,
      value,
      percent: totalReports === 0 ? 0 : Math.round((value / totalReports) * 100),
    }));

    const severityBreakdown = Object.entries(severityCounts).map(
      ([label, value]) => ({
        label,
        value,
        percent: totalReports === 0 ? 0 : Math.round((value / totalReports) * 100),
      })
    );

    const newestReport = reports[reports.length - 1] || null;
    const oldestReport = reports[0] || null;

    const insights = [
      `${activeCases} reports still need action.`,
      `${highSeverityCount} reports are marked high severity.`,
      `${resolutionRate}% of reports in the dataset are resolved.`,
      topLocations[0]
        ? `${topLocations[0][0]} is currently the top hotspot in the dataset.`
        : "No hotspot data available.",
    ];

    return {
      totalReports,
      resolvedCount,
      openCount,
      inProgressCount,
      highSeverityCount,
      resolutionRate,
      activeCases,
      topLocations,
      recentTrend,
      highestTrendValue,
      statusBreakdown,
      severityBreakdown,
      newestReport,
      oldestReport,
      insights,
    };
  }, []);

  return (
    <Layout
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      showSearch={false}
    >
      <div className="dashboard-page analytics-page">
        <div className="analytics-header">
          <div>
            <h1>Analytics</h1>
            <p>Analyze reporting trends and operational performance.</p>
          </div>
        </div>

        <div className="analytics-kpi-grid">
          <div className="analytics-card kpi-card">
            <span className="kpi-label">Total Reports</span>
            <strong className="kpi-value">{analytics.totalReports}</strong>
            <span className="kpi-subtext">
              Dataset range: {analytics.oldestReport?.date} to {analytics.newestReport?.date}
            </span>
          </div>

          <div className="analytics-card kpi-card">
            <span className="kpi-label">Active Cases</span>
            <strong className="kpi-value">{analytics.activeCases}</strong>
            <span className="kpi-subtext">
              Open + In Progress reports
            </span>
          </div>

          <div className="analytics-card kpi-card">
            <span className="kpi-label">Resolution Rate</span>
            <strong className="kpi-value">{analytics.resolutionRate}%</strong>
            <span className="kpi-subtext">
              {analytics.resolvedCount} resolved reports
            </span>
          </div>

          <div className="analytics-card kpi-card">
            <span className="kpi-label">High Severity</span>
            <strong className="kpi-value">{analytics.highSeverityCount}</strong>
            <span className="kpi-subtext">
              Reports needing faster attention
            </span>
          </div>
        </div>

        <div className="analytics-main-grid">
          <div className="analytics-card">
            <div className="card-header-row">
              <h2>Status Distribution</h2>
              <span className="card-header-note">Operational workload</span>
            </div>

            <div className="analytics-stack">
              {analytics.statusBreakdown.map((item) => (
                <div key={item.label} className="analytics-bar-row">
                  <div className="analytics-bar-label-row">
                    <span>{item.label}</span>
                    <span>
                      {item.value} ({item.percent}%)
                    </span>
                  </div>

                  <div className="analytics-bar-track">
                    <div
                      className={`analytics-bar-fill status-${item.label
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-card">
            <div className="card-header-row">
              <h2>Severity Distribution</h2>
              <span className="card-header-note">Risk concentration</span>
            </div>

            <div className="analytics-stack">
              {analytics.severityBreakdown.map((item) => (
                <div key={item.label} className="analytics-bar-row">
                  <div className="analytics-bar-label-row">
                    <span>{item.label}</span>
                    <span>
                      {item.value} ({item.percent}%)
                    </span>
                  </div>

                  <div className="analytics-bar-track">
                    <div
                      className={`analytics-bar-fill severity-${item.label.toLowerCase()}`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-card analytics-card-wide">
            <div className="card-header-row">
              <h2>Recent Daily Trend</h2>
              <span className="card-header-note">Last 7 reporting days</span>
            </div>

            <div className="mini-trend-chart">
              {analytics.recentTrend.map((item) => {
                const heightPercent = Math.max(
                  (item.count / analytics.highestTrendValue) * 100,
                  16
                );

                return (
                  <div key={item.date} className="mini-trend-column">
                    <div className="mini-trend-bar-wrap">
                      <div
                        className="mini-trend-bar"
                        style={{ height: `${heightPercent}%` }}
                        title={`${item.date}: ${item.count} report(s)`}
                      />
                    </div>

                    <span className="mini-trend-value">{item.count}</span>
                    <span className="mini-trend-label">
                      {item.date.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="analytics-card">
            <div className="card-header-row">
              <h2>Top Hotspots</h2>
              <span className="card-header-note">Most reported locations</span>
            </div>

            <div className="hotspot-list">
              {analytics.topLocations.map(([location, count], index) => (
                <div key={location} className="hotspot-item">
                  <div className="hotspot-rank">{index + 1}</div>
                  <div className="hotspot-content">
                    <div className="hotspot-location">{location}</div>
                    <div className="hotspot-meta">{count} report(s)</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-card">
            <div className="card-header-row">
              <h2>System Insights</h2>
              <span className="card-header-note">Quick interpretation</span>
            </div>

            <div className="insight-list">
              {analytics.insights.map((insight, index) => (
                <div key={index} className="insight-item">
                  {insight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Analytics;