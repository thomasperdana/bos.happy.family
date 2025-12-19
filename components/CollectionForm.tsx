
import React, { useState } from 'react';
import { UserSelections, VoucherOption } from '../types';

interface CollectionFormProps {
  onSubmit: (data: UserSelections) => void;
}

const INTERESTS = [
  { id: 'food', label: 'Savoring Food', icon: '🍕' },
  { id: 'vacation', label: 'Vacation with Your Family', icon: '✈️' },
  { id: 'moments', label: 'Celebrating Your Finest Moment in Time', icon: '✨' },
  { id: 'health', label: 'Being Healthy', icon: '🥗' }
];

export const CollectionForm: React.FC<CollectionFormProps> = ({ onSubmit }) => {
  const [interests, setInterests] = useState<string[]>([]);
  const [voucher, setVoucher] = useState<VoucherOption>(null);
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const toggleInterest = (id: string) => {
    setInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (interests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }
    if (!voucher) {
      setError('Please select your preferred voucher.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!agreed) {
      setError('You must agree to the promotional materials.');
      return;
    }

    onSubmit({ interests, voucherPreference: voucher, email, agreed });
  };

  return (
    <form onSubmit={handleFormSubmit} className="max-w-2xl w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl animate-fade-in space-y-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Let’s see what you decide to enjoy:</h2>
        <p className="text-slate-400">Personalize your Happy Family experience</p>
      </div>

      {/* Interests Selection */}
      <div className="space-y-4">
        <p className="font-semibold text-blue-400">Do you like...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INTERESTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleInterest(item.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                interests.includes(item.id) 
                  ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/50 shadow-lg shadow-blue-900/20' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
              {interests.includes(item.id) && (
                <div className="ml-auto bg-blue-500 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Voucher Selection */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <p className="font-semibold text-blue-400">So, if we start by giving you a free $500 gift card, would you rather have:</p>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="button"
            onClick={() => setVoucher('restaurant')}
            className={`flex-1 p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 text-center ${
              voucher === 'restaurant' 
                ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/50' 
                : 'bg-white/5 border-white/5 hover:bg-white/10'
            }`}
          >
            <div className="text-4xl">🍽️</div>
            <div className="font-bold">A Restaurant Voucher</div>
          </button>
          <button
            type="button"
            onClick={() => setVoucher('hotel')}
            className={`flex-1 p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 text-center ${
              voucher === 'hotel' 
                ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/50' 
                : 'bg-white/5 border-white/5 hover:bg-white/10'
            }`}
          >
            <div className="text-4xl">🏨</div>
            <div className="font-bold">A Hotel Voucher</div>
          </button>
        </div>
      </div>

      {/* Email and Agreement */}
      <div className="space-y-6 pt-4 border-t border-white/5">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">Your Primary Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>

        <label className="flex items-start gap-4 cursor-pointer group">
          <div className="relative mt-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="peer sr-only"
            />
            <div className="h-6 w-6 bg-white/5 border border-white/20 rounded-md transition-colors peer-checked:bg-blue-600 peer-checked:border-blue-600 group-hover:border-blue-400"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-1 left-1 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm text-slate-400 leading-snug select-none">
            By entering your email, you agree to receive free promotional material, and get a free giveaway! 
            <span className="block mt-1 font-semibold text-blue-300">Have a Happy Family for the rest of your life.</span>
          </span>
        </label>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl text-center">
          {error}
        </div>
      )}

      <button 
        type="submit"
        className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xl rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 shadow-blue-900/30"
      >
        CLAIM YOUR $500 REWARD
      </button>
    </form>
  );
};
