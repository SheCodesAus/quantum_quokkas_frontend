import { useState, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import getNotes from "../api/get/get-user-notes";
import updateNote from "../api/put/put-edit-note";
import { formatDate } from "../utils/date-formatter";

const EditNote = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [originalContent, setOriginalContent] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const userNotes = await getNotes(auth.userId);
        setNotes(userNotes);
        setIsLoading(false);
        if (userNotes.length > 0) {
          setSelectedNote(userNotes[0]);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        setIsLoading(false);
      }
    };

    if (auth.userId) {
      fetchNotes();
    }
  }, [auth.userId]);

  const handleEditing = () => {
    if (!editing) {
      setOriginalContent(selectedNote);
    } else {
      setSelectedNote(originalContent);
    }
    setEditing(!editing);
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setSelectedNote((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          [id]: checked,
          archive_reason: !checked ? "" : prev.archive_reason,
        };
      }
      return { ...prev, [id]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNote(selectedNote, auth.token);
      navigate(0);
      setEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <section className="space-y-4 font-main font-light">
      <h1 className="text-xl">Your Notes</h1>
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <>
          <select
            className="text-xl py-1 w-full font-accent tracking-wider border-[1px] border-green-light rounded text-center bg-green-light/30 lg:w-80 lg:ml-8"
            onChange={(e) =>
              setSelectedNote(
                notes.find((note) => note.id === Number(e.target.value))
              )
            }
            value={selectedNote?.id || ""}
          >
            {notes.map((note) => (
              <option key={note.id} value={note.id}>
                {note.content.substring(0, 20)}...
              </option>
            ))}
          </select>

          {!editing ? (
            <section className="space-y-3">
              <h2>
                <strong>Workshop:</strong>{" "}
                {selectedNote?.workshop_id?.title || "No Workshop"}
              </h2>
              <p className="pl-4 lg:w-4/5">{selectedNote?.content}</p>
              <h3 className="font-normal">
                {formatDate(selectedNote?.date_created)}
              </h3>
              <div className="w-fit ml-auto lg:mx-auto">
                <button
                  className="border-[1px] font-accent tracking-wider text-lg lg:text-2xl py-2 px-5 rounded bg-green-dark/60 shadow-md shadow-green-dark"
                  onClick={handleEditing}
                >
                  Edit
                </button>
              </div>
            </section>
          ) : (
            <form className="grid grid-cols-3 gap-y-4" onSubmit={handleSubmit}>
              <h2>
                <strong>Workshop:</strong>{" "}
                {selectedNote?.workshop_id?.title || "No Workshop"}
              </h2>
              <textarea
                className="col-span-3 p-2 rounded row-start-2"
                onChange={handleChange}
                id="content"
                rows={5}
                placeholder="Enter new content..."
                value={selectedNote?.content || ""}
              />

              <label className="row-start-3" htmlFor="is_archived">
                Archive
              </label>
              <input
                type="checkbox"
                id="is_archived"
                className="row-start-3 col-span-1"
                checked={selectedNote?.is_archived || false}
                onChange={handleChange}
              />

              {selectedNote?.is_archived && (
                <>
                  <label className="row-start-4" htmlFor="archive_reason">
                    Archive Reason
                  </label>
                  <textarea
                    className="col-span-3 p-2 rounded row-start-5"
                    onChange={handleChange}
                    id="archive_reason"
                    rows={3}
                    placeholder="Enter archive reason..."
                    value={selectedNote?.archive_reason || ""}
                  />
                </>
              )}

              <div className="row-start-6 col-span-3 flex justify-evenly">
                <button
                  className="py-1.5 px-3 rounded bg-green-dark/60 tracking-wide font-accent text-xl shadow-md shadow-green-dark md:text-2xl"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="py-1.5 px-3 rounded bg-green-dark/60 tracking-wide font-accent text-xl shadow-md shadow-green-dark md:text-2xl"
                  onClick={handleEditing}
                >
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

export default EditNote;