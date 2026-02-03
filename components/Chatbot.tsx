import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn, formatPrice } from '../lib/utils';
import { GoogleGenAI, Chat } from "@google/genai";
import { destinations } from '../lib/destinations';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatResponse {
  answer: string;
  suggestions: string[];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Bienvenue ! Je suis Chronos, votre guide à travers les époques. Quelle destination temporelle vous intrigue ?", sender: 'bot' }
  ]);
  const [suggestions, setSuggestions] = useState<string[]>(["Voir les tarifs", "Est-ce dangereux ?", "L'Égypte Antique"]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini Chat Session
  useEffect(() => {
    const initChat = async () => {
      // Check if API key exists in environment
      if (!process.env.API_KEY) {
        setError("Clé API manquante. Configurez API_KEY dans votre fichier .env");
        return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Prepare context from destinations
        const destinationsContext = destinations.map(d => 
          `- ${d.name} (${d.period}): ${d.shortDesc}. Prix: ${formatPrice(d.price)}. Difficulté: ${d.difficulty}/3. Durée: ${d.duration}. Avertissement: ${d.warning}.`
        ).join('\n');

        const systemInstruction = `
          Tu es Chronos, un guide de voyage temporel pour l'agence "TimeTravel Agency".
          
          Ton rôle :
          - Aider les utilisateurs à choisir une destination parmi nos offres.
          - Répondre aux questions sur la sécurité (garantie par le Consortium Temporel), les prix et les détails pratiques.
          - Adopter un ton professionnel mais mystérieux, évoquant la grandeur de l'histoire.
          
          Nos destinations disponibles :
          ${destinationsContext}
          
          Règles strictes :
          - Ne jamais inventer de destinations hors de cette liste.
          - Rappeler que le changement du passé est interdit (Protocole de Non-Interférence).
          - Si on te demande des prix, sois précis.
          - Tes réponses textuelles doivent être concises (maximum 3 phrases).
          
          FORMAT DE RÉPONSE JSON OBLIGATOIRE :
          Tu dois toujours répondre avec un objet JSON valide suivant ce schéma :
          {
            "answer": "Ta réponse textuelle ici.",
            "suggestions": ["Suggestion courte 1", "Suggestion courte 2", "Suggestion courte 3"]
          }
          Les suggestions doivent être des questions ou sujets courts (max 5 mots) que l'utilisateur pourrait vouloir aborder ensuite, basés sur le contexte de ta réponse.
        `;

        const chat = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
          },
        });
        
        setChatSession(chat);
        setError(null);
      } catch (error) {
        console.error("Erreur d'initialisation de l'IA", error);
        setError("Erreur de connexion aux services temporels.");
      }
    };

    initChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping, suggestions]);

  const handleSend = async (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const textToSend = overrideText || inputValue;
    if (!textToSend.trim()) return;

    // Add user message immediately
    const userMsg: Message = { id: Date.now(), text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setSuggestions([]); // Hide suggestions while typing
    setIsTyping(true);

    try {
      if (!chatSession) {
        throw new Error("L'IA n'est pas encore prête.");
      }

      // Send to Gemini
      const result = await chatSession.sendMessage({ message: textToSend });
      const responseText = result.text;
      
      let parsedResponse: ChatResponse;
      try {
        parsedResponse = JSON.parse(responseText || '{}');
      } catch (e) {
         // Fallback logic
         console.warn("JSON Parse Error:", e);
         parsedResponse = {
           answer: responseText || "Je reçois des interférences. Pouvez-vous répéter ?",
           suggestions: ["Destinations", "Tarifs", "Sécurité"]
         };
      }

      const botMsg: Message = { id: Date.now() + 1, text: parsedResponse.answer || "...", sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
      setSuggestions(parsedResponse.suggestions || []);

    } catch (error) {
      console.error("Erreur chat:", error);
      const errorMsg: Message = { id: Date.now() + 1, text: "Mes circuits temporels sont brouillés (Erreur API). Réessayez plus tard.", sender: 'bot' };
      setMessages(prev => [...prev, errorMsg]);
      setSuggestions(["Réessayer"]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          isOpen ? "hidden" : "flex animate-bounce"
        )}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-primary/20 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                     <Sparkles size={20} className="text-white" />
                  </div>
                  <div className={cn(
                    "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900",
                    !error && chatSession ? "bg-green-500" : "bg-red-500"
                  )}></div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white">Chronos</h3>
                  <p className="text-xs text-primary-200">Guide IA Certifié</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex w-full",
                    msg.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                      msg.sender === 'user'
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-white/10 text-gray-200 rounded-bl-none border border-white/5"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl rounded-bl-none p-3 flex gap-1 items-center">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    <span className="text-xs text-gray-400 ml-2">Chronos réfléchit...</span>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="flex justify-center mt-4">
                   <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-xs p-2 rounded-lg flex items-center gap-2">
                      <AlertCircle size={14} />
                      {error}
                   </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input & Suggestions */}
            <div className="p-4 border-t border-white/10 bg-slate-950/50">
               {/* Suggestions Area */}
               {!isTyping && !error && suggestions.length > 0 && (
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {suggestions.map((suggestion, idx) => (
                    <button 
                      key={idx}
                      type="button" 
                      onClick={(e) => handleSend(e, suggestion)} 
                      className="whitespace-nowrap px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
               )}
               
              <form onSubmit={(e) => handleSend(e)} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={error ? "Système hors ligne" : "Posez une question..."}
                  disabled={!!error}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping || !chatSession || !!error}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;