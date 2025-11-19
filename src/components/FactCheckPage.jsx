import { useEffect, useState } from 'react'

function FactCheckPage(){
  const base = import.meta.env.VITE_BACKEND_URL || ''
  const [items, setItems] = useState([])

  useEffect(()=>{
    fetch(`${base}/api/factcheck`).then(r=>r.json()).then(setItems).catch(()=>{})
  }, [base])

  const badge = (v) => (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${v==='True'?'bg-green-600 text-white': v==='False'?'bg-red-600 text-white':'bg-yellow-500 text-black'}`}>{v}</span>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-4">फैक्ट चेक</h1>
      <div className="space-y-3">
        {items.map(i => (
          <div key={i.id} className="p-4 rounded border border-black/10 dark:border-white/10">
            <div className="font-semibold">{i.title}</div>
            <div className="text-sm text-black/70 dark:text-white/70">दावा: {i.claim}</div>
            <div className="mt-1">निर्णय: {badge(i.verdict)}</div>
            {i.source && <div className="text-xs mt-1">स्रोत: {i.source}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FactCheckPage
