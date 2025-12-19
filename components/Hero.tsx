
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl w-full text-center space-y-12 animate-fade-in">
      <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-sm tracking-wider uppercase mb-4">
        Welcome to the Inner Circle
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        Who are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 font-serif italic">Happy Family</span>
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <img 
            src="https://picsum.photos/seed/happyfamily/800/600" 
            alt="Happy Family Moment" 
            className="relative rounded-3xl shadow-2xl border border-white/10 w-full"
          />
        </div>
        
        <div className="text-left space-y-6 flex flex-col justify-center">
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
            Happy Family are people who <span className="text-white font-semibold">enjoy life to the fullest.</span>
          </p>
          <p className="text-lg text-slate-400 leading-relaxed">
            We have fun and savor the moment in our lives like no other human being on the planet.
          </p>
          <button 
            onClick={onStart}
            className="mt-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/40 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
          >
            Start Your Journey
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
