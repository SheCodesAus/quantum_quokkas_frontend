import HeroBanner from '../components/HeroBanner'
import About from '../components/About'
import RecentWorkshops from '../components/RecentWorkshops'

const Home = () => {
  return (
    <main className='min-h-screen'>
      <HeroBanner />
      <About />
      <RecentWorkshops />
    </main>
  )
}
export default Home