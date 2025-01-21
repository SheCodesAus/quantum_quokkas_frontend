import About from '../components/About';
import RecentWorkshops from '../components/RecentWorkshops';

const Home = () => {
    return (
        <main className='md:mt-8 md:ml-48 lg:ml-52 xl:ml-60'>
            <About />
            <RecentWorkshops />
        </main>
    );
};
export default Home;
