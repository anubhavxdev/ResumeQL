import React from 'react'
import Header from '../components/mvpblocks/header-2.jsx'
import Hero1 from '../components/mvpblocks/hero-1.jsx'
import Feature1 from '../components/mvpblocks/feature-1.jsx'
import Pricing from '../components/mvpblocks/congusted-pricing.jsx'
import About from '../components/mvpblocks/about-us-2.jsx'
import Testimonals from '../components/mvpblocks/testimonials-carousel.jsx'

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero1 />
      <Feature1 />
      <Pricing />
      <About />
      <Testimonals />
    </div>
  )
}

export default LandingPage
