import React from 'react';
import ReservationForm from '../../components/ReservationForm';

const ReservationPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-slate-950 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Réservez votre Voyage</h1>
        <p className="text-gray-400">Préparez-vous pour le départ imminent vers une autre époque.</p>
      </div>
      <ReservationForm />
    </div>
  );
};

export default ReservationPage;