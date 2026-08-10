import Navbar from "./components/Navbar"
import Header from "./components/Header"
import Aboutme from "./components/Aboutme"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-200 antialiased">
      <Navbar />
      <main>
        <Header />
        <Aboutme />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
