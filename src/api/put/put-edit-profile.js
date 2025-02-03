async function putUser(username, fname, lname, email, user, token) {
  const url = `${import.meta.env.VITE_API_URL}/users/${user.id}/`;

  const newUsername = username ? username : user.email;
  const newFirstName = fname ? fname : user.first_name;
  const newLastName = lname ? lname : user.last_name;
  const newEmail = email ? email : user.email;

  const response = await fetch(url, {
      method: 'PUT',
      headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: newUsername,
          first_name: newFirstName,
          last_name: newLastName,
          email: newEmail,
      }),
  });

  if (!response.ok) {
      const fallbackError = `Error trying to edit account details`;

      const data = await response.json().catch(() => {
          throw new Error(fallbackError);
      });

      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
  }

  return await response.json();
}

export default putUser;