async function getWorkshops () {
    const url = `${import.meta.env.VITE_API_URL}/workshops`

    const response = await fetch(url, {method: 'GET'})

    if (!response.ok) {
        const fallbackError = 'Error fetching workshops'

        const data = await response.json().catch(() => {
            throw new Error(fallbackError)
        })

        const errorMsg = data?.detail ?? fallbackError
        throw new Error(errorMsg)
    }

    return await response.json()
}

export default getWorkshops