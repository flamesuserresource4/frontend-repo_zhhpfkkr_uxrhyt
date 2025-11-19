import { useEffect, useState } from 'react'

function SearchPage(){
  const base = import.meta.env.VITE_BACKEND_URL || ''
  const [q, setQ] = useState(new URLSearchParams(window.location.search).get('q') || '')
  const [items, setItems] = useState([])

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    const query = params.get('q') || ''
    setQ(query)
    if(query){
      fetch(`${base}/api/articles?q=${encodeURIComponent(query)}&limit=48`).then(r=>r.json()).then(d=>setItems(d.items||[]))
    } else {
      setItems([])
    }
  }, [window.location.search])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-extrabold mb-4">Search Results</h1>
      {q ? <div className="text-sm mb-3">Showing results for: <span className="font-semibold">{q}</span></div> : <div>Type in the search bar to find stories.</div>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(a => (
          <a key={a.id} href={`/article/${a.id}`} className="group rounded overflow-hidden border border-black/10 dark:border-white/10">
            {a.thumbnail && <img src={a.thumbnail} alt="" className="w-full h-32 object-cover group-hover:scale-105 transition" />}
            <div className="p-3">
              <div className="text-xs uppercase tracking-wider text-red-600">{a.category}</div>
              <h3 className="font-semibold group-hover:text-red-600 text-sm">{a.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
