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
import SearchPage from './components/SearchPage'
import AuthorsPage from './components/AuthorsPage'
import ElectionPage from './components/ElectionPage'
import ViralVideoPage from './components/ViralVideoPage'
import DistrictNewsPage from './components/DistrictNewsPage'
import LiveTVPage from './components/LiveTVPage'
import FactCheckPage from './components/FactCheckPage'
import NewsletterPopup from './components/NewsletterPopup'

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
        <Route path="/search" element={<SearchPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/election" element={<ElectionPage />} />
        <Route path="/viral-videos" element={<ViralVideoPage />} />
        <Route path="/district-news" element={<DistrictNewsPage />} />
        <Route path="/live-tv" element={<LiveTVPage />} />
        <Route path="/fact-check" element={<FactCheckPage />} />
        <Route path="/about" element={<StaticPage title="About Rajasthan Junction">Rajasthan Junction एक आधुनिक, तेज़ और भरोसेमंद डिजिटल न्यूज़ पोर्टल है। स्वामी: Yash Sharma. हम 24x7 अपडेट्स और पक्के सूत्रों के साथ खबरें प्रस्तुत करते हैं।</StaticPage>} />
        <Route path="/contact" element={<StaticPage title="Contact Us">Editorial/Contact: rajasthanjunctionkm@gmail.com • Phone: +91-XXXXXXXXXX</StaticPage>} />
        <Route path="/privacy" element={<StaticPage title="Privacy Policy">हम न्यूनतम डेटा एकत्र करते हैं (कुकीज़/एनालिटिक्स)। हम बिना अनुमति के डेटा साझा नहीं करते। किसी प्रश्न के लिए: rajasthanjunctionkm@gmail.com</StaticPage>} />
        <Route path="/terms" element={<StaticPage title="Terms & Conditions">इस वेबसाइट का उपयोग करते समय आप हमारी नीतियों को स्वीकार करते हैं। सामग्री समाचार उद्देश्यों के लिए है। गलतियों के लिए कृपया हमें लिखें।</StaticPage>} />
        <Route path="/disclaimer" element={<StaticPage title="Disclaimer">प्रकाशित खबरें विश्वसनीय स्रोतों पर आधारित हैं। किसी भी दावे की पुष्टि के लिए आधिकारिक नोटिस देखें। लीगल नोटिस: rajasthanjunctionkm@gmail.com</StaticPage>} />
        <Route path="/article/:id" element={<ArticleRoute />} />
      </Routes>

      <Footer />
      <NewsletterPopup />
    </div>
  )
}

function ArticleRoute(){
  const { pathname } = useLocation()
  const id = pathname.split('/').pop()
  return <ArticlePage id={id} />
}

export default App
