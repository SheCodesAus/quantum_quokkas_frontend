import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import postNewNote from '../api/post/post-new-note';
import pin from '/custom-btns/pin.svg';
import useActiveWorkshops from '../hooks/use-active-workshops';
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast';
import SelectWorkshop from './SelectWorkshop';

function NewNoteForm() {
    const location = useLocation();
    const { workshopTitle } = location.state ? location.state : ''
    console.log(workshopTitle);

    const { workshops, isLoading } = useActiveWorkshops();
    const [characterCounter, setCharacterCounter] = useState('0');

    const navigate = useNavigate();

    const [noteData, setNoteData] = useState({
        content: '',
        workshop: '',
        anonymous: false,
        note_category: '',
        coding_language: '',
    });

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setNoteData((prevData) => ({
            ...prevData,
            [id]:
                type === 'checkbox'
                    ? checked
                    : type === 'number'
                    ? Number(value)
                    : value,
        }));
    };

    const handleContentChange = (e) => {
        handleChange(e);
        setCharacterCounter(e.target.value.length);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(noteData);
        const requiredFields = ['content', 'workshop'];
        const isFormValid = requiredFields.every(
            (field) => noteData[field].trim() !== ''
        );

        if (isFormValid) {
            postNewNote(noteData)
                .then(() => {
                    navigate(`/workshop/${noteData.workshop}`);
                    toast('Posting your note!');
                })
                .catch((error) => {
                    console.error('Failed to create note:', error);
                    toast('Oops! Something went wrong, please try again later');
                    navigate('/');
                });
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <main className='min-h-screen font-main md:mt-8 md:items-start md:ml-60 lg:grid lg:grid-cols-2 lg:w-3/5 lg:ml-40 lg:mt-16 xl:mt-16'>
            <Toaster />
            <h1 className='font-accent tracking-wider mb-6 text-3xl text-center md:text-start md:text-4xl lg:text-center lg:mb-0 lg:pt-10'>
                Post-A-Note
            </h1>

            <form
                className='w-fit mx-auto items-center flex flex-col justify-between h-[500px] md:h-[550px] md:mx-0'
                onSubmit={handleSubmit}
            >
                {/* Workshop Selection */}
                <div className='absolute'>
                    <SelectWorkshop
                        workshops={workshops}
                        noteData={noteData}
                        setNoteData={setNoteData}
                        workshopTitle={workshopTitle}
                    />
                </div>

                {/* Sticky Note */}
                <div className='mt-20 bg-noteform bg-cover size-80 flex flex-col items-center justify-evenly md:size-[400px]'>
                    {/* Character Count */}
                    <p className='self-end font-accent tracking-wider text-lg text-center mt-6 mr-5 md:text-2xl md:mr-8'>
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
                        placeholder='What win would you like to share?'
                        className='placeholder:text-black/60 font-note w-64 h-40 text-2xl ml-[-15px] mt-[-15px] tracking-wider bg-transparent focus-visible:outline-none md:text-4xl md:w-80 md:h-48'
                    />
                    {/* Anonymous */}
                    <div className='self-start space-x-4 ml-8 text-lg font-accent tracking-wider md:text-2xl'>
                        <label htmlFor='anonymous'>Post anonymously?</label>
                        <input
                            type='checkbox'
                            id='anonymous'
                            onChange={handleChange}
                            checked={noteData.anonymous}
                        />
                    </div>
                </div>

                {/* Note Category */}
                {/* <div>
                  <label htmlFor='note_category'>Note Category:</label>
                  <input
                      type='text'
                      id='note_category'
                      onChange={handleChange}
                      value={noteData.note_category}
                  />
              </div> */}

                {/* Coding Language */}
                {/* <div>
                  <label htmlFor='coding_language'>Coding Language:</label>
                  <input
                      type='text'
                      id='coding_language'
                      onChange={handleChange}
                      value={noteData.coding_language}
                  />
              </div> */}

                {/* Submit Button */}
                <button
                    className='flex items-center gap-2 py-3 pl-5 pr-3 rounded bg-yellow-light shadow-md shadow-yellow-dark font-bold font-accent tracking-wider text-2xl lg:text-3xl'
                    type='submit'
                >
                    Post <img className='size-4' src={pin} />
                </button>
            </form>
        </main>
    );
}

export default NewNoteForm;
