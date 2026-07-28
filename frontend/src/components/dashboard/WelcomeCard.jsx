function WelcomeCard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-card">
      <h2>Welcome 👋</h2>
      <p>Hello, {user?.name || "Investor"}</p>
      <p>Ready to explore today's market?</p>
    </div>
  );
}

export default WelcomeCard;
