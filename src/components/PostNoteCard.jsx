const PostNoteCard = ({ notes }) => {
    return (
        <section className='grid grid-cols-1 w-fit mx-auto my-4 gap-2 md:grid-cols-2 md:gap-6 lg:ml-[-70px] lg:gap-3 xl:grid-cols-3 xl:ml-[-200px]'>
            {notes?.notes.map((note) => {
                return (
                    <article
                        key={note.id}
                        className='bg-note bg-cover size-52 lg:size-60 flex justify-center'
                    >
                        <p
                            className={`font-note tracking-wide ml-[-8px] w-44 h-fit my-auto ${
                                // less than 20 char
                                note.content.length <= 20
                                    ? 'text-4xl'
                                    : // more than 20 but less than 40 char
                                    note.content.length > 20 &&
                                      note.content.length <= 40
                                    ? 'text-2xl'
                                    : // more than 40 but less than 60 char
                                    note.content.length > 40 &&
                                      note.content.length <= 60
                                    ? 'text-xl'
                                    : // more than 60 char
                                      'text-lg pt-5'
                            }`}
                        >
                            {note.content}
                        </p>
                    </article>
                );
            })}
        </section>
    );
};
export default PostNoteCard;
