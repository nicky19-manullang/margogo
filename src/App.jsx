import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BodyExplorer from './pages/BodyExplorer'
import DiseaseDetail from './pages/DiseaseDetail'
import ChatPage from './pages/ChatPage'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorer" element={<BodyExplorer />} />
        <Route path="/disease/:id" element={<DiseaseDetail />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}