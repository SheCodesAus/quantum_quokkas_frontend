async function getUser(userId) {
    const url = `${import.meta.env.VITE_API_URL}/users/${userId}/`;
    const token = window.localStorage.getItem("token");

    if (!token) {
        throw new Error('Authentication token is required');
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        }
    });
    if (!response.ok) {
        const fallbackError = 'Cannot retrieve user details';

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMsg = data?.detail ?? fallbackError;
        throw new Error(errorMsg);
    }

    return await response.json();
}

export default getUser;
