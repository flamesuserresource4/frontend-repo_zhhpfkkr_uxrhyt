import { useEffect, useState } from 'react'

function BreakingTicker({ items = [] }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % Math.max(items.length, 1)), 3000)
    return () => clearInterval(id)
  }, [items.length])

  const current = items[index] || { title: 'Welcome to Rajasthan Junction — Fast, Trusted, Breaking News', url: '#' }

  return (
    <div className="bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 h-10">
        <span className="font-bold uppercase text-xs tracking-wider bg-black px-2 py-1 rounded">Breaking</span>
        <a href={current.url} className="truncate hover:underline">{current.title}</a>
      </div>
    </div>
  )
}

export default BreakingTicker
