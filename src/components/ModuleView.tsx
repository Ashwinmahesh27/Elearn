import React, { useState } from 'react';
import { CourseModule, TopicItem } from '../types/course';
import { Copy, Check, ExternalLink, Printer, Sparkles, Code2, Terminal } from 'lucide-react';

interface ModuleViewProps {
  module: CourseModule;
  onToggleTopicCompletion: (moduleId: string, topicId: string) => void;
  onOpenTopic: (topic: TopicItem) => void;
  onOpenSlideViewer: () => void;
  onOpenGitHelper: () => void;
}

export const ModuleView: React.FC<ModuleViewProps> = ({
  module,
  onToggleTopicCompletion,
  onOpenTopic,
  onOpenSlideViewer,
  onOpenGitHelper,
}) => {
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [activeMenuTopicId, setActiveMenuTopicId] = useState<string | null>(null);

  const completedCount = module.topics.filter(t => t.completed).length;
  const totalCount = module.topics.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleCopyPassword = () => {
    if (module.contentSummary?.password) {
      navigator.clipboard.writeText(module.contentSummary.password);
      setCopiedPassword(true);
      setTimeout(() => setCopiedPassword(false), 2000);
    }
  };

  const handleCopyCommand = () => {
    if (module.contentSummary?.gitCommand) {
      navigator.clipboard.writeText(module.contentSummary.gitCommand);
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="flex-1 px-12 py-8 max-w-5xl" data-purpose="course-module-view">
      {/* Title & Print Action Header */}
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-3xl font-medium text-gray-900 tracking-tight leading-tight">
          {module.title}
        </h1>
        <button 
          type="button"
          onClick={handlePrint}
          className="flex items-center space-x-1.5 text-[#006fbf] hover:underline text-sm font-medium mt-1 focus:outline-none cursor-pointer"
        >
          <svg className="w-4 h-4 text-[#006fbf]" fill="currentColor" viewBox="0 0 20 20">
            <path clipRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" fillRule="evenodd"></path>
          </svg>
          <span>Print</span>
        </button>
      </div>

      {/* Schedule Meta Bar */}
      {module.contentSummary?.startsAt && (
        <div className="flex items-center space-x-2 text-sm text-gray-700 mb-6">
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" fillRule="evenodd"></path>
          </svg>
          <span>Starts {module.contentSummary.startsAt}</span>
        </div>
      )}

      {/* Module Instructions / Notes Box */}
      {module.contentSummary?.notes && (
        <div className="space-y-3.5 text-gray-800 text-[15px] mb-8 leading-relaxed">
          <ul className="list-disc pl-7 space-y-2">
            {module.contentSummary.notes.map((note, idx) => {
              if (note.includes('password to the slides:')) {
                return (
                  <li key={idx} className="group">
                    <span>Here is the password to the slides: </span>
                    <span className="font-bold text-gray-900">insightful!</span>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="ml-2 inline-flex items-center space-x-1 px-1.5 py-0.5 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors align-middle cursor-pointer"
                      title="Copy password to clipboard"
                    >
                      {copiedPassword ? (
                        <>
                          <Check className="w-3 h-3 text-green-600" />
                          <span className="text-[11px] text-green-700 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-blue-600" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onOpenSlideViewer}
                      className="ml-2 inline-flex items-center space-x-1 text-xs text-[#006fbf] hover:underline align-middle cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>View Deck</span>
                    </button>
                  </li>
                );
              }
              if (note.includes('Use hobby (free-tier)')) {
                return (
                  <li key={idx}>
                    Use hobby (<span className="font-bold text-gray-900">free-tier</span>) for Vercel, Team.
                  </li>
                );
              }
              if (note.includes('git push https::')) {
                return (
                  <li key={idx} className="group">
                    <span>How to? </span>
                    <span className="font-bold text-gray-900">git push https::&lt;Your_PAT&gt;@&lt;Your_.git_address&gt;</span>
                    <button
                      type="button"
                      onClick={handleCopyCommand}
                      className="ml-2 inline-flex items-center space-x-1 px-1.5 py-0.5 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors align-middle cursor-pointer"
                      title="Copy git push template"
                    >
                      {copiedCommand ? (
                        <>
                          <Check className="w-3 h-3 text-green-600" />
                          <span className="text-[11px] text-green-700 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-blue-600" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onOpenGitHelper}
                      className="ml-2 inline-flex items-center space-x-1 text-xs text-[#006fbf] hover:underline align-middle cursor-pointer"
                    >
                      <Terminal className="w-3 h-3" />
                      <span>Command Builder</span>
                    </button>
                  </li>
                );
              }
              return <li key={idx}>{note}</li>;
            })}
          </ul>
        </div>
      )}

      {/* Progress Bar Section */}
      <div className="mb-10" data-purpose="module-progress-meter">
        {/* Blue Filled Progress Track */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-[#006fbf] h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        {/* Progress Counter Caption */}
        <div className="text-center text-sm text-gray-700 mt-2.5 font-normal">
          <span className="font-bold text-gray-900 text-base">{percentage} %</span>
          <span className="ml-1 text-gray-600">
            {completedCount} of {totalCount} topics complete
          </span>
        </div>
      </div>

      {/* Topics / Links Item List */}
      <div className="space-y-0 divide-y divide-gray-100" data-purpose="topic-item-list">
        {module.topics.map((topic) => (
          <div 
            key={topic.id}
            className="py-4 flex items-center justify-between hover:bg-gray-50 px-2 rounded-sm transition-colors group relative"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => onOpenTopic(topic)}
                  className="text-[#006fbf] hover:underline font-normal text-base text-left cursor-pointer"
                >
                  {topic.title}
                </button>

                {/* Topic Options Dropdown Button */}
                <div className="relative">
                  <button 
                    type="button"
                    onClick={() => setActiveMenuTopicId(activeMenuTopicId === topic.id ? null : topic.id)}
                    aria-label="Topic options" 
                    className="text-gray-600 hover:text-gray-900 focus:outline-none p-0.5 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </button>

                  {/* Context dropdown menu */}
                  {activeMenuTopicId === topic.id && (
                    <div className="absolute left-0 mt-1 w-48 bg-white rounded shadow-lg border border-gray-200 py-1 z-30">
                      <button
                        type="button"
                        onClick={() => {
                          onOpenTopic(topic);
                          setActiveMenuTopicId(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 flex items-center space-x-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                        <span>View Resource</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onToggleTopicCompletion(module.id, topic.id);
                          setActiveMenuTopicId(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 flex items-center space-x-2"
                      >
                        <Check className="w-3.5 h-3.5 text-gray-500" />
                        <span>Mark as {topic.completed ? 'Incomplete' : 'Complete'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          setActiveMenuTopicId(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 flex items-center space-x-2"
                      >
                        <Copy className="w-3.5 h-3.5 text-gray-500" />
                        <span>Copy Link</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sub-label with Link Icon */}
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="capitalize">{topic.type}</span>
              </div>
            </div>

            {/* Completed Checkmark Icon (clickable to toggle completion!) */}
            <button
              type="button"
              onClick={() => onToggleTopicCompletion(module.id, topic.id)}
              className="p-1 rounded hover:bg-gray-200 transition-colors focus:outline-none cursor-pointer"
              title={topic.completed ? 'Completed (Click to uncheck)' : 'Incomplete (Click to complete)'}
            >
              {topic.completed ? (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              ) : (
                <div className="w-5 h-5 rounded border border-gray-400 hover:border-blue-600 transition-colors"></div>
              )}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};
