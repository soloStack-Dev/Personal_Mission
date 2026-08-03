import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import ProjectPage from './pages/ProjectPage'

/**
 * App shell — composes the persistent layout around the routed pages.
 *
 * Layout structure:
 *   <Navbar />      fixed top navigation (always visible)
 *   <ContactModal /> global overlay for the contact form (always mounted)
 *   <main>          the active page rendered by the router
 *   <Footer />      page footer (always visible)
 */
function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <ContactModal />

      <main style={{ flex: 1 }}>
        {/* Route table: each path renders its own page component */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/projects" element={<ProjectPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
