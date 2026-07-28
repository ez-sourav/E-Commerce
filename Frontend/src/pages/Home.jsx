import React from 'react'
import Hero from '../components/home/Hero'
import FeaturedCategories from '../components/home/FeaturedCategories/FeaturedCategories'
import FeaturedProducts from '../components/home/FeaturedProducts/FeaturedProducts'

const Home = () => {
  return (
   <>
   <Hero/>
   <FeaturedCategories/>
   <FeaturedProducts/>
   </>
  )
}

export default Home