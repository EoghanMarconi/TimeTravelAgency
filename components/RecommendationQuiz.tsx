import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Type } from "@google/genai";
import { destinations } from '../lib/destinations';
import { BrainCircuit, Sparkles, ChevronRight, RefreshCw, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const questions = [
  {
    id: 1,
    question: "Quelle est votre ambiance idéale ?",
    options: [
      { text: "Mystique, antique et grandiose", value: "ancient" },
      { text: "Chevaleresque, brutale et festive", value: "medieval" },
      { text: "Néon, technologique et utopique", value: "future" },
      { text: "Historique, intense et réel", value: "war" },
      { text: "Artistique, raffiné et intellectuel", value: "art" }
    ]
  },
  {
    id: 2,
    question: "Votre niveau de confort requis ?",
    options: [
      { text: "Aventure totale, peu importe la boue", value: "low" },
      { text: "Confortable mais authentique", value: "medium" },
      { text: "Luxe absolu et technologie de pointe", value: "high" }
    ]
  },
  {
    id: 3,
    question: "Face au danger, vous êtes...",
    options: [
      { text: "Prudent, je veux juste observer", value: "careful" },
      { text: "Courageux, je veux vivre l'action", value: "brave" },
      { text: "Philosophe, je cherche la beauté", value: "curious" }
    ]
  }
];

const RecommendationQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{ destinationId: string; reason: string } | null>(null);

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Quiz finished, call AI
      await getAIRecommendation(newAnswers);
    }
  };

  const getAIRecommendation = async (userAnswers: string[]) => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        Basé sur ces réponses d'un utilisateur à un quiz de voyage temporel :
        1. Ambiance: ${userAnswers[0]}
        2. Confort: ${userAnswers[1]}
        3. Danger: ${userAnswers[2]}

        Choisis la MEILLEURE destination parmi ces IDs : 
        ['atlantide', 'egypte-antique', 'rome-imperiale', 'europe-medievale', 'florence-renaissance', 'debarquement-normandie', 'futur-solarpunk']
        
        Logique de recommandation :
        - Luxe/Tech/Futur -> futur-solarpunk ou atlantide
        - Art/Intellect -> florence-renaissance
        - Action/Guerre -> debarquement-normandie ou europe-medievale
        - Antique/Monumental -> egypte-antique ou rome-imperiale
        
        Retourne un JSON avec :
        - 'destinationId': l'ID exact de la liste ci-dessus.
        - 'reason': une phrase courte (max 20 mots) amusante et personnalisée expliquant pourquoi ce choix correspond à sa personnalité (tutoiement).
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              destinationId: { type: Type.STRING },
              reason: { type: Type.STRING },
            },
            required: ["destinationId", "reason"],
          },
        }
      });
      
      const text = response.text;
      if (text) {
        const result = JSON.parse(text);
        setRecommendation(result);
      } else {
         throw new Error("No response");
      }

    } catch (error) {
      console.error("AI Error", error);
      // Fallback simple logic
      setRecommendation({
        destinationId: 'futur-solarpunk',
        reason: "Nos algorithmes de secours te suggèrent l'utopie pour plus de sûreté !"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setRecommendation(null);
  };

  const recommendedDest = destinations.find(d => d.id === recommendation?.destinationId);

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full text-sm font-medium text-primary-300 mb-4 border border-white/5">
          <BrainCircuit size={16} />
          <span>Algorithme Prédictif</span>
        </div>
        <h2 className="font-heading text-3xl font-bold">Trouvez votre époque idéale</h2>
      </div>

      <div className="min-h-[350px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!loading && !recommendation && (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Question {currentStep + 1}/{questions.length}</span>
                <span>{Math.round(((currentStep) / questions.length) * 100)}%</span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-center mb-8">{questions[currentStep].question}</h3>
              
              <div className="grid gap-3">
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.value)}
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all text-left"
                  >
                    <span className="text-gray-200 group-hover:text-white transition-colors">{option.text}</span>
                    <ChevronRight className="text-gray-600 group-hover:text-primary transition-colors" size={20} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                <Sparkles className="absolute inset-0 m-auto text-white animate-pulse" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Analyse Temporelle...</h3>
                <p className="text-gray-400">Chronos étudie votre profil psychologique.</p>
              </div>
            </motion.div>
          )}

          {recommendation && recommendedDest && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <p className="text-sm text-gray-400 mb-2">Votre destination idéale est :</p>
              <h3 className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6">
                {recommendedDest.name}
              </h3>
              
              <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10 relative">
                <div className="absolute -top-3 -left-3 bg-accent text-slate-900 p-2 rounded-full">
                  <Sparkles size={20} />
                </div>
                <p className="text-lg italic text-gray-200 leading-relaxed">
                  "{recommendation.reason}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/reservation" 
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-bold transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  Réserver ce voyage
                </Link>
                <button 
                  onClick={resetQuiz}
                  className="px-8 py-3 bg-transparent border border-white/20 hover:bg-white/5 text-gray-300 rounded-full font-medium transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw size={20} />
                  Recommencer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecommendationQuiz;