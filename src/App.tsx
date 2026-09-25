import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import { SplashScreen } from './components/SplashScreen'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Events } from './pages/Events'
import { Giving } from './pages/Giving'
import { Home } from './pages/Home'
import { Ministries } from './pages/Ministries'
import { MinistryDetail } from './pages/MinistryDetail'
import { NotFound } from './pages/NotFound'
import { Sermons } from './pages/Sermons'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-night-950 dark:text-night-100">
      <ScrollToTop />
      <SplashScreen />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/ministerios" element={<Ministries />} />
          <Route path="/ministerios/:id" element={<MinistryDetail />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/sermones" element={<Sermons />} />
          <Route path="/ofrendas" element={<Giving />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
