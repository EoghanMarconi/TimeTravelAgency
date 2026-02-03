import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import HomePage from './app/page';
import DestinationsPage from './app/destinations/page';
import ReservationPage from './app/reservation/page';
import { AnimatePresence, motion } from 'framer-motion';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    // If there is no hash, scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // If there is a hash, try to find the element and scroll to it
      // Timeout is needed to ensure the page has rendered the content
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
};

// Page transition wrapper
const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/destinations" element={<PageWrapper><DestinationsPage /></PageWrapper>} />
        <Route path="/reservation" element={<PageWrapper><ReservationPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-primary selection:text-white">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <Chatbot />
      </div>
    </HashRouter>
  );
};

export default App;