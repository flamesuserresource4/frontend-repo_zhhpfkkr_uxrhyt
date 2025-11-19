import { useEffect, useState } from 'react'
import { Facebook, Instagram, Youtube, Share2 } from 'lucide-react'

function ArticlePage({ id }) {
  const [data, setData] = useState(null)
  const base = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(() => {
    fetch(`${base}/api/articles/${id}`).then(r=>r.json()).then(setData).catch(()=>setData({error:true}))
  }, [id, base])

  if(!data) return <div className="max-w-3xl mx-auto px-4 py-10">Loading...</div>
  if(data.error) return <div className="max-w-3xl mx-auto px-4 py-10">Not found</div>

  const { article, recommended, schema, seo } = data

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
      <article className="lg:col-span-2">
        <div className="text-xs uppercase tracking-wider text-red-600">{article.category}</div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{article.title}</h1>
        <div className="text-sm text-black/60 dark:text-white/60 mb-4">By {article.author?.name || 'Rajasthan Junction'} • {new Date(article.created_at || Date.now()).toLocaleString()}</div>
        {article.thumbnail && <img src={article.thumbnail} className="w-full rounded mb-4" alt="" />}
        <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{__html: article.content || ''}} />

        <div className="flex items-center gap-3 mt-6">
          <button className="px-3 py-2 bg-black text-white rounded text-sm flex items-center gap-2"><Share2 size={16}/> Share</button>
          <a href="#" className="px-3 py-2 bg-[#1877F2] text-white rounded text-sm flex items-center gap-2"><Facebook size={16}/> Facebook</a>
          <a href="#" className="px-3 py-2 bg-[#E1306C] text-white rounded text-sm flex items-center gap-2"><Instagram size={16}/> Instagram</a>
          <a href="#" className="px-3 py-2 bg-[#FF0000] text-white rounded text-sm flex items-center gap-2"><Youtube size={16}/> YouTube</a>
        </div>

        <div className="mt-8 p-4 rounded border border-black/10 dark:border-white/10">
          <div className="font-semibold mb-2">Comments</div>
          <CommentBox articleId={article.id} />
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />
        <meta name="description" content={seo?.description || ''} />
      </article>

      <aside>
        <div className="font-semibold mb-3">Recommended</div>
        <div className="space-y-3">
          {recommended?.map(r => (
            <a key={r.id} href={`/article/${r.id}`} className="flex gap-3">
              {r.thumbnail && <img src={r.thumbnail} className="w-24 h-16 object-cover rounded" alt="" />}
              <div>
                <div className="text-xs uppercase tracking-wider text-red-600">{r.category}</div>
                <div className="font-medium hover:text-red-600 line-clamp-2">{r.title}</div>
              </div>
            </a>
          ))}
        </div>
      </aside>
    </div>
  )
}

function CommentBox({ articleId }){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const base = import.meta.env.VITE_BACKEND_URL || ''

  const load = async () => {
    setLoading(true)
    try{
      const res = await fetch(`${base}/api/articles/${articleId}/comments`)
      const data = await res.json()
      setItems(data)
    } finally { setLoading(false) }
  }

  useEffect(()=>{ load() }, [articleId])

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const payload = { name: form.get('name'), email: form.get('email'), message: form.get('message') }
    await fetch(`${base}/api/articles/${articleId}/comments`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    e.target.reset()
    load()
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-2">
        <input name="name" required placeholder="Name" className="px-3 py-2 rounded bg-black/5 dark:bg-white/10" />
        <input name="email" required type="email" placeholder="Email" className="px-3 py-2 rounded bg-black/5 dark:bg-white/10" />
        <textarea name="message" required placeholder="Comment" className="sm:col-span-2 px-3 py-2 rounded bg-black/5 dark:bg-white/10" />
        <button className="sm:col-span-2 px-4 py-2 bg-red-600 text-white rounded">Post Comment</button>
      </form>

      <div className="mt-4 space-y-3">
        {loading ? 'Loading comments...' : items.map(c => (
          <div key={c.id} className="p-3 rounded bg-black/5 dark:bg-white/10">
            <div className="text-sm font-semibold">{c.name}</div>
            <div className="text-xs text-black/60 dark:text-white/60">{new Date(c.created_at).toLocaleString()}</div>
            <div className="mt-1">{c.message}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticlePage
