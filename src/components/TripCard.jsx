import API from "../api/api";

function TripCard({ trip, onDelete, onEdit }) {
  const deleteTrip = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      await API.delete(`/trips/${trip._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Trip Deleted!");
      onDelete();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  return (
    <div
      
      style={{
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "20px",
  margin: "20px 0",
  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  transition: "0.3s",
}}

    >
      <h2 style={{ color: "#1e40af", marginBottom: "10px" }}>
  ✈️ {trip.title}
</h2>

      <p><strong>Destination:</strong> {trip.destination}</p>

      <p>
        <strong>Dates:</strong> {trip.startDate.slice(0, 10)} - {trip.endDate.slice(0, 10)}
      </p>

      <p><strong>Description:</strong> {trip.description}</p>

      <p><strong>Rating:</strong> ⭐ {trip.rating}/5</p>

      <div style={{ marginTop: "15px" }}>
        
        <button
  style={{
    marginRight: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
  onClick={onEdit}
>
  ✏️ Edit
</button>

        <button
  style={{
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
  onClick={deleteTrip}
>
  🗑 Delete
</button>
      </div>
    </div>
  );
}

export default TripCard;
