import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import TripCard from "../components/TripCard";
import TripForm from "../components/TripForm";
import EditTripForm from "../components/EditTripForm";


function Home() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
const [editingTrip, setEditingTrip] = useState(null);

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

  return (
    <div
  style={{
    maxWidth: "900px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#f8fafc",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  }}
>
      <h1
  style={{
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "10px",
  }}
>
  ✈️ TripVault Dashboard
</h1>
      {user ? (
        <>
          <h2>Welcome, {user.name} 👋</h2>
          <p>{user.email}</p>

          <button
  onClick={logout}
  style={{
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
  }}
>
  Logout
</button>
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

          {trips.length === 0 ? (
            <p>No trips found.</p>
          ) : (
            trips.map((trip) => (
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
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;
