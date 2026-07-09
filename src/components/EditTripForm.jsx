import { useState } from "react";
import API from "../api/api";

function EditTripForm({ trip, onUpdated, onCancel }) {
  const [form, setForm] = useState({
    title: trip.title,
    destination: trip.destination,
    startDate: trip.startDate.slice(0, 10),
    endDate: trip.endDate.slice(0, 10),
    description: trip.description,
    rating: trip.rating,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    const token = localStorage.getItem("token");

    try {
      await API.put(`/trips/${trip._id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Trip Updated!");
      onUpdated();
    } catch (err) {
      alert("Update Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Trip</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="destination"
        value={form.destination}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
      />
      <br /><br />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="rating"
        min="1"
        max="5"
        value={form.rating}
        onChange={handleChange}
      />
      <br /><br />

      <button type="submit">Save Changes</button>

      <button
        type="button"
        onClick={onCancel}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </button>
    </form>
  );
}

export default EditTripForm;
