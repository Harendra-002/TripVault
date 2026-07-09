import { useState } from "react";
import API from "../api/api";

function TripForm({ onTripAdded }) {
  const [form, setForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    rating: 5,
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
      await API.post("/trips", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Trip Added!");

      setForm({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        description: "",
        rating: 5,
      });

      onTripAdded();
    } catch (err) {
      alert("Failed to add trip");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Trip</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="destination"
        placeholder="Destination"
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
        placeholder="Description"
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

      <button type="submit">Add Trip</button>
    </form>
  );
}

export default TripForm;
