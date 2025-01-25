import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postNewWorkshop from "../api/post/post-new-workshop";

function NewWorkshopForm() {
  const navigate = useNavigate();
  const [workshopData, setWorkshopData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    image_url: "",
    location: "",
    category: "",
    coding_language: "",
    organisation: "",
  });

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setWorkshopData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["title", "description", "start_date", "end_date"];
    const isFormValid = requiredFields.every(
      (field) => workshopData[field].trim() !== ""
    );

    if (isFormValid) {
      postNewWorkshop(workshopData)
        .then((response) => {
          navigate(`/workshop/${response.id}`);
        })
        .catch((error) => {
          console.error("Failed to create workshop:", error);
        });
    }
  };

  return (
    <main>
      <h1>Create New Workshop</h1>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={handleChange}
            value={workshopData.title}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            onChange={handleChange}
            value={workshopData.description}
            rows="4"
          />
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            id="start_date"
            onChange={handleChange}
            value={workshopData.start_date}
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            id="end_date"
            onChange={handleChange}
            value={workshopData.end_date}
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="url"
            id="image_url"
            onChange={handleChange}
            value={workshopData.image_url}
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            onChange={handleChange}
            value={workshopData.location}
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            onChange={handleChange}
            value={workshopData.category}
          />
        </div>

        {/* Coding Language */}
        <div>
          <label htmlFor="coding_language">Coding Language:</label>
          <input
            type="text"
            id="coding_language"
            onChange={handleChange}
            value={workshopData.coding_language}
          />
        </div>

        {/* Organisation */}
        <div>
          <label htmlFor="organisation">Organisation:</label>
          <input
            type="text"
            id="organisation"
            onChange={handleChange}
            value={workshopData.organisation}
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Create Workshop</button>
      </form>
    </main>
  );
}

export default NewWorkshopForm;
