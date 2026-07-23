import TripStats from "../components/TripStats";
import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import TripCard from "../components/TripCard";
import TripForm from "../components/TripForm";
import EditTripForm from "../components/EditTripForm";

function Home() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
const [search, setSearch] = useState("");
const [sort, setSort] = useState("newest");
 

  const navigate = useNavigate();

  const fetchTrips = async (token) => {
    const tripRes = await API.get("/trips", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTrips(tripRes.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const userRes = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(userRes.data);
        await fetchTrips(token);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  const avgRating =
    trips.length > 0
      ? (
          trips.reduce((sum, trip) => sum + trip.rating, 0) /
          trips.length
        ).toFixed(1)
      : 0;

  const totalPlaces = new Set(trips.map((t) => t.destination)).size;
const filteredTrips = [...trips]
  .filter(
    (trip) =>
      trip.title.toLowerCase().includes(search.toLowerCase()) ||
      trip.destination.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sort === "highest") return b.rating - a.rating;
    if (sort === "lowest") return a.rating - b.rating;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "25px",
        background: "#f8fafc",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
        }}
      >
        ✈️ TripVault Dashboard
      </h1>

      {user ? (
        <>
          <h2>Welcome, {user.name} 👋</h2>
          <p>{user.email}</p>
<div
  style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    margin: "20px 0",
  }}
>
  <div
    style={{
      flex: 1,
      background: "#2563eb",
      color: "white",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h3>{trips.length}</h3>
    <p>Total Trips</p>
  </div>

  <div
    style={{
      flex: 1,
      background: "#10b981",
      color: "white",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h3>{totalPlaces}</h3>
    <p>Places Visited</p>
  </div>

  <div
    style={{
      flex: 1,
      background: "#f59e0b",
      color: "white",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h3>{avgRating}</h3>
    <p>Average Rating</p>
  </div>
</div>

<TripStats trips={trips} />
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={logout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                marginRight: "15px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>

            <Link to={`/profile/${user._id}`}>
              <button
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                View My Public Profile
              </button>
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <div>📍 Trips: {trips.length}</div>
            <div>⭐ Avg Rating: {avgRating}</div>
            <div>🌍 Places: {totalPlaces}</div>
          </div>

          <input
            type="text"
            placeholder="🔍 Search by title or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "20px",
            }}
          />

          <hr />

          {editingTrip ? (
            <EditTripForm
              trip={editingTrip}
              onUpdated={() => {
                setEditingTrip(null);
                fetchTrips(localStorage.getItem("token"));
              }}
              onCancel={() => setEditingTrip(null)}
            />
          ) : (
            <TripForm
              onTripAdded={() =>
                fetchTrips(localStorage.getItem("token"))
              }
            />
          )}

          <hr />

          <h2>My Trips</h2>

<div
  style={{
    display: "flex",
    gap: "10px",
    margin: "20px 0",
    flexWrap: "wrap",
  }}
>
  <input
    type="text"
    placeholder="🔍 Search by title or destination..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      flex: 1,
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "8px",
    }}
  />

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    style={{
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    }}
  >
    <option value="newest">Newest</option>
    <option value="highest">Highest Rating</option>
    <option value="lowest">Lowest Rating</option>
  </select>
</div>
          {filteredTrips.length === 0 ? (
            <h3 style={{ textAlign: "center" }}>
              ✈️ No Trips Found
            </h3>
          ) : (
            filteredTrips.map((trip) => (
              <TripCard
                key={trip._id}
                trip={trip}
                onDelete={() =>
                  fetchTrips(localStorage.getItem("token"))
                }
                onEdit={() => setEditingTrip(trip)}
              />
            ))
          )}
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </motion.div>
  );
}

export default Home;
