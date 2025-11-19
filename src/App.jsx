import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TopBar from './components/TopBar'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import CategoriesPage from './components/CategoriesPage'
import LivePage from './components/LivePage'
import VideosPage from './components/VideosPage'
import StaticPage from './components/StaticPage'
import ArticlePage from './components/ArticlePage'

function ScrollToTop(){
  const { pathname } = useLocation()
  useEffect(()=>{ window.scrollTo(0,0) }, [pathname])
  return null
}

function App() {
  const [theme, setTheme] = useState('light')
  useEffect(()=>{
    const saved = localStorage.getItem('theme') || 'light'
    setTheme(saved)
    document.documentElement.classList.toggle('dark', saved === 'dark')
  }, [])
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <ScrollToTop />
      <TopBar />
      <Header onToggleTheme={toggleTheme} theme={theme} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/about" element={<StaticPage title="About Rajasthan Junction">Rajasthan Junction is a modern, fast, and clean digital news portal covering Rajasthan and India. We bring you breaking news, trending stories, and viral updates with a focus on accuracy and speed.</StaticPage>} />
        <Route path="/contact" element={<StaticPage title="Contact Us">For news tips, partnerships, or feedback, email us at contact@rajasthanjunction.in</StaticPage>} />
        <Route path="/policies" element={<StaticPage title="Privacy Policy & Terms">Your privacy matters. We do not share personal data with third parties without consent. Use of this website constitutes acceptance of our terms and policies.</StaticPage>} />
        <Route path="/article/:id" element={<ArticleRoute />} />
      </Routes>

      <Footer />
    </div>
  )
}

function ArticleRoute(){
  const { pathname } = useLocation()
  const id = pathname.split('/').pop()
  return <ArticlePage id={id} />
}

export default App
