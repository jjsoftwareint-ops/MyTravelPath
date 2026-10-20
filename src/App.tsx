import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Analytics from './components/Analytics'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Imprint from './pages/Imprint'
import PathDetail from './pages/PathDetail'
import Privacy from './pages/Privacy'

export default function App() {
  return (
    <HashRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="/:cityId" element={<Home />} />
        <Route path="/:cityId/:pathId" element={<PathDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
