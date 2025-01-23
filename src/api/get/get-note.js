async function getNote(noteId) {
    const url = `${import.meta.env.VITE_API_URL}/notes/${noteId}/`;

    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        const fallbackError = 'Error fetching note';

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMsg = data?.detail ?? fallbackError;
        throw new Error(errorMsg);
    }

    return await response.json();
}

export default getNote;
