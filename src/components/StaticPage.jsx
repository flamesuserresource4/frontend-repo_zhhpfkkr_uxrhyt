function StaticPage({ title, children }){
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-4">{title}</h1>
      <div className="prose dark:prose-invert max-w-none">{children}</div>
    </div>
  )
}

export default StaticPage
