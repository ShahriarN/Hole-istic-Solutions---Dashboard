function SeverityBadge({ severity }) {
    const badgeClass =
      severity === "High"
        ? "high"
        : severity === "Medium"
        ? "medium"
        : "low";
  
    return <span className={`severity-badge ${badgeClass}`}>{severity}</span>;
  }
  
  export default SeverityBadge;