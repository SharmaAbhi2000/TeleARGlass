import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Testimonials from '../components/Testimonial'
import Newsletter from '../components/Newsletter'
import Preorder from '../components/Preorder'
import Subscribtion from '../components/Subscribtion'

const Home = () => {
  return (
    <div className="">
      <Hero />
      <LatestCollection />
      <Testimonials />
      {/* <BestSeller /> */}
      <Preorder />
      <Newsletter />
      <Subscribtion />
      <OurPolicy />
    </div>
  );
}

export default Home
