import { useEffect, useState } from 'react'

function VideosPage(){
  const [items, setItems] = useState([])
  const base = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(()=>{
    fetch(`${base}/api/videos`).then(r=>r.json()).then(setItems)
  }, [base])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-extrabold mb-4">Videos</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(v => (
          <div key={v.id} className="rounded overflow-hidden border border-black/10 dark:border-white/10">
            {v.thumbnail && <img src={v.thumbnail} className="w-full h-56 object-cover" alt="" />}
            <div className="p-3 font-semibold">{v.title || 'Video'}</div>
            {v.youtube_id && (
              <div className="aspect-video">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${v.youtube_id}`} title="YouTube video" allowFullScreen />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideosPage
