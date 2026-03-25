import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Layout from "../components/Layout";
import mockReports from "../data/mockReports";
import StatusBadge from "../components/StatusBadge";
import SeverityBadge from "../components/SeverityBadge";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function createMarkerIcon(severity) {
  let color = "#22c55e";

  if (severity === "High") color = "#ef4444";
  if (severity === "Medium") color = "#f59e0b";

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.35);
      "></div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -12],
  });
}

function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = mockReports.find((item) => String(item.id) === id);

  if (!report) {
    return (
      <Layout showSearch={false}>
        <div className="page-section">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/reports")}
          >
            ← Back to Reports
          </button>

          <h1>Report Not Found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showSearch={false}>
      <div className="page-section">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/reports")}
        >
          ← Back to Reports
        </button>

        <h1>Report #{report.id}</h1>
        <p>Detailed report information and administrative actions.</p>

        <div className="report-details-layout">
          <div className="details-left">
            <div className="details-card report-info-card">
              <h2>Report Information</h2>
              <p><strong>ID:</strong> {report.id}</p>
              <p><strong>Location:</strong> {report.location}</p>
              <p><strong>Date:</strong> {report.date}</p>
              <p><strong>Status:</strong> <StatusBadge status={report.status} /></p>
              <p><strong>Severity:</strong> <SeverityBadge severity={report.severity} /></p>
              <p className="report-description-line">
                <strong>Description:</strong> {report.description}
              </p>
              <p><strong>Latitude:</strong> {report.latitude}</p>
              <p><strong>Longitude:</strong> {report.longitude}</p>
            </div>

            <div className="details-card">
              <h2>Image</h2>
              <div className="image-placeholder details-large-image">
                Image placeholder
              </div>
            </div>
          </div>

          <div className="details-right">
            <div className="details-card details-map-side-card">
              <h2>Location Map</h2>
              <div className="details-map details-side-map">
                <MapContainer
                  center={[report.latitude, report.longitude]}
                  zoom={15}
                  scrollWheelZoom={true}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker
                    position={[report.latitude, report.longitude]}
                    icon={createMarkerIcon(report.severity)}
                  >
                    <Popup>
                      <div>
                        <p><strong>Report #{report.id}</strong></p>
                        <p>{report.location}</p>
                        <p>Status: {report.status}</p>
                        <p>Severity: {report.severity}</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            <div className="details-card actions-card">
              <h2>Actions</h2>

              <div className="action-buttons">
                <button>Mark In Progress</button>
                <button>Mark Resolved</button>
                <button>Assign Crew</button>
              </div>

              <div className="action-dropdown-row">
                <div className="action-dropdown-group">
                  <label htmlFor="more-actions" className="action-dropdown-label">
                    More Actions
                  </label>

                  <select
                    id="more-actions"
                    className="action-dropdown"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an action
                    </option>
                    <option value="add-note">Add Note</option>
                    <option value="upload-image">Upload Image</option>
                    <option value="notify-crew">Notify Crew</option>
                    <option value="mark-duplicate">Mark as Duplicate</option>
                    <option value="reopen-report">Reopen Report</option>
                    <option value="archive-report">Archive Report</option>
                    <option value="export-report">Export Report</option>
                  </select>
                </div>

                <button type="button" className="apply-action-button">
                  Apply
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReportDetails;