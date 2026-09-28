import React, { useState } from 'react';
import { X, Send, Bot, HelpCircle, Check, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello Ashwin! Welcome to SMU eLearn Support for MGMT6108 Decision Architecture. How can I assist you today?',
      time: '12:00 PM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    'What is the Week 6 slides password?',
    'How do I push with GitHub PAT?',
    'What are the Term Paper deliverables?',
    'How to deploy to Vercel free-tier?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Automated smart answer
    setTimeout(() => {
      let reply = "I'm looking into that for your course MGMT6108.";
      const lower = query.toLowerCase();

      if (lower.includes('password') || lower.includes('slides')) {
        reply = 'The password for Week 6 slides is: "insightful!". You can click the copy button next to the password on the Week 6 page.';
      } else if (lower.includes('pat') || lower.includes('push') || lower.includes('git')) {
        reply = 'For GitHub authentication, use: git push https::<Your_PAT>@<Your_.git_address>. Make sure your PAT has the "repo" scope enabled in GitHub Developer Settings.';
      } else if (lower.includes('term paper') || lower.includes('deliverable')) {
        reply = 'The Term Paper has two main deliverables: 1) A functional AI-augmented web prototype deployed to Vercel, and 2) an 8-10 page academic synthesis. Deadline is November 15, 2026.';
      } else if (lower.includes('vercel') || lower.includes('free') || lower.includes('hobby')) {
        reply = 'Use the Vercel Hobby (free-tier) account. Connect your GitHub repository, specify Vite as the framework preset, and add your GEMINI_API_KEY under Project Settings.';
      } else {
        reply = 'Thanks for your query. For immediate academic questions, Prof. Linus Tan holds office hours on Wednesdays 3:00 - 5:00 PM at School of Social Sciences & Management, Level 4.';
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  return (
    <div className="support-widget">
      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-92 max-w-[calc(100vw-3rem)] h-112 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-[#0a1e3f] text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold leading-tight">SMU eLearn Helpdesk</div>
                <div className="text-[10px] text-cyan-300/90 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>MGMT6108 Course Support Online</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close support chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-gray-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-2.5 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#006fbf] text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-2xs rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Quick FAQ Chips */}
          <div className="p-2 border-t border-gray-100 bg-white">
            <div className="text-[11px] font-medium text-gray-500 mb-1 px-1">Common Questions:</div>
            <div className="flex flex-wrap gap-1">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="text-[11px] bg-blue-50 text-blue-800 hover:bg-blue-100 px-2 py-1 rounded transition-colors text-left truncate max-w-full cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 border-t border-gray-200 bg-white flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question about Week 6..."
              className="flex-1 text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#006fbf] focus:border-[#006fbf]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 bg-[#0a1e3f] text-cyan-300 hover:bg-[#152b52] disabled:opacity-40 rounded transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Help and Support Chat" 
          className="w-14 h-14 rounded-full bg-[#0a1e3f] hover:bg-[#152b52] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 focus:outline-none cursor-pointer"
        >
          <svg className="w-7 h-7 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.244-1.309A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
