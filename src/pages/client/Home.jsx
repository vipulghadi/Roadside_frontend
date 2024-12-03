// eslint-disable-next-line no-unused-vars
import Footer from '@/components/common/Footer'
import NavbarClient from '@/components/common/NavbarClient'
import Navbar from '@/components/common/NavbarClient'
import FoodOffers from '@/components/client/homeComponents/FoodOffers'
import NearbyYou from '@/components/client/homeComponents/NearByYou'
import PopularItems from '@/components/client/homeComponents/PopularItems'
import SearchBar from '@/components/client/homeComponents/SearchBar'
import HomeBanner from '@/components/client/homeComponents/HomeBanner'
import Chatbot from './Chatbot'


function Home() {
  return (
    <div className='sm:w-[80vw] w-[100vw] mx-auto'>
    <Chatbot/>
    <HomeBanner/>
    <PopularItems/>
    <FoodOffers/>
    <NearbyYou/>
    
    <Footer/>
    </div>
  )
}

export default Home