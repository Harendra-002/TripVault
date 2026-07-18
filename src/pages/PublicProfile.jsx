import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function PublicProfile() {
  const { userId } = useParams();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await API.get(`/trips/public/${userId}`);
        setTrips(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTrips();
  }, [userId]);

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto" }}>
      <h1>Traveller Profile</h1>

      {trips.length === 0 ? (
        <p>No public trips found.</p>
      ) : (
        trips.map((trip) => (
          <div
            key={trip._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            {trip.coverImage && (
              <img
                src={trip.coverImage}
                alt={trip.title}
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            )}

            <h2>{trip.title}</h2>

            <p><strong>Destination:</strong> {trip.destination}</p>

            <p>{trip.description}</p>

            <p>⭐ {trip.rating}/5</p>
          </div>
        ))
      )}
    </div>
  );
}

export default PublicProfile;
