import HeroBanner from './HeroBanner';
import HeroPostNoteBtn from './HeroPostNoteBtn';

const About = () => {

    return (
        <main className='space-y-8 lg:w-[850px] xl:w-[1000px] lg:grid grid-cols-2'>
            {/* Headline */}
            <h1 className='font-main font-light text-2xl w-11/12 mx-auto md:text-3xl lg:w-3/5 lg:ml-10 col-span-2'>
                Welcome to post
                <span className='font-accent text-4xl lg:text-5xl ml-1 mr-1'>it</span>
                ivity, where <span className='font-bold'>every</span> success is
                celebrated, no matter how small.
            </h1>

            {/* Note Slideshow */}
            <div className='lg:col-start-2'>
                <HeroBanner />
            </div>

            {/* About Bio */}
            <section className='lg:row-start-2 lg:ml-12 xl:ml-16'>
                <p className='font-main text-base font-light w-4/5 mx-auto mb-6 md:mx-0 md:text-lg'>
                    At post
                    <span className='font-accent text-4xl ml-1 mr-0.5'>it</span>
                    ivity, we put the focus on ‘the little wins’ that build
                    progress. Workshops often end with attendees jotting down
                    takeaways on post-it notes—quick and easy, but often
                    forgotten. Our platform captures these moments digitally,
                    allowing teams to share insights, preserve progress, and
                    reflect long after the workshop ends.
                </p>

                {/* Post A Note Button */}
                <HeroPostNoteBtn />
            </section>
        </main>
    );
};
export default About;
