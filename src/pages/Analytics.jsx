import { useState } from "react";
import Layout from "../components/Layout";

function Analytics() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      showSearch={false}
    >
      <div className="dashboard-page">
        <h1>Analytics</h1>
        <p>Analyze reporting trends and operational performance.</p>

        <div className="analytics-placeholder">
          Charts and analytics will appear here
        </div>
      </div>
    </Layout>
  );
}

export default Analytics;