async function getNote(noteId) {
    const url = `${import.meta.env.VITE_API_URL}/notes/${noteId}/`;
    const token = window.localStorage.getItem("token");

    const response = await fetch(url, { 
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        } 
    });

    if (!response.ok) {
        const fallbackError = 'Oops! Looks like we are having issues with this note';

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMsg = data?.detail ?? fallbackError;
        throw new Error(errorMsg);
    }

    return await response.json();
}

export default getNote;
