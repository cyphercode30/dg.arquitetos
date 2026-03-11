import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import HeroSection from './components/HeroSection'
import ProcessSection from './components/ProcessSection'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import ServicesSection from './components/ServicesSection'
import TestimonialsSection from './components/TestimonialsSection'
import TeamSection from './components/TeamSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader finishLoading={() => setLoading(false)} />}
      </AnimatePresence>

      <main className="bg-soft-alabaster min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ProcessSection />
        <ServicesSection />
        <TestimonialsSection />
        <TeamSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}

export default App
