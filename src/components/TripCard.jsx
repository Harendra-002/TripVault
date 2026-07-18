import API from "../api/api";

function TripCard({ trip, onDelete, onEdit }) {
  const deleteTrip = async () => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Delete this trip?")) return;

    try {
      await API.delete(`/trips/${trip._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDelete();
    } catch (err) {
      alert("Failed to delete trip");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        marginBottom: "25px",
      }}
    >
      {trip.coverImage && (
        <img
          src={trip.coverImage}
          alt={trip.title}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
          }}
        />
      )}

      <div style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "8px", color: "#2563eb" }}>
          {trip.title}
        </h2>

        <p><strong>📍 Destination:</strong> {trip.destination}</p>

        <p>
          <strong>📅 Dates:</strong>{" "}
          {new Date(trip.startDate).toLocaleDateString()} -{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>

        <p>
          <strong>⭐ Rating:</strong> {trip.rating}/5
        </p>

        <p style={{ marginTop: "10px" }}>
          {trip.description}
        </p>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => onEdit(trip)}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            ✏ Edit
          </button>

          <button
            onClick={deleteTrip}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
