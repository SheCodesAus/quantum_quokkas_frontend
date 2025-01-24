async function postNewNote(noteData) {
  const url = `${import.meta.env.VITE_API_URL}/notes/`;
  const token = window.localStorage.getItem("token");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      content: noteData.content,
      workshop: noteData.workshop,
      anonymous: noteData.anonymous,
      note_category: noteData.note_category,
      coding_language: noteData.coding_language,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error trying to create new note`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postNewNote;
