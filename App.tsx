
import React, { useState, useCallback } from 'react';
import { Hero } from './components/Hero';
import { CollectionForm } from './components/CollectionForm';
import { FunnelStep, UserSelections, VoucherOption } from './types';

const RESTAURANT_URL = "https://www.rewardsandincentives.com/?bcode=40da2c6eb4af643ce37c275f5538ef65";
const HOTEL_URL = "https://www.rewardsandincentives.com/?bcode=30f25afa77048cb2edbd7f4096179830";

const App: React.FC = () => {
  const [step, setStep] = useState<FunnelStep>(FunnelStep.INTRO);
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setStep(FunnelStep.FORM);
  };

  const handleSubmit = useCallback(async (selections: UserSelections) => {
    setLoading(true);
    setStep(FunnelStep.SUBMITTING);

    try {
      // Simulate saving to Google Sheet
      // Note: Direct post to a public Google Sheet URL usually requires a proxy or Apps Script
      // For this demo, we simulate the network delay and then redirect.
      console.log('Saving to Google Sheet...', selections);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Redirect based on voucher selection
      if (selections.voucherPreference === 'restaurant') {
        window.location.href = RESTAURANT_URL;
      } else if (selections.voucherPreference === 'hotel') {
        window.location.href = HOTEL_URL;
      }
    } catch (error) {
      console.error('Submission failed', error);
      setLoading(false);
      setStep(FunnelStep.FORM);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-950/30 via-transparent to-transparent"></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        {step === FunnelStep.INTRO && <Hero onStart={handleStart} />}
        
        {step === FunnelStep.FORM && (
          <CollectionForm onSubmit={handleSubmit} />
        )}

        {step === FunnelStep.SUBMITTING && (
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-2">Processing Your Reward</h2>
            <p className="text-slate-400">Saving your preferences to our Happy Family database...</p>
          </div>
        )}
      </main>

      <footer className="relative z-10 py-6 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Happy Family Lifestyle. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
