import { useState, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";

import getWorkshops from "../api/get/get-user-workshops";
import putWorkshop from "../api/put/put-edit-workshop"; 

const EditWorkshop = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [editing, setEditing] = useState(false);
  const handleEditing = () => setEditing(!editing);

  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const userWorkshops = await getWorkshops(auth.firstName);
        setWorkshops(userWorkshops);
        if (userWorkshops.length > 0) {
          setSelectedWorkshop(userWorkshops[0]);
        }
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    if (auth.firstName) {
      fetchWorkshops();
    }
  }, [auth.firstName]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSelectedWorkshop((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await putWorkshop(selectedWorkshop, auth.token);
      navigate(0);
      setEditing(false);
    } catch (error) {
      console.error("Error updating workshop:", error);
    }
  };

  return (
    <section className="edit-workshop">
      <h1>Edit Workshop</h1>

      {workshops.length === 0 ? (
        <p>No workshops available.</p>
      ) : (
        <>
          <select
            onChange={(e) =>
              setSelectedWorkshop(
                workshops.find((w) => w.id === Number(e.target.value))
              )
            }
            value={selectedWorkshop?.id || ""}
          >
            {workshops.map((workshop) => (
              <option key={workshop.id} value={workshop.id}>
                {workshop.title}
              </option>
            ))}
          </select>

          {!editing ? (
            <section className="workshop-details">
              <ul>
                <li>
                  <label>Title:</label> {selectedWorkshop?.title}
                </li>
                <li>
                  <label>Description:</label> {selectedWorkshop?.description}
                </li>
                <li>
                  <label>Start Date:</label> {selectedWorkshop?.start_date}
                </li>
                <li>
                  <label>End Date:</label> {selectedWorkshop?.end_date}
                </li>
              </ul>
              <button onClick={handleEditing}>Edit</button>
            </section>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="title">Title</label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="title"
                  placeholder={selectedWorkshop?.title}
                />
              </div>

              <div className="input-container">
                <label htmlFor="description">Description</label>
                <textarea
                  onChange={handleChange}
                  id="description"
                  placeholder={selectedWorkshop?.description}
                />
              </div>

              <div className="input-container">
                <label htmlFor="start_date">Start Date</label>
                <input
                  onChange={handleChange}
                  type="date"
                  id="start_date"
                  value={selectedWorkshop?.start_date?.split("T")[0] || ""}
                />
              </div>

              <div className="input-container">
                <label htmlFor="end_date">End Date</label>
                <input
                  onChange={handleChange}
                  type="date"
                  id="end_date"
                  value={selectedWorkshop?.end_date?.split("T")[0] || ""}
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
        </>
      )}
    </section>
  );
};

export default EditWorkshop;
