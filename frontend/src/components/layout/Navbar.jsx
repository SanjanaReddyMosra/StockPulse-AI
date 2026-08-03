import { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import { getStocks } from "../../api/stockApi";
import "../../styles/navbar.css";

function Navbar() {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  let user = null;

  // Load stocks from backend
  useEffect(() => {
    const loadStocks = async () => {
      try {
        const data = await getStocks();
        setStocks(data);
      } catch (err) {
        console.error("Error loading stocks:", err);
      }
    };

    loadStocks();
  }, []);

  // Filter search suggestions
  useEffect(() => {
    if (!search.trim()) {
      setFiltered([]);
      return;
    }

    const result = stocks.filter((stock) => {
      if (typeof stock === "string") {
        return stock.toLowerCase().includes(search.toLowerCase());
      }

      return (
        stock.symbol?.toLowerCase().includes(search.toLowerCase()) ||
        stock.name?.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFiltered(result.slice(0, 6));
  }, [search, stocks]);

  // Get logged-in user
  try {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Invalid user data:", error);
    localStorage.removeItem("user");
  }

  // Handle stock selection
  const handleSelectStock = (stock) => {
    const symbol = typeof stock === "string" ? stock : stock.symbol;

    setSearch(symbol);
    setFiltered([]);

    localStorage.setItem("selectedStock", symbol);
    const saved =
JSON.parse(
localStorage.getItem("watchlist")
)||[];

if(
!saved.includes(symbol)
){

saved.unshift(symbol);

localStorage.setItem(

"watchlist",

JSON.stringify(saved)

);

}
    window.dispatchEvent(new Event("stockChanged"));
  };

  return (
    <header className="navbar">
      <div className="logo">
        <div className="logo-icon">

<img

src="/logo.png"

alt="StockPulse"

/>

</div>

        <div className="logo-text">
          <h2>StockPulse</h2>
          <span>AI Intelligence</span>
        </div>
      </div>

      <div className="search search-wrapper">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.length > 0 && (
          <div className="search-dropdown">
            {filtered.map((stock, index) => (
              <div
                key={index}
                className="search-item"
                onClick={() => handleSelectStock(stock)}
              >
                {typeof stock === "string" ? (
                  stock
                ) : (
                  <>
                    <strong>{stock.symbol}</strong>

                    <span
                      style={{
                        color: "#94A3B8",
                        fontSize: "12px",
                        display: "block",
                      }}
                    >
                      {stock.name}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="navbar-right">
        <div className="notification">
          <FaBell className="nav-icon" />
          <span className="notification-dot"></span>
        </div>

        <div className="user-info">
          <FaUserCircle className="user-avatar" />

          <div>
            <h4>Welcome</h4>
            <p>{user?.name || "Guest"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;