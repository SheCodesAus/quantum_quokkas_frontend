const updateNote = async (noteData, token) => {
  const url = `${import.meta.env.VITE_API_URL}/notes/${noteData.id}/`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(noteData),
    });

    if (!response.ok) {
      const fallbackError = "Failed to update note.";
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });

      throw new Error(data?.detail || fallbackError);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export default updateNote;