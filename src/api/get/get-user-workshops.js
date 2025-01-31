async function getWorkshops(first_name) {
  const url = `${import.meta.env.VITE_API_URL}/workshops/`;

  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    const fallbackError =
      "Oh no! Looks like we are having issues with the workshops right now";

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMsg = data?.detail ?? fallbackError;
    throw new Error(errorMsg);
  }

  const workshops = await response.json();

  return workshops
    .filter((workshop) => workshop.owner.first_name === first_name)
    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
}

export default getWorkshops;
