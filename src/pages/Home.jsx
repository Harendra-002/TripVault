import "../App.css";

function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">TripVault</div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1>Welcome to TripVault</h1>

        <p>
          Your smart travel companion for discovering, planning and sharing
          unforgettable trips.
        </p>

        <div className="buttons">
          <button className="primary">Get Started</button>
          <button className="secondary">Explore Trips</button>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why TripVault?</h2>

        <div className="cards">

          <div className="card">
            <h3>🔍 Discover</h3>
            <p>Find amazing destinations around the world.</p>
          </div>

          <div className="card">
            <h3>📅 Plan</h3>
            <p>Create itineraries and organize your trips.</p>
          </div>

          <div className="card">
            <h3>🤝 Share</h3>
            <p>Share experiences with fellow travellers.</p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;
