import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Events } from './pages/Events'
import { Home } from './pages/Home'
import { Ministries } from './pages/Ministries'
import { NotFound } from './pages/NotFound'
import { Sermons } from './pages/Sermons'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/ministerios" element={<Ministries />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/sermones" element={<Sermons />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
