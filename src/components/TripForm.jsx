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

const [photo, setPhoto] = useState(null);

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
      const tripRes = await API.post("/trips", form, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

if (photo) {
  const formData = new FormData();
  formData.append("photo", photo);

  try {
  await API.post(
    `/trips/${tripRes.data._id}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
} catch (err) {
  console.log("UPLOAD ERROR:", err.response?.data || err.message);
  throw err;
}



}
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
  console.log(err.response?.data);
  alert(err.response?.data?.message || err.message);
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
<input
  type="file"
  accept="image/*"
  onChange={(e) => setPhoto(e.target.files[0])}
/>
<br /><br />

      <button type="submit">Add Trip</button>
    </form>
  );
}

export default TripForm;
