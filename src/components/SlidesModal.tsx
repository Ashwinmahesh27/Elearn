import React, { useState } from 'react';
import { X, Lock, Unlock, ChevronLeft, ChevronRight, Presentation, Check } from 'lucide-react';

interface SlidesModalProps {
  onClose: () => void;
}

export const SlidesModal: React.FC<SlidesModalProps> = ({ onClose }) => {
  const [passwordInput, setPasswordInput] = useState('insightful!');
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = [
    {
      title: 'Week 6: AI-augmented Product Building',
      subtitle: 'MGMT6108 · Decision Architecture & Applied Behavioral Tech',
      bullets: [
        'How LLMs transform passive interfaces into active decision navigators',
        'From nudging to hyper-personalized choice framing',
        'The risk of algorithmic sludge and choice manipulation',
        'Term Paper Prototype guidelines & Vercel deployment roadmap'
      ],
      tag: 'Slide 1 of 4'
    },
    {
      title: 'Architecture of an AI Decision Nudge',
      subtitle: 'System 1 vs System 2 Engagement Patterns',
      bullets: [
        'Friction Injection: Introducing deliberate cognitive pause during high-stakes choices',
        'Dynamic Restructuring: Reordering choices based on real-time bias detection',
        'Counter-Anchoring: Providing statistical baselines before user commitments',
        'Structured Output enforcement via Gemini JSON schemas'
      ],
      tag: 'Slide 2 of 4'
    },
    {
      title: 'Engineering Stack & Deployment Strategy',
      subtitle: 'Vite + React + Tailwind + Google AI Studio + Vercel',
      bullets: [
        'Vercel Hobby Tier: Free hosting, zero config for Vite React SPAs',
        'Handling API keys safely: Use backend server proxy routes (/api/*)',
        'GitHub authentication: Classic or Fine-grained PATs over HTTPS',
        'Prototype validation: Minimum 5 peer test runs before submission'
      ],
      tag: 'Slide 3 of 4'
    },
    {
      title: 'Term Paper Evaluation Criteria',
      subtitle: 'Balancing Behavioral Science Rigor & Technical Execution',
      bullets: [
        '20% Empirical Bias Diagnostic (Why does standard UX fail here?)',
        '25% Behavioral Choice Architecture (What is the precise nudge mechanism?)',
        '30% Live Functional AI Web Prototype (Does it work reliably?)',
        '25% Critical Evaluation, Autonomy Ethics, & Experiment Design'
      ],
      tag: 'Slide 4 of 4'
    }
  ];

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim().toLowerCase() === 'insightful!') {
      setIsUnlocked(true);
    } else {
      alert('Incorrect password. Hint: It is insightful!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded bg-blue-700 text-white">
              <Presentation className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                Lecture Deck · MGMT6108
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Week 6 Slides: AI-augmented Product Building
              </h3>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!isUnlocked ? (
            <form onSubmit={handleUnlock} className="space-y-4 max-w-sm mx-auto py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-base">Protected Slide Deck</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Enter the password provided in the Week 6 module overview (<code className="font-bold text-gray-800">insightful!</code>).
                </p>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm text-center font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006fbf] text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Unlock
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Slide Screen Canvas */}
              <div className="aspect-16/9 bg-gradient-to-br from-[#152b52] to-[#0a1e3f] text-white rounded-lg p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 160 50">
                    <path d="M12 4 L28 4 L34 16 L28 36 L12 36 L6 16 Z"></path>
                  </svg>
                </div>

                <div>
                  <div className="inline-block text-[11px] uppercase tracking-wider text-amber-400 font-semibold mb-2">
                    {slides[currentSlideIndex].tag}
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white mb-1">
                    {slides[currentSlideIndex].title}
                  </h2>
                  <div className="text-xs text-blue-200">
                    {slides[currentSlideIndex].subtitle}
                  </div>
                </div>

                <div className="my-auto py-2">
                  <ul className="space-y-2 text-xs text-gray-100">
                    {slides[currentSlideIndex].bullets.map((b, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center text-[10px] text-gray-400 border-t border-white/10 pt-3">
                  <span>SMU School of Management · MGMT6108</span>
                  <span>Prof. Linus Tan · AY2026/27</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                  disabled={currentSlideIndex === 0}
                  className="px-3 py-1.5 border border-gray-200 rounded text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-40 flex items-center space-x-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex space-x-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlideIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentSlideIndex === i ? 'bg-blue-600 w-4' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="px-3 py-1.5 border border-gray-200 rounded text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-40 flex items-center space-x-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-gray-200 flex justify-between items-center bg-gray-50 text-xs text-gray-500">
          <span>Password: <code className="font-semibold text-gray-700">insightful!</code></span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-800 text-white rounded font-medium hover:bg-gray-900 transition-colors cursor-pointer"
          >
            Close Deck
          </button>
        </div>
      </div>
    </div>
  );
};
