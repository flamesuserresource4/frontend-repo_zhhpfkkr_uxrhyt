import { useEffect, useState } from 'react'

function LivePage(){
  const [items, setItems] = useState([])
  const base = import.meta.env.VITE_BACKEND_URL || ''

  const load = async () => {
    const res = await fetch(`${base}/api/live`)
    const data = await res.json()
    setItems(data)
  }

  useEffect(()=>{
    load()
    const id = setInterval(load, 15000)
    return ()=>clearInterval(id)
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-extrabold mb-4">Live Updates</h1>
      <div className="space-y-3">
        {items.map(i => (
          <a key={i.id} href={i.url || '#'} className="block p-3 border border-black/10 dark:border-white/10 rounded hover:border-red-600">
            <div className="text-sm text-black/60 dark:text-white/60">{new Date(i.created_at).toLocaleTimeString()}</div>
            <div className="font-medium">{i.headline}</div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default LivePage
