function GallerySection({ items=[] }){
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {items.slice(0,8).map((img, idx) => (
        <div key={idx} className="relative overflow-hidden rounded">
          <img src={img} alt="" loading="lazy" className="w-full h-28 md:h-36 object-cover hover:scale-105 transition" />
        </div>
      ))}
    </div>
  )
}

export default GallerySection
