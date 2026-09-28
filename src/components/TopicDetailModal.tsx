import React, { useState } from 'react';
import { TopicItem } from '../types/course';
import { 
  X, 
  ExternalLink, 
  Download, 
  CheckCircle, 
  FileText, 
  Terminal, 
  Sparkles, 
  Layers, 
  GitBranch, 
  Cloud, 
  Copy, 
  Check,
  Send,
  HelpCircle,
  Clock
} from 'lucide-react';

interface TopicDetailModalProps {
  topic: TopicItem | null;
  onClose: () => void;
  onToggleComplete: () => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  onClose,
  onToggleComplete
}) => {
  if (!topic) return null;

  // Prompt tester state for Google AI Studio
  const [testPrompt, setTestPrompt] = useState('You are a behavioral nudge assistant. When a user is about to make an impulsive e-commerce purchase, provide a gentle reflective prompt in 2 sentences.');
  const [systemInstruction, setSystemInstruction] = useState('Tone: Empathetic, analytical, choice-preserving (no coercive paternalism).');
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedResource, setCopiedResource] = useState<string | null>(null);

  const handleSimulateGemini = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setTestResponse(
        `"Before you proceed with this $149 checkout, consider whether this aligns with your goal of saving for the Tokyo trip next month. If you still want it tomorrow after a night of sleep, your cart will still be saved right here."`
      );
      setIsGenerating(false);
    }, 800);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedResource(id);
    setTimeout(() => setCopiedResource(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center space-x-2.5 truncate pr-4">
            <span className="p-1.5 rounded bg-blue-100 text-blue-700">
              {topic.title.includes('Briefing') ? (
                <FileText className="w-4 h-4" />
              ) : topic.title.includes('Studio') ? (
                <Sparkles className="w-4 h-4" />
              ) : topic.title.includes('Stitch') ? (
                <Layers className="w-4 h-4" />
              ) : topic.title.includes('Github') ? (
                <GitBranch className="w-4 h-4" />
              ) : (
                <Cloud className="w-4 h-4" />
              )}
            </span>
            <div>
              <div className="text-xs uppercase font-semibold text-blue-800 tracking-wider">
                Course Material · {topic.type}
              </div>
              <h2 className="text-base font-semibold text-gray-900 truncate">
                {topic.title}
              </h2>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-700 flex-1">
          {/* Overview Callout */}
          {topic.details?.overview && (
            <div className="p-4 rounded-md bg-blue-50/60 border border-blue-100 text-gray-800">
              <div className="font-semibold text-blue-900 mb-1">Executive Summary</div>
              <p className="leading-relaxed text-[13.5px]">{topic.details.overview}</p>
            </div>
          )}

          {/* Specific custom content per topic */}
          {topic.id === 'topic-1' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-medium">Final Submission Deadline:</span>
                  <span>{topic.details?.deadline}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 font-semibold">35% Weight</span>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Required Deliverables</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded border border-gray-200 bg-gray-50/50">
                    <div className="font-medium text-gray-900 mb-1 flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>1. Functional AI Prototype</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-normal">
                      Deployed on Vercel with responsive UI, live Gemini API integration, and counter-bias choice architecture.
                    </p>
                  </div>
                  <div className="p-3.5 rounded border border-gray-200 bg-gray-50/50">
                    <div className="font-medium text-gray-900 mb-1 flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      <span>2. Academic Term Paper (8-10 pages)</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-normal">
                      Theoretical foundation (Dual-Process, Prospect Theory, Loss Aversion), empirical experiment design, and ethical audit.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Grading Matrix</h4>
                <div className="border border-gray-200 rounded divide-y divide-gray-100 text-xs">
                  <div className="p-2.5 flex justify-between items-center bg-gray-50 font-medium text-gray-600">
                    <span>Criterion</span>
                    <span>Weight</span>
                  </div>
                  <div className="p-2.5 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-800">Behavioral Failure Diagnosis</div>
                      <div className="text-gray-500 text-[11px]">Empirical justification of cognitive bias in target domain</div>
                    </div>
                    <span className="font-semibold text-gray-700">20%</span>
                  </div>
                  <div className="p-2.5 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-800">Choice Architecture Intervention</div>
                      <div className="text-gray-500 text-[11px]">Nudge design, defaults, friction injection, framing mechanics</div>
                    </div>
                    <span className="font-semibold text-gray-700">25%</span>
                  </div>
                  <div className="p-2.5 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-800">Technical AI Prototype Execution</div>
                      <div className="text-gray-500 text-[11px]">Vercel deployment, responsiveness, Gemini prompt hygiene</div>
                    </div>
                    <span className="font-semibold text-gray-700">30%</span>
                  </div>
                  <div className="p-2.5 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-800">Evaluation &amp; Ethical Governance</div>
                      <div className="text-gray-500 text-[11px]">Sludge prevention, user autonomy, evaluation protocol</div>
                    </div>
                    <span className="font-semibold text-gray-700">25%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive AI Studio simulator */}
          {topic.id === 'topic-3' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-lg border border-purple-200 bg-purple-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-700" />
                    <span className="font-semibold text-purple-950 text-xs uppercase tracking-wide">
                      Interactive Google AI Studio Playground (Model: gemini-2.5-flash)
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                    Temperature: 0.3 · JSON Mode
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">System Instruction</label>
                  <input
                    type="text"
                    value={systemInstruction}
                    onChange={(e) => setSystemInstruction(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">User Decision Context / Prompt</label>
                  <textarea
                    rows={2}
                    value={testPrompt}
                    onChange={(e) => setTestPrompt(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded bg-white font-mono resize-none"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500">Test how your behavioral nudge behaves with real parameters</span>
                  <button
                    type="button"
                    onClick={handleSimulateGemini}
                    disabled={isGenerating}
                    className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    {isGenerating ? (
                      <span>Running generation...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Run Test in Studio</span>
                      </>
                    )}
                  </button>
                </div>

                {testResponse && (
                  <div className="mt-3 p-3 bg-white border border-purple-200 rounded text-xs text-gray-800">
                    <div className="text-[11px] font-semibold text-purple-900 mb-1 uppercase tracking-wide">
                      Model Output (Structured Response)
                    </div>
                    <p className="italic text-gray-700">&quot;{testResponse}&quot;</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step by step instructions */}
          {topic.details?.instructions && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Instructions &amp; Implementation Steps</h4>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-gray-700 leading-relaxed">
                {topic.details.instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Quick Links / Resources */}
          {topic.details?.resources && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">External Links &amp; Tools</h4>
              <div className="space-y-2">
                {topic.details.resources.map((res, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-xs"
                  >
                    <span className="font-medium text-gray-800">{res.label}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(res.url, `res-${idx}`)}
                        className="px-2 py-1 text-gray-600 hover:text-blue-700 border border-gray-200 rounded bg-white hover:bg-gray-50 flex items-center space-x-1 cursor-pointer"
                      >
                        {copiedResource === `res-${idx}` ? (
                          <>
                            <Check className="w-3 h-3 text-green-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <a
                        href={res.url.startsWith('#') ? undefined : res.url}
                        target={res.url.startsWith('#') ? undefined : '_blank'}
                        rel="noreferrer"
                        onClick={(e) => {
                          if (res.url.startsWith('#')) {
                            e.preventDefault();
                            alert(`Resource "${res.label}" triggered for download/preview.`);
                          }
                        }}
                        className="px-2.5 py-1 text-white bg-[#006fbf] hover:bg-[#005a9c] rounded font-medium flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <button
            type="button"
            onClick={onToggleComplete}
            className={`px-3 py-1.5 rounded text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer ${
              topic.completed 
                ? 'bg-green-50 text-green-800 border border-green-200 hover:bg-green-100'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            <CheckCircle className={`w-4 h-4 ${topic.completed ? 'text-green-600' : 'text-gray-400'}`} />
            <span>{topic.completed ? 'Completed' : 'Mark as Complete'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-800 text-white rounded text-xs font-medium hover:bg-gray-900 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
