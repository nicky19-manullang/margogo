import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/explorer', label: 'Body Explorer' },
  { path: '/chat', label: 'AI Chat' },
  { path: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a1a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            M
          </div>
          <span className="text-white font-bold text-xl tracking-wide">
            Mar<span className="text-cyan-400">gogo</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-cyan-400'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          to="/explorer"
          className="hidden md:block px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold transition-all duration-200"
        >
          Jelajahi Tubuh
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a1a] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium ${
                location.pathname === link.path
                  ? 'text-cyan-400'
                  : 'text-white/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}