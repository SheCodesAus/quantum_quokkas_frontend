import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postNewNote from "../api/post/post-new-note";
import useActiveWorkshops from "../hooks/use-active-workshops";

function NewNoteForm() {
  const navigate = useNavigate();
  const {workshops, isLoading, error} = useActiveWorkshops();

  const [noteData, setNoteData] = useState({
    content: "",
    workshop: "",
    anonymous: false,
  });

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setNoteData((prevData) => ({
      ...prevData,
      [id]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["content", "workshop"];
    const isFormValid = requiredFields.every(
      (field) => noteData[field].trim() !== ""
    );

    if (isFormValid) {
      postNewNote(noteData)
        .then((response) => {
          navigate(`/workshop/${response.workshop}`);
        })
        .catch((error) => {
          console.error("Failed to create note:", error);
        });
    }
  };

  if (isLoading) return <div>Loading workshops...</div>;
  if (error) return <div>Error loading workshops</div>;


  return (
    <main>
      <h1>Create New Note</h1>

      <form onSubmit={handleSubmit}>
        {/* User */}
        <div>
          <label htmlFor="content">Content:</label>
          <input
            type="text"
            id="content"
            onChange={handleChange}
            value={noteData.content}
          />
        </div>

        {/* Workshop */}
        <div>
          <label htmlFor="workshop">Workshop</label>
          <select
                id="workshop"
                value={noteData.workshop}
                onChange={handleChange}
                required
            >
                <option value="">--Select Workshop--</option>
                {workshops.map((workshop) => (
                  <option key={workshop.id} value={workshop.id}>
                    {workshop.title}
                  </option>
            ))}
            </select>
        </div>

        {/* Anonymous */}
        <div>
          <label htmlFor="anonymous">
            <input
              type="checkbox"
              id="anonymous"
              onChange={handleChange}
              checked={noteData.anonymous}
            />
            Post Anonymously
          </label>
        </div>

         {/* Submit Button */}
        <button type="submit">Create Note</button>
      </form>
    </main>
  );
}

export default NewNoteForm;
