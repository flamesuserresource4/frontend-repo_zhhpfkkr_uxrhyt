import { useEffect, useState } from 'react'

function ElectionPage(){
  const base = import.meta.env.VITE_BACKEND_URL || ''
  const [live, setLive] = useState(null)
  const [districts, setDistricts] = useState([])

  const load = async () => {
    const s = await fetch(`${base}/api/election/live`).then(r=>r.json())
    const d = await fetch(`${base}/api/election/districts`).then(r=>r.json())
    setLive(s); setDistricts(d)
  }

  useEffect(()=>{ load(); const id=setInterval(load,20000); return ()=>clearInterval(id) }, [base])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-extrabold mb-4">इलेक्शन लाइव</h1>
      {live && (
        <div className="p-4 rounded border border-black/10 dark:border-white/10 mb-6">
          <div className="text-sm text-black/60 dark:text-white/60">अपडेट: {new Date(live.updated_at).toLocaleTimeString()}</div>
          <div className="mt-2 font-semibold">टर्नआउट: {live.summary.turnout}</div>
          <div className="mt-1">लीडिंग पार्टी: {live.summary.leading_party}</div>
          <div className="mt-1">सीटें: {Object.entries(live.summary.seats).map(([k,v])=>`${k}:${v}`).join(', ')}</div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-3">जिला-वार नतीजे</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {districts.map(d => (
          <div key={d.district} className="p-3 rounded border border-black/10 dark:border-white/10">
            <div className="font-semibold">{d.district}</div>
            <div className="text-sm">लीडिंग: <span className="text-red-600">{d.leading_party}</span></div>
            <div className="text-xs text-black/60 dark:text-white/60">गिनती: {d.votes_counted}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ElectionPage
