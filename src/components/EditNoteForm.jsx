import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import updateNote from '../api/put/put-edit-note';

const EditNoteForm = ({ noteToEdit, discardEdit }) => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [selectedNote, setSelectedNote] = useState(noteToEdit);

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setSelectedNote((prev) => {
            if (type === 'checkbox') {
                return {
                    ...prev,
                    [id]: checked,
                    archive_reason: !checked ? '' : prev.archive_reason,
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
        } catch (error) {}
    };

    return (
        <form
            className='flex flex-col items-center space-y-4 lg:w-[500px] mx-auto'
            onSubmit={handleSubmit}
        >
            {/* Workshop Title */}
            <h2 className='text-2xl font-accent tracking-wider'>
                {selectedNote?.workshop_id?.title || 'No Workshop'}
            </h2>

            {/* Note */}
            <div className='bg-usersnote bg-cover size-[330px] flex items-center justify-center'>
                <textarea
                    className='bg-transparent border-[1px] w-[270px] mr-3 h-52 mt-8 rounded p-2 text-xl font-note tracking-wider'
                    onChange={handleChange}
                    id='content'
                    rows={5}
                    placeholder='Enter new content...'
                    value={selectedNote?.content || ''}
                />
            </div>

            {/* Archive */}
            <div className='self-start md:self-center space-x-3'>
                <label htmlFor='is_archived'>Archive Note?</label>
                <input
                    type='checkbox'
                    id='is_archived'
                    checked={selectedNote?.is_archived || false}
                    onChange={handleChange}
                />
            </div>
            {/* Reason for Archive */}
            {selectedNote?.is_archived ? (
                <textarea
                    className='w-full rounded md:w-4/5 p-2'
                    onChange={handleChange}
                    id='archive_reason'
                    rows={1}
                    placeholder='Please enter reason for archiving...'
                    value={selectedNote?.archive_reason || ''}
                />
            ) : (
                <div className='h-9'></div>
            )}
            <div className='space-x-8'>
                <button
                    className='py-1.5 px-3 rounded bg-green-dark/60 tracking-wide font-accent text-xl shadow-md shadow-green-dark md:text-2xl'
                    type='submit'
                >
                    Save
                </button>
                <button
                    onClick={discardEdit}
                    className='py-1.5 px-3 rounded bg-green-dark/60 tracking-wide font-accent text-xl shadow-md shadow-green-dark md:text-2xl'
                >
                    Discard
                </button>
            </div>
        </form>
    );
};

export default EditNoteForm;
