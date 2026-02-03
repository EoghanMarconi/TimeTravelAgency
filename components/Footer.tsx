import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Instagram, Twitter, Facebook, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const Footer = () => {
  const explorationLinks = [
    { name: 'Nos Destinations', path: '/destinations' },
    { name: 'Comment ça marche', path: '/#how-it-works' },
    { name: 'Témoignages', path: '/#testimonials' },
    { name: 'Réserver un voyage', path: '/reservation' }
  ];

  const legalLinks = [
    { name: 'Mentions Légales', path: '#' },
    { name: 'Politique de Confidentialité', path: '#' },
    { name: 'Assurance Temporelle', path: '#' },
    { name: 'FAQ Paradoxes', path: '#' }
  ];

  return (
    <footer className="relative bg-slate-950 pt-20 pb-10 overflow-hidden">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="relative">
                <Clock className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                <div className="absolute inset-0 bg-primary/50 blur-lg rounded-full opacity-30 group-hover:opacity-60 transition-opacity" />
              </div>
              <span className="font-display font-bold text-xl tracking-wider text-white">
                TimeTravel <span className="text-primary group-hover:text-accent transition-colors">Agency</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pionniers du tourisme chronologique depuis 2142. Nous transformons l'histoire en souvenirs et le futur en destination.
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-primary" />
                <span>Base Temporelle Alpha, Paris</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-primary" />
                <span>+33 (0)1 99 88 77 66</span>
              </div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">Exploration</h3>
            <ul className="space-y-4 text-sm">
              {explorationLinks.map((item) => (
                <li key={item.name}>
                  {/* Using standard Link, hash handling is done in App.tsx ScrollToTop */}
                  <Link 
                    to={item.path} 
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-accent transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">Légal & Aide</h3>
            <ul className="space-y-4 text-sm">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.path} className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-accent transition-colors"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">Restez Synchronisé</h3>
            <p className="text-gray-400 text-sm mb-4">
              Recevez nos offres flash pour l'Antiquité et le Futur directement dans votre présent.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-gray-600"
                />
              </div>
              <button className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 group">
                S'inscrire
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs">
            © 2024 TimeTravel Agency. Certifié par le Consortium Intergalactique.
          </p>
          
          <div className="flex gap-4">
            {[Twitter, Instagram, Facebook].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-110 transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;