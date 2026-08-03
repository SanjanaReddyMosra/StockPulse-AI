import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import DashboardStats from "../components/dashboard/DashboardStats";
import MarketOverview from "../components/dashboard/MarketOverview";
import Portfolio from "../components/dashboard/PortfolioCard";
import Watchlist from "../components/dashboard/WatchlistCard";
import AIInsights from "../components/dashboard/AIInsights";
import Charts from "../components/dashboard/Charts";
import StockDetails from "../components/dashboard/StockDetails";
import News from "../components/dashboard/NewsCard";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import "../styles/layout.css";
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content">
          <WelcomeBanner/>
          <DashboardStats />
          {/* Hero Section */}
          <MarketOverview />

          {/* Portfolio & Watchlist */}
          <div className="dashboard-grid">
            <Portfolio />
            <Watchlist />
          </div>

          {/* AI Recommendation */}
          <AIInsights />

          {/* Price History */}
          <Charts />

          {/* Technical Details */}
          <StockDetails />

          {/* Latest News */}
          <News />
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;