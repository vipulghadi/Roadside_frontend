// eslint-disable-next-line no-unused-vars
import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/NavbarClient'
import FoodOffers from '@/components/homeComponents/FoodOffers'
import NearbyYou from '@/components/homeComponents/NearByYou'
import PopularItems from '@/components/homeComponents/PopularItems'
import SearchBar from '@/components/homeComponents/SearchBar'
import TopRatedStalls from '@/components/homeComponents/TopRatedStalls'
import React from 'react'

function Home() {
  return (
    <div className='w-[80vw] mx-auto'>
    <Navbar/>
    <SearchBar/>
    <PopularItems/>
    <FoodOffers/>
    <NearbyYou/>
    <TopRatedStalls/>
    <Footer/>
    </div>
  )
}

export default Home