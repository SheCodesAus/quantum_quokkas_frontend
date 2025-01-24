import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postNewNote from "../api/post/post-new-note";

function NewNoteForm() {
  const navigate = useNavigate();
  const [noteData, setNoteData] = useState({
    content: "",
    workshop: "",
    anonymous: false,
    note_category: "",
    coding_language: "",
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
          navigate(`/workshop/${response.workshop.id}`);
        })
        .catch((error) => {
          console.error("Failed to create note:", error);
        });
    }
  };

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
          <label htmlFor="workshop">Workshop:</label>
          <input
            type="text"
            id="workshop"
            onChange={handleChange}
            value={noteData.workshop}
          />
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

        {/* Note Category */}
        <div>
          <label htmlFor="note_category">Note Category:</label>
          <input
            type="text"
            id="note_category"
            onChange={handleChange}
            value={noteData.note_category}
          />
        </div>

        {/* Coding Language */}
        <div>
          <label htmlFor="coding_language">Coding Language:</label>
          <input
            type="text"
            id="coding_language"
            onChange={handleChange}
            value={noteData.coding_language}
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Create Note</button>
      </form>
    </main>
  );
}

export default NewNoteForm;
