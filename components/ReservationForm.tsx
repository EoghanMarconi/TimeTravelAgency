import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { destinations } from '../lib/destinations';
import { formatPrice, cn } from '../lib/utils';
import { Check, ChevronRight, Calendar, User, Plane, CheckCircle2 } from 'lucide-react';

const ReservationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destinationId: '',
    date: '',
    travelers: 1,
    name: '',
    email: '',
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const selectedDestination = destinations.find(d => d.id === formData.destinationId);

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-heading font-bold text-center">Où souhaitez-vous aller ?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {destinations.map(dest => (
          <div
            key={dest.id}
            onClick={() => setFormData({ ...formData, destinationId: dest.id })}
            className={cn(
              "cursor-pointer rounded-xl border-2 p-4 transition-all relative overflow-hidden group",
              formData.destinationId === dest.id
                ? "border-primary bg-primary/10"
                : "border-white/10 bg-white/5 hover:border-white/30"
            )}
          >
            <img src={dest.image} alt={dest.name} className="w-full h-32 object-cover rounded-lg mb-3" />
            <div className="text-center">
              <h4 className="font-bold text-white">{dest.name}</h4>
              <p className="text-xs text-primary">{dest.period}</p>
              <p className="text-sm text-gray-400 mt-2">{formatPrice(dest.price)}</p>
            </div>
            {formData.destinationId === dest.id && (
              <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                <Check size={12} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 max-w-md mx-auto">
      <h3 className="text-xl font-heading font-bold text-center">Quand partez-vous ?</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Date de départ (Temporel)</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="date"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
        </div>
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg text-sm text-gray-300">
          <p>ℹ️ Durée du séjour : {selectedDestination?.duration || 'Variable'}</p>
          <p className="mt-1">Le retour est automatique grâce au Bracelet Chronos.</p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 max-w-md mx-auto">
      <h3 className="text-xl font-heading font-bold text-center">Qui voyage ?</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Nombre de voyageurs</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFormData(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
              className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
            >
              -
            </button>
            <span className="text-xl font-bold w-8 text-center">{formData.travelers}</span>
            <button
              onClick={() => setFormData(prev => ({ ...prev, travelers: prev.travelers + 1 }))}
              className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Nom complet (Responsable)</label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Email de contact</label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto"
      >
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </motion.div>
      <div>
        <h3 className="text-2xl font-heading font-bold mb-2">Voyage Confirmé !</h3>
        <p className="text-gray-400">Votre réservation a été enregistrée avec succès.</p>
      </div>
      <div className="bg-white/5 rounded-xl p-6 max-w-md mx-auto text-left space-y-3 border border-white/10">
        <div className="flex justify-between">
          <span className="text-gray-400">Destination</span>
          <span className="font-bold">{selectedDestination?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Date</span>
          <span className="font-bold">{formData.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Voyageurs</span>
          <span className="font-bold">{formData.travelers} personne(s)</span>
        </div>
        <div className="border-t border-white/10 pt-3 flex justify-between">
          <span className="text-gray-400">Total</span>
          <span className="font-bold text-primary text-lg">
            {formatPrice((selectedDestination?.price || 0) * formData.travelers)}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-500">Un email de confirmation spatio-temporelle vous a été envoyé.</p>
      <button onClick={() => window.location.href = '/'} className="text-primary hover:underline">Retour à l'accueil</button>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
      {/* Stepper Header */}
      {step < 4 && (
        <div className="flex justify-between items-center mb-10 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10" />
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                step >= s ? "bg-primary text-white" : "bg-slate-800 text-gray-500 border border-white/10"
              )}
            >
              {s}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="min-h-[300px]">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>

      {/* Actions */}
      {step < 4 && (
        <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-medium transition-colors",
              step === 1 ? "opacity-0 cursor-default" : "text-gray-300 hover:text-white hover:bg-white/5"
            )}
          >
            Retour
          </button>
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !formData.destinationId) ||
              (step === 2 && !formData.date) ||
              (step === 3 && (!formData.name || !formData.email))
            }
            className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 3 ? "Confirmer" : "Continuer"}
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;