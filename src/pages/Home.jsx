import About from '../components/About';
import RecentWorkshops from '../components/RecentWorkshops';

const Home = () => {
    return (
        <main className='min-h-screen md:mt-8 md:ml-48 lg:ml-44 xl:ml-60'>
            <About />
            <RecentWorkshops />
        </main>
    );
};
export default Home;
