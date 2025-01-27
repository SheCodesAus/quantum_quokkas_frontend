import { useParams } from 'react-router-dom';
import useNote from '../hooks/use-note';
import Loader from '../components/Loader';
import Error from '../components/Error';


const Note = () => {
    const { noteId } = useParams();
    const { note, setNote, isLoading, error } = useNote(noteId);


    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error errorMessage={error.message} />;
    }

    return (
        <main className='min-h-screen md:mt-8 md:ml-48 lg:ml-52 xl:ml-60 font-main'>
            {/* note content*/}
            <h1 className='text-2xl md:text-3xl pl-5 mb-2'>
                {note?.content}
            </h1>


        </main>
    );
};
export default Note;
