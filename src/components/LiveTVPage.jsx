function LiveTVPage(){
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-4">लाइव टीवी</h1>
      <div className="aspect-video rounded overflow-hidden border border-black/10 dark:border-white/10">
        <iframe className="w-full h-full" src="https://www.youtube.com/embed/live_stream?channel=UC4R8DWoMoI7CAwX8_LjQHig" title="Live" allowFullScreen></iframe>
      </div>
    </div>
  )
}

export default LiveTVPage
