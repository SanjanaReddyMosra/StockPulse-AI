import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

function Dashboard(){

return(

<>
    <Navbar />

    <div className="dashboard-layout">

        <Sidebar />

        <main className="dashboard-content">

            <MarketOverview />

            <div className="dashboard-grid">

                <Portfolio />

                <Watchlist />

                <News />

                <Charts />

            </div>

        </main>

    </div>

    <Footer />

</>

)

}

export default Dashboard;