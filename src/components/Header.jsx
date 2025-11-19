import { useState } from 'react'
import { Menu, Search, Sun, Moon, PlayCircle, Newspaper, Video, Home, Info, Phone, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

function Header({ onToggleTheme, theme }) {
  const [open, setOpen] = useState(false)

  const nav = [
    { to: '/', label: 'Home', icon: <Home size={16} /> },
    { to: '/categories', label: 'Categories', icon: <Newspaper size={16} /> },
    { to: '/live', label: 'Live Updates', icon: <PlayCircle size={16} /> },
    { to: '/videos', label: 'Videos', icon: <Video size={16} /> },
    { to: '/about', label: 'About', icon: <Info size={16} /> },
    { to: '/contact', label: 'Contact', icon: <Phone size={16} /> },
    { to: '/policies', label: 'Policies', icon: <ShieldAlert size={16} /> },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-red-500/20 backdrop-blur bg-white/80 dark:bg-black/70">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
              <Menu />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-600" />
              <span className="font-extrabold tracking-tight text-xl">
                <span className="text-red-600">Rajasthan</span> <span className="text-black dark:text-white">Junction</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="px-3 py-2 text-sm font-medium rounded hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-500/10">
                <span className="inline-flex items-center gap-2">{n.icon}{n.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-black/5 dark:bg-white/10">
              <Search size={16} />
              <input placeholder="Search..." className="bg-transparent outline-none text-sm w-40" />
            </div>
            <button onClick={onToggleTheme} className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/10" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden py-2 border-t border-red-500/20 grid grid-cols-2 gap-2">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="px-3 py-2 text-sm rounded bg-black/5 dark:bg-white/10" onClick={() => setOpen(false)}>
                <span className="inline-flex items-center gap-2">{n.icon}{n.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
