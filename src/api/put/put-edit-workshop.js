const putEditWorkshop = async (updatedWorkshopData, token) => {
  const url = `${import.meta.env.VITE_API_URL}/workshops/${
    updatedWorkshopData.id
  }/`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(updatedWorkshopData),
    });

    if (!response.ok) {
      const fallbackError = "Failed to update workshop.";
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });

      throw new Error(data?.detail || fallbackError);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating workshop:", error);
    throw error;
  }
};

export default putEditWorkshop;
