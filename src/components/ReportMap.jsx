import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const FALLBACK_CENTER = [51.0447, -114.0719];
const DEFAULT_ZOOM = 12;

function MapBounds({ reports, selectedReportId }) {
  const map = useMap();

  useEffect(() => {
    if (!reports.length) return;

    const selectedReport = reports.find(
      (report) => String(report.id) === String(selectedReportId)
    );

    if (selectedReport) {
      map.setView([selectedReport.latitude, selectedReport.longitude], 16, {
        animate: true,
      });
      return;
    }

    const bounds = L.latLngBounds(
      reports.map((report) => [report.latitude, report.longitude])
    );

    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, reports, selectedReportId]);

  return null;
}

function getMarkerColor(severity) {
  if (severity === "High") return "#ef4444";
  if (severity === "Medium") return "#f59e0b";
  return "#22c55e";
}

function createMarkerIcon(severity, isSelected = false) {
  const color = getMarkerColor(severity);
  const size = isSelected ? 24 : 18;
  const borderWidth = isSelected ? 4 : 3;

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:${size}px;
        height:${size}px;
        background:${color};
        border:${borderWidth}px solid white;
        border-radius:50%;
        box-shadow: 0 0 0 ${isSelected ? 6 : 0}px rgba(255,255,255,0.18), 0 2px 8px rgba(0,0,0,0.35);
      "></div>
    `,
    iconSize: [size + 12, size + 12],
    iconAnchor: [(size + 12) / 2, (size + 12) / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

function ReportMap({ reports = [], selectedReportId = null, onReportSelect }) {
  const validReports = reports.filter(
    (report) =>
      typeof report.latitude === "number" &&
      typeof report.longitude === "number" &&
      Number.isFinite(report.latitude) &&
      Number.isFinite(report.longitude)
  );

  const center =
    validReports.length > 0
      ? [validReports[0].latitude, validReports[0].longitude]
      : FALLBACK_CENTER;

  return (
    <div className="map-section">
      <h2>Report Locations</h2>

      <div
        className="map-placeholder"
        style={{ height: "470px", width: "100%", overflow: "hidden" }}
      >
        <MapContainer
          center={center}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapBounds
            reports={validReports}
            selectedReportId={selectedReportId}
          />

          {validReports.map((report) => (
            <Marker
              key={report.id}
              position={[report.latitude, report.longitude]}
              icon={createMarkerIcon(
                report.severity,
                String(report.id) === String(selectedReportId)
              )}
              eventHandlers={{
                click: () => {
                  if (onReportSelect) {
                    onReportSelect(report);
                  }
                },
              }}
            >
              <Popup>
                <div>
                  <p><strong>Report #{report.id}</strong></p>
                  <p>Status: {report.status}</p>
                  <p>Severity: {report.severity}</p>
                  <p>Location: {report.location}</p>
                  <p>Date: {report.date}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          <div className="map-legend leaflet-bottom leaflet-right">
            <div className="map-legend-box">
              <div className="map-legend-title">Severity</div>
              <div className="map-legend-item">
                <span className="legend-dot high"></span>
                High
              </div>
              <div className="map-legend-item">
                <span className="legend-dot medium"></span>
                Medium
              </div>
              <div className="map-legend-item">
                <span className="legend-dot low"></span>
                Low
              </div>
            </div>
          </div>
        </MapContainer>
      </div>
    </div>
  );
}

export default ReportMap;