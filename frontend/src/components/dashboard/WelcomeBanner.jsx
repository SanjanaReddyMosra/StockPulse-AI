import {
  FaArrowTrendUp,
  FaClock,
} from "react-icons/fa6";

function WelcomeBanner() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if(hour < 12) greeting = "Good Morning";

  if(hour >=12 && hour <17)
      greeting = "Good Afternoon";

  return(

<div className="welcome-banner">

<div>

<span className="welcome-tag">

StockPulse AI

</span>

<h1>

{greeting},
{" "}
{user?.name || "Investor"}

👋

</h1>

<p>

Track the market,
discover AI insights,
and make smarter investment decisions.

</p>

</div>

<div className="market-status">

<div className="status-item">

<FaArrowTrendUp/>

<span>

Market Open

</span>

</div>

<div className="status-item">

<FaClock/>

<span>

Live Updates

</span>

</div>

</div>

</div>

  );

}

export default WelcomeBanner;