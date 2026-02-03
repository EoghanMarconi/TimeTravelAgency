import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations, Destination } from '../../lib/destinations';
import { formatPrice } from '../../lib/utils';
import { X, Calendar, AlertTriangle, CheckCircle, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// Composant interne pour gérer la logique vidéo de chaque item individuellement
const DestinationListItem = ({ 
  dest, 
  index, 
  onSelect 
}: { 
  dest: Destination; 
  index: number; 
  onSelect: (d: Destination) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      playPromiseRef.current = videoRef.current.play();
      playPromiseRef.current.catch(error => console.debug("Video play prevented:", error));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          })
          .catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer flex flex-col h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(dest)}
    >
      <div className="h-64 overflow-hidden relative isolate shrink-0">
         {/* Image de fond (z-0) */}
         <img 
            src={dest.image} 
            alt={dest.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0" 
         />
         
         {/* Vidéo au survol (z-10) */}
         <video
            ref={videoRef}
            src={dest.video}
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 z-10"
          />

         {/* Badge Période (z-20) */}
         <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20 z-20 shadow-lg">
           {dest.period}
         </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h2 className="font-heading text-2xl font-bold">{dest.name}</h2>
          <div className="flex gap-1 text-accent">
            {[...Array(dest.difficulty)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
        </div>
        <p className="text-gray-400 mb-6 min-h-[50px]">{dest.shortDesc}</p>
        
        <div className="space-y-3 mb-8 flex-grow">
          {dest.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={16} className="text-primary shrink-0" />
              {h}
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between mt-auto pt-6 border-t border-white/5">
          <div>
            <span className="text-gray-500 text-sm block">À partir de</span>
            <span className="text-2xl font-bold text-white">{formatPrice(dest.price)}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(dest);
            }}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium border border-white/10 hover:border-primary/50"
          >
            Détails
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const DestinationsPage = () => {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  return (
    <div className="pt-20 min-h-screen bg-slate-950">
      {/* Hero Secondary */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Choisissez Votre Époque</h1>
          <p className="text-xl text-gray-300">Trois destinations extraordinaires vous attendent</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <DestinationListItem 
              dest={dest} 
              index={index} 
              onSelect={setSelectedDest} 
            />
          ))}
        </div>
      </section>

      {/* Modal Detail */}
      <AnimatePresence>
        {selectedDest && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDest(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedDest(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="relative h-64 md:h-80">
                <img src={selectedDest.image} alt={selectedDest.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 to-transparent h-32" />
                <div className="absolute bottom-6 left-6 md:left-10">
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">{selectedDest.name}</h2>
                  <p className="text-xl text-primary font-bold">{selectedDest.period}</p>
                </div>
              </div>

              <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">À propos du voyage</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedDest.longDesc}</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                       <AlertTriangle className="text-accent" size={20} />
                       Avertissement Temporel
                    </h3>
                    <p className="text-gray-300 italic text-sm">"{selectedDest.warning}"</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">Points Forts</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedDest.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                          <CheckCircle className="text-primary shrink-0" size={18} />
                          <span className="text-sm">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1 space-y-6">
                   <div className="bg-slate-950 p-6 rounded-2xl border border-white/10">
                     <div className="mb-4">
                       <span className="text-gray-400 text-sm">Prix par personne</span>
                       <div className="text-3xl font-bold text-white">{formatPrice(selectedDest.price)}</div>
                     </div>
                     
                     <div className="space-y-4 mb-6 text-sm text-gray-300">
                       <div className="flex items-center justify-between border-b border-white/5 pb-2">
                         <span className="flex items-center gap-2"><Clock size={16} /> Durée</span>
                         <span>{selectedDest.duration}</span>
                       </div>
                       <div className="flex items-center justify-between border-b border-white/5 pb-2">
                         <span className="flex items-center gap-2"><Star size={16} /> Difficulté</span>
                         <div className="flex text-accent">
                           {[...Array(3)].map((_, i) => (
                             <Star key={i} size={12} fill={i < selectedDest.difficulty ? "currentColor" : "none"} />
                           ))}
                         </div>
                       </div>
                       <div className="flex items-center justify-between border-b border-white/5 pb-2">
                         <span className="flex items-center gap-2"><Calendar size={16} /> Départs</span>
                         <span>Tous les mardis</span>
                       </div>
                     </div>

                     <Link
                       to="/reservation"
                       className="block w-full py-3 bg-primary hover:bg-primary-dark text-center text-white rounded-lg font-bold transition-colors"
                     >
                       Réserver maintenant
                     </Link>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationsPage;