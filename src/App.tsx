import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import CountryList from './pages/CountryList'
import CityList from './pages/CityList'
import PathList from './pages/PathList'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/:countryId" element={<CityList />} />
        <Route path="/:countryId/:cityId" element={<PathList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
