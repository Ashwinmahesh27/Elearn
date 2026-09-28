import React, { useState } from 'react';
import { X, Copy, Check, Terminal, ShieldCheck, AlertCircle } from 'lucide-react';

interface InteractiveGitHelperProps {
  onClose: () => void;
}

export const InteractiveGitHelper: React.FC<InteractiveGitHelperProps> = ({ onClose }) => {
  const [pat, setPat] = useState('ghp_98a72bF001xyzSMUstudenttoken2026');
  const [repoUrl, setRepoUrl] = useState('github.com/ashwin-smumec/mgmt6108-ai-prototype.git');
  const [copied, setCopied] = useState(false);

  const cleanRepo = repoUrl.replace(/^https?:\/\//, '').replace(/^git@github\.com:/, 'github.com/');
  const fullCommand = `git push https://${pat}@${cleanRepo}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded bg-gray-900 text-white">
              <Terminal className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                Git Helper · SMU eLearn
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Personal Access Token (PAT) Push Generator
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

        <div className="p-6 space-y-4 text-xs text-gray-700">
          <p className="text-gray-600 leading-normal">
            As mentioned in the Week 6 instructions, GitHub requires fine-grained or classic Personal Access Tokens (PAT) instead of your raw account password when pushing over HTTPS.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Your Personal Access Token (PAT)</label>
              <input
                type="text"
                value={pat}
                onChange={(e) => setPat(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx"
                className="w-full p-2 border border-gray-300 rounded font-mono bg-white text-gray-800"
              />
              <span className="text-[11px] text-gray-500 mt-0.5 block">
                Generate via GitHub &gt; Settings &gt; Developer Settings &gt; Personal Access Tokens (Scope: <code className="text-blue-600">repo</code>).
              </span>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Your GitHub Repository Address</label>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="github.com/your-username/your-repo.git"
                className="w-full p-2 border border-gray-300 rounded font-mono bg-white text-gray-800"
              />
            </div>

            <div className="pt-2">
              <label className="block font-semibold text-gray-900 mb-1">Generated Git Command</label>
              <div className="p-3 bg-gray-900 text-green-400 rounded font-mono text-xs break-all flex items-center justify-between space-x-3">
                <span>{fullCommand}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded shrink-0 flex items-center space-x-1 cursor-pointer transition-colors border border-gray-700"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-900 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Security tip:</strong> Never commit your PAT inside script files or push it to public repositories. If your command shell stores history, clear your terminal history or store the credential in your local git credential-helper.
            </p>
          </div>
        </div>

        <div className="px-6 py-3 border-t border-gray-200 flex justify-end bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#006fbf] text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Close Helper
          </button>
        </div>
      </div>
    </div>
  );
};
