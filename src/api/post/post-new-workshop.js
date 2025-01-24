async function postNewWorkshop(workshopData) {
  const url = `${import.meta.env.VITE_API_URL}/workshops/`;
  const token = window.localStorage.getItem("token");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      title: workshopData.title,
      description: workshopData.description,
      start_date: workshopData.start_date,
      end_date: workshopData.end_date,
      image_url: workshopData.image_url,
      location: workshopData.location,
      category: workshopData.category,
      coding_language: workshopData.coding_language,
      organisation: workshopData.organisation,
      is_archived: workshopData.is_archived,
      archive_reason: workshopData.archive_reason,
      archive_user: workshopData.archive_user,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error trying to create new workshop`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postNewWorkshop;
