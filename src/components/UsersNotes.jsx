import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import UserNoteCard from './UserNoteCard';
import Loader from './Loader';
import useUsersNotes from '../hooks/use-users-notes';
import EditNoteForm from './EditNoteForm';

const UsersNotes = ({ note }) => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [editing, setEditing] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const { usersNotes, isLoading, error } = useUsersNotes(auth.userId);

    const editANote = (note) => {
        setEditing(!editing);
        setSelectedNote(note);
    };

    const discardEdit = () => setEditing(false)

    if (isLoading) {
        return <Loader />;
    }

    return (
        <section className='space-y-4 font-main font-light'>
            {!editing ? (
                <>
                    <h1 className='text-center text-3xl lg:text-4xl xl:text-5xl font-accent tracking-wider'>Your Notes</h1>
                    <section className='w-fit mx-auto md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {usersNotes.map((note) => {
                            return (
                                <UserNoteCard
                                    editANote={editANote}
                                    note={note}
                                />
                            );
                        })}
                    </section>
                </>
            ) : (
                <>
                    <EditNoteForm discardEdit={discardEdit} noteToEdit={selectedNote} />
                </>
            )}
        </section>
    );
};
export default UsersNotes;
