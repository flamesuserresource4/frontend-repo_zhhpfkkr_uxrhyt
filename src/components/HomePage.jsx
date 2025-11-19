import { useEffect, useState } from 'react'
import BreakingTicker from './BreakingTicker'
import HeroSpline from './HeroSpline'

function HomePage() {
  const [featured, setFeatured] = useState([])
  const [latest, setLatest] = useState([])
  const [trending, setTrending] = useState([])

  const base = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(() => {
    const load = async () => {
      try {
        const [f, l, t] = await Promise.all([
          fetch(`${base}/api/articles?featured=true&limit=5`).then(r=>r.json()),
          fetch(`${base}/api/articles?limit=12`).then(r=>r.json()),
          fetch(`${base}/api/trending?limit=6`).then(r=>r.json()),
        ])
        setFeatured(f.items || [])
        setLatest(l.items || [])
        setTrending(t || [])
      } catch (e) { /* ignore */ }
    }
    load()
  }, [base])

  return (
    <div>
      <HeroSpline />

      <BreakingTicker items={featured.map(a=>({title:a.title,url:`/article/${a.id}`}))} />

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-extrabold mb-4">Top Stories</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {featured.map((a) => (
              <a key={a.id} href={`/article/${a.id}`} className="group rounded overflow-hidden border border-black/10 dark:border-white/10">
                {a.thumbnail && <img src={a.thumbnail} alt="" className="w-full h-40 object-cover group-hover:scale-105 transition" />}
                <div className="p-3">
                  <div className="text-xs uppercase tracking-wider text-red-600">{a.category}</div>
                  <h3 className="font-bold group-hover:text-red-600">{a.title}</h3>
                </div>
              </a>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold mt-8 mb-4">Latest</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {latest.map((a) => (
              <a key={a.id} href={`/article/${a.id}`} className="group rounded overflow-hidden border border-black/10 dark:border-white/10">
                {a.thumbnail && <img src={a.thumbnail} alt="" className="w-full h-28 object-cover group-hover:scale-105 transition" />}
                <div className="p-3">
                  <div className="text-xs uppercase tracking-wider text-red-600">{a.category}</div>
                  <h3 className="font-semibold group-hover:text-red-600 text-sm">{a.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>

        <aside>
          <h3 className="text-xl font-bold mb-3">Trending</h3>
          <div className="space-y-3">
            {trending.map((a, i) => (
              <a key={a.id} href={`/article/${a.id}`} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">{i+1}</div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-red-600">{a.category}</div>
                  <div className="font-medium hover:text-red-600">{a.title}</div>
                </div>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default HomePage
