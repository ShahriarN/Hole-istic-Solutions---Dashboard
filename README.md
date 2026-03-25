# Pothole Management Dashboard

This dashboard is part of our capstone project developed for municipal pothole reporting and management. It is designed for internal use by staff to monitor, review, and manage submitted pothole reports.

## Overview

The dashboard provides a centralized interface to:
- View incoming pothole reports
- Track report status (Submitted → Validated → Scheduled → Completed)
- Analyze report data through a map and summary metrics
- Search, filter, and sort reports efficiently

This application is separate from the public-facing submission form and is intended for administrative use only.

## Tech Stack

- React (with Vite)
- JavaScript
- CSS
- Leaflet / React-Leaflet (map integration)
- OpenStreetMap (map tiles)

## Features

- Dashboard overview with key statistics (total reports, open, in progress, resolved)
- Interactive report table with:
  - Search
  - Status filtering
  - Column sorting
  - Pagination
- Report details view
- Map view showing report locations
- Status update workflow for report lifecycle
- Responsive layout with fixed sidebar and topbar