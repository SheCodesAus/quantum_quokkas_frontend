import { workshops } from '../utils/workshops';
import { notes } from '../utils/notes-data';

const Workshop = () => {
    return (
        <main className='md:mt-8 md:ml-48 lg:ml-52 xl:ml-60 font-main'>
            <h1 className='text-2xl md:text-3xl pl-5 mb-2'>
                {workshops[0].title}
            </h1>
            <h3 className='text-xl md:text-2xl pl-6 mb-8 md:mb-1'>
                {workshops[0].organisation}
            </h3>
            <p className='w-4/5 mx-auto font-light md:text-lg lg:w-3/5'>
                {workshops[0].description}
            </p>
            <div className='space-x-4 w-fit mx-auto flex flex-col'>
                <label htmlFor='search-workshops' className='font-light'>Search Notes:</label>
                <input
                    className='bg-pink-light/30 rounded p-2 w-72'
                    type='search'
                />
            </div>
            <section className='grid grid-cols-1 w-fit mx-auto my-4 gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3'>
                {notes.map((note) => {
                    return (
                        <article
                            key={note.id}
                            className='bg-note bg-cover size-64 md:size-60 lg:size-64 flex justify-center'
                        >
                            <p className='-ml-4 w-[70%] text-xl font-note mt-14 md:w-[75%] md:mt-14 lg:w-[78%] lg:mt-16'>
                                {note.content}
                            </p>
                        </article>
                    );
                })}
            </section>
        </main>
    );
};
export default Workshop;
