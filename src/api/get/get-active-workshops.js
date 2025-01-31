async function getActiveWorkshops() {
    const url = `${import.meta.env.VITE_API_URL}/activeworkshops/`;

    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        const fallbackError =
            'Oh no! Looks like we are having some issues with workshops right now';

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMsg = data?.detail ?? fallbackError;
        throw new Error(errorMsg);
    }

    return await response.json();
}

export default getActiveWorkshops;
