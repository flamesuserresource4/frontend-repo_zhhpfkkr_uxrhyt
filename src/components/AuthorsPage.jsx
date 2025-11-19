import { useEffect, useState } from 'react'

function AuthorsPage(){
  const base = import.meta.env.VITE_BACKEND_URL || ''
  const [items, setItems] = useState([])

  useEffect(()=>{
    fetch(`${base}/api/authors`).then(r=>r.json()).then(setItems).catch(()=>{})
  }, [base])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-6">हमारे लेखक</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(a => (
          <div key={a.id} className="p-4 rounded border border-black/10 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold">
                {a.name?.slice(0,2)}
              </div>
              <div>
                <div className="font-semibold">{a.name}</div>
                <div className="text-sm text-black/60 dark:text-white/60">{a.bio || 'Rajasthan Junction Reporter'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AuthorsPage
