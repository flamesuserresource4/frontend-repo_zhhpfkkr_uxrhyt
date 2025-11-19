import { Facebook, Instagram, Youtube } from 'lucide-react'

function TopBar() {
  const now = new Date()
  const date = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="bg-black text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white/80">{date}</span>
          <span className="text-white/50">{time}</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Facebook" className="hover:text-red-400"><Facebook size={16} /></a>
          <a href="#" aria-label="Instagram" className="hover:text-red-400"><Instagram size={16} /></a>
          <a href="#" aria-label="YouTube" className="hover:text-red-400"><Youtube size={16} /></a>
        </div>
      </div>
    </div>
  )
}

export default TopBar
