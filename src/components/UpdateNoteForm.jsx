import { useState, useEffect } from 'react'; // Added useEffect
import { useNavigate, useParams } from 'react-router-dom';
import updateNote from '../api/put/put-note';
import pin from '/custom-btns/pin.svg';
import useActiveWorkshops from '../hooks/use-active-workshops';
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast';
import SelectWorkshop from './SelectWorkshop';
import { useAuth } from '../hooks/use-auth';
import useNote from '../hooks/use-note';

function UpdateNoteForm() {
    const { noteId } = useParams();
    const { note, isLoading: noteLoading, error: noteError } = useNote(noteId);
    const { workshops, isLoading: workshopsLoading } = useActiveWorkshops();
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [characterCounter, setCharacterCounter] = useState('0');
    const [showArchiveReason, setShowArchiveReason] = useState(false);
    const [noteData, setNoteData] = useState({
        content: '',
        workshop: '',
        anonymous: false,
        note_category: '',
        coding_language: '',
        is_archived: false,
        archive_reason: '',
        archive_user: null
    });

    // Set initial values when note data is loaded
    useEffect(() => {
        if (note) {
            // console.log("Full note object:", note);
            // console.log("Workshop object:", note.workshop);
            // console.log("Workshop ID:", note.workshop.id);
            
            setNoteData({
                content: note.content,
                workshop: note.workshop.id || '',  // Added fallback
                anonymous: note.anonymous || false,
                is_archived: note.is_archived || false,
                archive_reason: note.archive_reason || '',
                archive_user: note.archive_user
            });
            // console.log("NoteData after setting:", noteData);
            setCharacterCounter(note.content.length);
            setShowArchiveReason(note.is_archived);
        }
    }, [note]);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        
        if (id === 'is_archived') {
            setShowArchiveReason(checked);
            if (!checked) {
                setNoteData(prev => ({
                    ...prev,
                    is_archived: checked,
                    archive_reason: '',
                    archive_user: null
                }));
                return;
            }
        }

        setNoteData((prevData) => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleContentChange = (e) => {
        handleChange(e);
        setCharacterCounter(e.target.value.length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (noteData.is_archived && !noteData.archive_reason.trim()) {
            toast.error('Please provide a reason for archiving');
            return;
        }
    
        const submitData = {
            ...noteData,
            archive_user: noteData.is_archived ? auth.user?.id : null
        };
    
        try {
            await updateNote(noteId, submitData);
            toast.success('Note updated successfully!');
            navigate(`/workshop/${noteData.workshop}`);
        } catch (error) {
            console.error('Failed to update note:', error);
            toast.error('Failed to update note. Please try again.');
        }
    };

    if (noteLoading || workshopsLoading) {
        return <Loader />;
    }

    if (noteError) {
        return <div>Error loading note: {noteError.message}</div>;
    }

    return (
        <main className='min-h-screen flex flex-col md:mt-8 lg:mt-24 xl:mt-16 items-center'>
            <Toaster />
            <h1 className='font-accent tracking-wider mb-6 text-3xl md:text-4xl'>
                Update Note
            </h1>

            <form
                className='w-fit items-center flex flex-col justify-between h-[500px] md:h-[550px]'
                onSubmit={handleSubmit}
            >
                {/* Workshop Selection */}
                <div className='absolute'>
                    <SelectWorkshop
                        workshops={workshops}
                        noteData={noteData}
                        setNoteData={setNoteData}
                    />
                </div>

                {/* Sticky Note */}
                <div className='mt-20 bg-noteform bg-cover size-80 flex flex-col items-center justify-evenly md:size-[400px]'>
                    {/* Character Count */}
                    <p className='self-end font-accent tracking-wider text-lg text-center mt-6 mr-5'>
                        {characterCounter} / 85
                    </p>

                    {/* Content */}
                    <textarea
                        type='text'
                        id='content'
                        maxLength={85}
                        rows={6}
                        onChange={handleContentChange}
                        value={noteData.content}
                        aria-label='section for note content'
                        className='placeholder:text-black/60 font-note w-64 h-40 text-2xl ml-[-15px] mt-[-15px] tracking-wider bg-transparent focus-visible:outline-none md:text-3xl md:w-80 md:h-48'
                    />

                    {/* Controls Section */}
                    <div className='self-start space-y-2 ml-8 text-lg font-accent tracking-wider'>
                        {/* Anonymous Checkbox */}
                        <div className='space-x-4'>
                            <label htmlFor='anonymous'>Post anonymously?</label>
                            <input
                                type='checkbox'
                                id='anonymous'
                                onChange={handleChange}
                                checked={noteData.anonymous}
                            />
                        </div>

                        {/* Archive Checkbox */}
                        <div className='space-x-4'>
                            <label htmlFor='is_archived'>Archive note?</label>
                            <input
                                type='checkbox'
                                id='is_archived'
                                onChange={handleChange}
                                checked={noteData.is_archived}
                            />
                        </div>
                    </div>
                </div>

                {/* Archive Reason - Only shown when archiving */}
                {showArchiveReason && (
                    <div className='w-80 mt-4'>
                        <label htmlFor='archive_reason' className='font-accent tracking-wider'>
                            Archive Reason (Required):
                        </label>
                        <textarea
                            id='archive_reason'
                            value={noteData.archive_reason}
                            onChange={handleChange}
                            required={noteData.is_archived}
                            rows={3}
                            className='w-full p-2 border rounded font-note'
                            placeholder='Please provide a reason for archiving...'
                        />
                    </div>
                )}

                {/* Submit Button */}
                <button
                    className='flex items-center gap-2 py-2 pl-4 pr-2 rounded bg-yellow-light shadow-md shadow-yellow-dark font-bold font-accent text-2xl'
                    type='submit'
                >
                    Update <img className='size-4' src={pin} />
                </button>
            </form>
        </main>
    );
}

export default UpdateNoteForm;