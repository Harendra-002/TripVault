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
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
        marginBottom: "30px",
        transition: "0.3s",
      }}
    >
      {trip.coverImage && (
        <img
          src={trip.coverImage}
          alt={trip.title}
          style={{
            width: "100%",
            height: "260px",
            objectFit: "cover",
          }}
        />
      )}

      <div style={{ padding: "22px" }}>
        <h2
          style={{
            color: "#2563eb",
            marginBottom: "10px",
          }}
        >
          ✈ {trip.title}
        </h2>

        <p style={{ marginBottom: "8px" }}>
          📍 <strong>{trip.destination}</strong>
        </p>

        <p style={{ marginBottom: "8px" }}>
          📅 {new Date(trip.startDate).toLocaleDateString()} —{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>

        <div
          style={{
            display: "inline-block",
            background: "#fef3c7",
            color: "#92400e",
            padding: "6px 12px",
            borderRadius: "30px",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          ⭐ {trip.rating}/5
        </div>

        <p
          style={{
            color: "#555",
            lineHeight: "1.7",
            marginBottom: "20px",
          }}
        >
          {trip.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => onEdit(trip)}
            style={{
              flex: 1,
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ✏ Edit
          </button>

          <button
            onClick={deleteTrip}
            style={{
              flex: 1,
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
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
       
