function StatusBadge({ status }) {
    const statusClass = `status-badge ${status.toLowerCase().replace(" ", "-")}`;
  
    return <span className={statusClass}>{status}</span>;
  }
  
  export default StatusBadge;