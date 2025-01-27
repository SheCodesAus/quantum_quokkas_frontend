// api/put/put-note.js
export default async function updateNote(noteId, noteData) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}notes/${noteId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(noteData),
      }
    );
  
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.detail || "Failed to update note");
    }
  
    return await response.json();
  }