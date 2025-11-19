import { useEffect, useState } from 'react'

function NewsletterPopup(){
  const base = import.meta.env.VITE_BACKEND_URL || ''
  const [show, setShow] = useState(false)

  useEffect(()=>{
    const seen = localStorage.getItem('rj_newsletter_seen')
    if(!seen){
      const id = setTimeout(()=>setShow(true), 3000)
      return ()=>clearTimeout(id)
    }
  }, [])

  const subscribe = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    await fetch(`${base}/api/subscribe`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email}) })
    localStorage.setItem('rj_newsletter_seen','1')
    setShow(false)
    alert('धन्यवाद! आपने Rajasthan Junction न्यूज़लेटर जॉइन कर लिया है।')
  }

  if(!show) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-[92vw] max-w-md border border-red-600/30">
        <div className="text-2xl font-extrabold mb-1"><span className="text-red-600">Rajasthan</span> Junction</div>
        <div className="text-sm text-black/70 dark:text-white/70 mb-4">Top stories हर सुबह। ईमेल डालें:</div>
        <form onSubmit={subscribe} className="flex">
          <input name="email" required type="email" placeholder="name@email.com" className="flex-1 px-3 py-2 rounded-l bg-black/5 dark:bg-white/10 outline-none" />
          <button className="px-4 py-2 bg-red-600 text-white rounded-r">Subscribe</button>
        </form>
        <button onClick={()=>setShow(false)} className="mt-3 text-xs text-black/60 dark:text-white/60 hover:text-red-600">No thanks</button>
      </div>
    </div>
  )
}

export default NewsletterPopup
