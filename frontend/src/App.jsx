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
        <Navbar />
        <main className="flex-grow pt-20">
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
