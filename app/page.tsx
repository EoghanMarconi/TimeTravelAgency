import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { ChevronDown, Shield, Target, Clock, Star, Quote, Play } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import RecommendationQuiz from '../components/RecommendationQuiz';
import { destinations } from '../lib/destinations';
import video from '@assets/video.mp4';

const HomePage = () => {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const stagger: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient & Particles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0f0c29] to-black z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 brightness-100 contrast-150"></div>
        <div className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -top-20 -left-20 animate-pulse-slow"></div>
        <div className="absolute w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] bottom-20 right-20 animate-pulse-slow"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Voyagez à Travers <br />
              <span className="bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent animate-gradient-x">
                Le Temps
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Explorez l'Égypte Antique, l'Europe Médiévale ou le Futur. <br />
              Votre aventure temporelle commence ici.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/destinations"
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              >
                Découvrir nos destinations
              </Link>
              <button 
                onClick={scrollToHowItWorks}
                className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all backdrop-blur-sm cursor-pointer"
              >
                Comment ça marche ?
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section id="how-it-works" className="py-24 bg-slate-950 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">L'excellence du voyage temporel</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Shield, title: "Sécurité Garantie", desc: "Protocoles de protection temporelle certifiés et assurance rapatriement incluse." },
              { icon: Target, title: "Guides Experts", desc: "Nos accompagnateurs sont historiens et formés à la survie dans chaque époque." },
              { icon: Clock, title: "Retour Assuré", desc: "Technologie de rappel infaillible synchronisée avec votre bracelet Chronos." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors text-center group"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NOUVELLE SECTION VIDEO IMMERSIVE */}
      <section className="py-12 bg-slate-900 relative z-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
          >
            {/* 
               --- GUIDE: REMPLACER LA VIDÉO ICI --- 
               Changez l'attribut 'src' de la balise <source> ci-dessous.
               Vous pouvez mettre un lien vers une vidéo mp4 hébergée ou un fichier local.
            */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
            >
              <source src={video} type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo.
            </video>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
               <div className="max-w-2xl">
                 <div className="flex items-center gap-3 text-accent mb-2">
                    <Play size={20} className="fill-current" />
                    <span className="font-bold tracking-wider uppercase text-sm">Immersion Totale</span>
                 </div>
                 <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Vivez l'Histoire de l'Intérieur</h2>
                 <p className="text-gray-200 text-lg mb-6">
                   Nos simulations vous préparent au choc temporel. Regardez un aperçu de ce qui vous attend.
                 </p>
                 <Link to="/reservation" className="inline-block bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-all">
                    Commencer l'expérience
                 </Link>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destinations Preview (Limited to 3) */}
      <section className="py-24 bg-slate-950 relative z-10">
        <div className="container mx-auto px-4">
           <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-12"
           >
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">Nos Destinations Populaires</h2>
              <p className="text-gray-400">Les époques les plus plébiscitées par nos voyageurs.</p>
            </div>
            <Link to="/destinations" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors">
              Voir toutes les destinations <Clock size={16} />
            </Link>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* GUIDE: Ici on utilise .slice(0, 3) pour ne montrer que les 3 premiers */}
            {destinations.slice(0, 3).map((dest) => (
              <motion.div key={dest.id} variants={fadeInUp}>
                <DestinationCard destination={dest} />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-8 text-center md:hidden">
             <Link to="/destinations" className="text-primary font-medium">Voir toutes les destinations</Link>
          </div>
        </div>
      </section>

      {/* Recommendation Quiz Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeInUp}
          >
             <RecommendationQuiz />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Paroles de Voyageurs
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { name: "Sophie M.", role: "A visité l'Égypte", text: "Voir les pyramides en construction était époustouflant. Le guide était très pro !", img: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
              { name: "Marc D.", role: "A visité 2150", text: "Le dîner avec l'IA restera mon meilleur souvenir culinaire. Le futur a du goût.", img: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
              { name: "Léa P.", role: "A visité le Moyen Âge", text: "J'ai adoré le tournoi, moins l'odeur des rues... mais c'est ça l'immersion !", img: "https://i.pravatar.cc/150?u=a04258a2462d826712d" },
            ].map((t, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="bg-white/5 p-6 rounded-2xl relative"
              >
                <Quote className="absolute top-4 right-4 text-white/10 w-10 h-10" />
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full border-2 border-primary" />
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <span className="text-xs text-primary">{t.role}</span>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{t.text}"</p>
                <div className="flex gap-1 mt-4 text-accent">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;