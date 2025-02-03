async function getUsersNotes(userId) {
    const url = `${import.meta.env.VITE_API_URL}/notes/`;

    const response = await fetch(url, {
        method: 'GET',
    });

    if (!response.ok) {
        const fallbackError =
            'Oops! Looks like we are having issues with notes right now';

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMsg = data?.detail ?? fallbackError;
        throw new Error(errorMsg);
    }

    const notes = await response.json();

    return notes
      .filter((note) => note.added_by_user.id === Number(userId));
}

export default getUsersNotes;
