import React, { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

const AboutSection = lazy(() => import('./components/AboutSection'))
const ProjectsSection = lazy(() => import('./components/ProjectsSection'))
const ProcessSection = lazy(() => import('./components/ProcessSection'))
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'))
const TeamSection = lazy(() => import('./components/TeamSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <>
      {/* Skip to content link for accessibility — first focusable element */}
      <a href="#main-content" className="skip-link">
        Saltar para o conteúdo principal
      </a>

      <Navbar />

      <main id="main-content" className="bg-soft-alabaster min-h-screen">
        <HeroSection />
        <Suspense fallback={null}>
          <AboutSection />
          <ProjectsSection />
          <ProcessSection />
          <ServicesSection />
          <TestimonialsSection />
          <TeamSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </main>
    </>
  )
}

export default App
