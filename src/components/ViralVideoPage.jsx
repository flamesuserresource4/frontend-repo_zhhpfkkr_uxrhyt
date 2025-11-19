import { useEffect, useState } from 'react'

function ViralVideoPage(){
  const base = import.meta.env.VITE_BACKEND_URL || ''
  const [items, setItems] = useState([])

  useEffect(()=>{
    fetch(`${base}/api/videos`).then(r=>r.json()).then(setItems).catch(()=>{})
  }, [base])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-4">वायरल वीडियो</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(v => (
          <div key={v.id} className="rounded overflow-hidden border border-black/10 dark:border:white/10">
            <div className="aspect-video">
              <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${v.youtube_id}`} title={v.title} allowFullScreen></iframe>
            </div>
            <div className="p-3 font-semibold">{v.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViralVideoPage
