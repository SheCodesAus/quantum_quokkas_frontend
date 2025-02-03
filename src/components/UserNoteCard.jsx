const UserNoteCard = ({ note, editANote }) => {
    const handleClick = () => {
        editANote(note);
    };

    // if no notes return no notes posted
    return (
        <section>
            <article className='bg-usersnote bg-cover size-52 md:size-56 lg:size-60 flex justify-center items-center'>
                <p
                    className={`font-note tracking-wide ml-[-8px] w-44 h-fit text-center ${
                        // 15 or less
                        note?.content.length <= 15
                            ? 'text-4xl mt-2'
                            : // 15 to 30
                            note?.content.length > 15 &&
                              note?.content.length <= 30
                            ? 'text-3xl mt-5'
                            : // 30 to 45
                            note?.content.length > 30 &&
                              note?.content.length <= 45
                            ? 'text-2xl mt-4 lg:text-[26px]'
                            : // 45 to 60
                            note?.content.length > 45 &&
                              note?.content.length <= 65
                            ? 'text-xl mt-4'
                            : // more than 60
                            note?.content.length > 65 &&
                              note?.content.length <= 70
                            ? 'text-lg mt-3 md:text-[19px]'
                            : 'text-[17px] md:text-lg md:mt-4'
                    }`}
                >
                    {note?.content}
                </p>
            </article>
            <div className="w-fit mx-auto mb-5">
                <button
                    className='border-[1px] border-green-dark/70 font-accent tracking-wider lg:text-xl py-1 px-3 rounded bg-pink-50'
                    onClick={handleClick}
                >
                    Edit
                </button>
            </div>
        </section>
    );
};
export default UserNoteCard;
