import useStats from '../hooks/use-stats';
import PostNoteBtn from './PostNoteBtn';

const Stats = () => {
    const { stats, isLoading, error } = useStats();
    return (
        <section className='px-7 text-center font-main text-base md:text-lg font-light lg:ml-[-50px]'>
            <h1>
                With{' '}
                <span className='text-xl px-1 font-normal border-b-2 border-purple-dark'>
                    {stats?.note_count}
                </span>{' '}
                notes posted across{' '}
                <span className='text-xl px-1 font-normal border-b-2 border-purple-dark'>
                    {stats?.workshop_count}
                </span>{' '}
                workshops and counting!
            </h1>
            <p>Join us on our mission to spread the positivity</p>
            <div className='w-44 h-16 mx-auto mt-6'>
                <PostNoteBtn color='yellow' />
            </div>
        </section>
    );
};
export default Stats;
