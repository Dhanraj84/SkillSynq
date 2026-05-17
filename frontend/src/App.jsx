import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import About from './pages/About';
import CoverLetter from './pages/CoverLetter';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
        {/* Floating App Download Banner */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-md bg-white dark:bg-gray-800 rounded-full shadow-2xl border border-blue-500/30 p-2 px-4 flex items-center justify-between sm:hidden">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Get SkillSynq App</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">For a better experience</p>
            </div>
          </div>
          <a href="https://expo.dev/accounts/dj924/projects/mobile/builds/7b36b5bb-9d49-46fa-b1d6-afa1c8ddf617" target="_blank" rel="noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-full transition-colors">
            Download
          </a>
        </div>

        <Navbar />
        <main className="flex-grow pt-20 pb-24 sm:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/cover-letter" element={<CoverLetter />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
