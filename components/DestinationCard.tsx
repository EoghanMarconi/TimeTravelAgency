import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Destination } from '../lib/destinations';
import { formatPrice } from '../lib/utils';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      // On joue la vidéo, on capture l'erreur potentielle si l'autoplay est bloqué
      videoRef.current.play().catch(error => {
        console.log("Lecture vidéo empêchée par le navigateur :", error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Remise à zéro pour le prochain survol
    }
  };

  return (
    <Link to="/destinations">
      <motion.div 
        className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-slate-900"
        whileHover="hover"
        initial="rest"
        animate="rest"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Container */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Image par défaut */}
          <motion.img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.15, transition: { duration: 0.5, ease: "easeOut" } }
            }}
          />

          {/* Vidéo au survol */}
          {/* La vidéo est en position absolue au-dessus de l'image, mais cachée (opacity-0) par défaut */}
          {/* La classe group-hover:opacity-100 la fait apparaître au survol */}
          <video
            ref={videoRef}
            src={destination.video}
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          />

          {/* Gradient Overlay pour la lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90" />
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
          <motion.div
            variants={{
              rest: { y: 20 },
              hover: { y: 0, transition: { duration: 0.3, ease: "easeOut" } }
            }}
          >
            {/* Header: Period & Name */}
            <div className="mb-2">
              <motion.span 
                className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-xs font-bold text-primary-300 mb-2"
                variants={{
                  rest: { opacity: 0.8 },
                  hover: { opacity: 1, backgroundColor: "rgba(99, 102, 241, 0.4)" }
                }}
              >
                {destination.period}
              </motion.span>
              <h3 className="text-2xl font-heading font-bold text-white mb-1 leading-tight">{destination.name}</h3>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
              {destination.shortDesc}
            </p>

            {/* Hidden Details (Reveal on Hover) */}
            <motion.div
              variants={{
                rest: { opacity: 0, height: 0, marginTop: 0 },
                hover: { opacity: 1, height: "auto", marginTop: 16, transition: { duration: 0.3 } }
              }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-4 text-xs text-gray-300 mb-4">
                <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5 backdrop-blur-sm">
                  <Clock size={14} className="text-accent" />
                  <span>{destination.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5 backdrop-blur-sm">
                  <Star size={14} className="text-accent" />
                  <span>Diff. {destination.difficulty}/3</span>
                </div>
              </div>

              {/* Highlights pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                 {destination.highlights.slice(0, 2).map((h, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-black/20 text-gray-400 backdrop-blur-sm">
                      {h}
                    </span>
                 ))}
              </div>
            </motion.div>

            {/* Footer: Price & Action */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">À partir de</p>
                  <p className="text-xl font-bold text-white">{formatPrice(destination.price)}</p>
              </div>
              <motion.div
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
                variants={{
                  rest: { x: 0, backgroundColor: "rgba(255,255,255,0.1)" },
                  hover: { x: 5, backgroundColor: "#6366f1", transition: { duration: 0.2 } }
                }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default DestinationCard;