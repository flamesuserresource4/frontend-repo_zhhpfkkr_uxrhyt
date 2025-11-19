function Footer() {
  return (
    <footer className="mt-12 border-t border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-extrabold text-xl mb-3"><span className="text-red-600">Rajasthan</span> <span className="text-black dark:text-white">Junction</span></div>
          <p className="text-black/70 dark:text-white/70">Breaking news, trending stories, and viral updates from Rajasthan and across India.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-black/70 dark:text-white/70">
            <li><a href="/about" className="hover:text-red-600">About Us</a></li>
            <li><a href="/contact" className="hover:text-red-600">Contact Us</a></li>
            <li><a href="/policies" className="hover:text-red-600">Privacy & Terms</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Categories</h4>
          <ul className="space-y-1 text-black/70 dark:text-white/70">
            {['Politics','Crime','Viral News','Sports','Bollywood','Religion','Technology','Rajasthan'].map(c => (
              <li key={c}><a href={`/categories?name=${encodeURIComponent(c)}`} className="hover:text-red-600">{c}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Newsletter</h4>
          <p className="text-black/70 dark:text-white/70 mb-3">Get the biggest stories delivered to your inbox.</p>
          <form onSubmit={(e)=>{e.preventDefault(); const email=e.target.email.value; fetch((import.meta.env.VITE_BACKEND_URL||'') + '/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})}).then(()=>alert('Subscribed'))}} className="flex">
            <input name="email" required placeholder="Your email" className="flex-1 px-3 py-2 rounded-l bg-black/5 dark:bg-white/10 outline-none" />
            <button className="px-4 py-2 bg-red-600 text-white rounded-r">Join</button>
          </form>
        </div>
      </div>
      <div className="text-center text-xs py-4 bg-black text-white">© {new Date().getFullYear()} Rajasthan Junction</div>
    </footer>
  )
}

export default Footer
