import { useEffect, useState } from 'react'

function DistrictNewsPage(){
  const base = import.meta.env.VITE_BACKEND_URL || ''
  const [districts, setDistricts] = useState([])
  const [active, setActive] = useState('Jaipur')
  const [items, setItems] = useState([])

  useEffect(()=>{
    fetch(`${base}/api/districts`).then(r=>r.json()).then(setDistricts).catch(()=>{})
  }, [base])

  useEffect(()=>{
    if(active){
      fetch(`${base}/api/articles?district=${encodeURIComponent(active)}&limit=30`).then(r=>r.json()).then(d=>setItems(d.items||[]))
    }
  }, [active, base])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-extrabold mb-4">जिलावार ख़बरें</h1>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {districts.map(d => (
          <button key={d} onClick={()=>setActive(d)} className={`px-3 py-2 rounded-full border ${active===d ? 'bg-red-600 text-white border-red-600' : 'border-black/10 dark:border-white/10'}`}>{d}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {items.map(a => (
          <a key={a.id} href={`/article/${a.id}`} className="group rounded overflow-hidden border border-black/10 dark:border-white/10">
            {a.thumbnail && <img src={a.thumbnail} alt="" className="w-full h-32 object-cover group-hover:scale-105 transition" />}
            <div className="p-3">
              <div className="text-xs uppercase tracking-wider text-red-600">{a.category} • {a.district}</div>
              <h3 className="font-semibold group-hover:text-red-600 text-sm">{a.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default DistrictNewsPage
