import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";

import useUser from "../hooks/use-user";
import putUser from "../api/put/put-edit-profile";

const EditProfile = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { user } = useUser(auth.userId);
  const [editing, setEditing] = useState(false);
  const handleEditing = () => setEditing(!editing);

  const [userDetails, setUserDetails] = useState({
    username: "",
    fname: "",
    lname: "",
    email: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await putUser(
        userDetails?.username,
        userDetails?.fname,
        userDetails?.lname,
        userDetails?.email,
        user,
        auth.token
      );
      navigate(0);
      setEditing(!editing);
    } catch (error) {
    }
  };

  return (
    <section className="edit-profile">

      <h1>Edit Profile</h1>

      {!editing ? (
        <section className="user-details">
          <ul>
            <li>
              <label>First Name:</label>
              {user?.first_name}
            </li>
            <li>
              <label>Last Name:</label>{user?.last_name}
            </li>
            <li>
              <label>Email:</label>{user?.email}
            </li>
          </ul>
          <button onClick={handleEditing}>Edit</button>
        </section>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* first name */}
          <div className="input-container">
            <label htmlFor="fname">First Name</label>
            <input
              onChange={handleChange}
              type="text"
              id="fname"
              placeholder={user?.first_name}
            />
          </div>

          {/* last name */}
          <div className="input-container">
            <label htmlFor="lname">Last Name</label>
            <input
              onChange={handleChange}
              type="text"
              id="lname"
              placeholder={user?.last_name}
            />
          </div>

          {/* email */}
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              placeholder={user?.email}
            />
          </div>

          {/* username */}
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              type="text"
              id="username"
              placeholder={user?.username}
            />
          </div>

          <div className="btn-container">
            <button className="green-btn" type="submit">
              Submit
            </button>
            <button className="green-btn" onClick={handleEditing}>
              Discard
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
export default EditProfile;
