import { useEffect, useState } from 'react'

function CategoriesPage(){
  const [categories, setCategories] = useState([])
  const [articles, setArticles] = useState([])
  const base = import.meta.env.VITE_BACKEND_URL || ''

  const params = new URLSearchParams(window.location.search)
  const initial = params.get('name') || 'Rajasthan'
  const [active, setActive] = useState(initial)

  useEffect(()=>{
    fetch(`${base}/api/categories`).then(r=>r.json()).then(setCategories).catch(()=>{})
  }, [base])

  useEffect(()=>{
    fetch(`${base}/api/articles?category=${encodeURIComponent(active)}&limit=30`).then(r=>r.json()).then(d=>setArticles(d.items||[]))
  }, [active, base])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-extrabold mb-4">Categories</h1>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(c => (
          <button key={c} onClick={()=>setActive(c)} className={`px-3 py-2 rounded-full border ${active===c ? 'bg-red-600 text-white border-red-600' : 'border-black/10 dark:border-white/10'}`}>{c}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {articles.map(a => (
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

export default CategoriesPage
