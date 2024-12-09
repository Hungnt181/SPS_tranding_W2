import Sidebar from "./__component/sidebar/sidebar";
import HomePage from "./home/home";
import HeaderWebsite from "./__component/header/header";
import "./layout.css";

const LayoutWebsite = () => {
  return (
    <>
      <div>
        <header className="header">
          <HeaderWebsite />
        </header>
        <main className="main">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="content_oulet">
            <HomePage />
          </div>
        </main>
      </div>
    </>
  );
};

export default LayoutWebsite;
