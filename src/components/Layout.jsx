import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children, searchTerm, setSearchTerm, showSearch = false }) {
  return (
    <>
      <Sidebar />
      <div className="main-area">
        <Topbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showSearch={showSearch}
        />
        <main className="main-content">{children}</main>
      </div>
    </>
  );
}

export default Layout;