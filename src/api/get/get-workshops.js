async function getWorkshops() {
    const url = `${import.meta.env.VITE_API_URL}/workshops/`;

    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        const fallbackError =
            'Oops! Looks like we are having issues with workshops right now';

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMsg = data?.detail ?? fallbackError;
        throw new Error(errorMsg);
    }

    const workshops = await response.json()

    return workshops.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
}

export default getWorkshops;
