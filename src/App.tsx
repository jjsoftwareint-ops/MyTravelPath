import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Analytics from './components/Analytics'
import Home from './pages/Home'
import PathDetail from './pages/PathDetail'

export default function App() {
  return (
    <HashRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:cityId" element={<Home />} />
        <Route path="/:cityId/:pathId" element={<PathDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
