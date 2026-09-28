import React from 'react';
import { CourseModule } from '../types/course';

interface SidebarProps {
  modules: CourseModule[];
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectQuickView?: (view: 'bookmarks' | 'schedule' | 'all') => void;
  activeQuickView?: string | null;
  bookmarkedCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  modules,
  activeModuleId,
  onSelectModule,
  searchQuery,
  onSearchChange,
  onSelectQuickView,
  activeQuickView,
  bookmarkedCount = 2
}) => {
  const filteredModules = modules.filter(m => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesModule = m.title.toLowerCase().includes(q) || (m.dateInfo && m.dateInfo.toLowerCase().includes(q));
    const matchesTopic = m.topics.some(t => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q)));
    return matchesModule || matchesTopic;
  });

  return (
    <aside className="w-80 flex-shrink-0 border-r border-gray-200 py-6 pr-0 pl-6 space-y-3 font-sans text-sm select-none" data-purpose="table-of-contents-sidebar">
      {/* Search Input Container */}
      <div className="relative pr-6 mb-4">
        <input 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-3 pr-9 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#006fbf] focus:border-[#006fbf] placeholder-gray-500 outline-none transition-colors" 
          placeholder="Search Topics" 
          type="text"
        />
        {searchQuery ? (
          <button 
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search" 
            className="absolute right-9 top-2 text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            ×
          </button>
        ) : (
          <button 
            type="button"
            aria-label="Submit search" 
            className="absolute right-9 top-2.5 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        )}
      </div>

      {/* Quick Nav Sections: Bookmarks, Schedule, Table of Contents */}
      <div className="space-y-1 pr-6 pb-2">
        <button 
          type="button"
          onClick={() => onSelectQuickView && onSelectQuickView('bookmarks')}
          className={`w-full flex items-center justify-between py-2 text-left hover:text-[#006fbf] transition-colors cursor-pointer ${
            activeQuickView === 'bookmarks' ? 'text-[#006fbf] font-medium' : 'text-gray-800'
          }`}
        >
          <div className="flex items-center space-x-3">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="font-normal text-[14px]">Bookmarks</span>
          </div>
          {bookmarkedCount > 0 && (
            <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">
              {bookmarkedCount}
            </span>
          )}
        </button>

        <button 
          type="button"
          onClick={() => onSelectQuickView && onSelectQuickView('schedule')}
          className={`w-full flex items-center justify-between py-2 text-left hover:text-[#006fbf] transition-colors cursor-pointer ${
            activeQuickView === 'schedule' ? 'text-[#006fbf] font-medium' : 'text-gray-800'
          }`}
        >
          <div className="flex items-center space-x-3">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="font-normal text-[14px]">Course Schedule</span>
          </div>
          <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">1</span>
        </button>

        <button 
          type="button"
          onClick={() => onSelectQuickView && onSelectQuickView('all')}
          className={`w-full flex items-center justify-between py-2 text-left hover:text-[#006fbf] transition-colors cursor-pointer ${
            activeQuickView === 'all' ? 'text-[#006fbf] font-medium' : 'text-gray-800'
          }`}
        >
          <span className="font-normal text-[14px]">Table of Contents</span>
          <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">1</span>
        </button>
      </div>

      <div className="border-t border-gray-200 -mr-0 pr-6"></div>

      {/* Modules Tree List */}
      <nav aria-label="Course Modules Navigation" className="space-y-0 pr-0">
        {filteredModules.length === 0 ? (
          <div className="py-6 pr-6 text-center text-xs text-gray-500">
            No topics matching &quot;{searchQuery}&quot;
          </div>
        ) : (
          filteredModules.map((module) => {
            const isActive = module.id === activeModuleId && !activeQuickView;

            if (isActive) {
              return (
                <div 
                  key={module.id}
                  onClick={() => onSelectModule(module.id)}
                  className="active-nav-notch -ml-6 pl-6 py-3.5 pr-6 border-b border-gray-100 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[14px] font-medium text-gray-900 leading-snug">
                        {module.title}
                      </div>
                      {module.dateInfo && (
                        <div className="text-xs text-gray-500 mt-0.5">{module.dateInfo}</div>
                      )}
                    </div>
                    {module.badgeType === 'count' ? (
                      <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium ml-2">
                        {module.badgeCount || 1}
                      </span>
                    ) : (
                      <svg className="w-5 h-5 text-gray-700 flex-shrink-0 ml-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <button
                key={module.id}
                type="button"
                onClick={() => onSelectModule(module.id)}
                className="w-full text-left flex items-center justify-between py-3 pr-6 text-gray-800 hover:bg-gray-50 border-b border-gray-100 transition-colors cursor-pointer"
              >
                <div className="pr-2">
                  <div className="text-[14px] text-gray-800 leading-snug">
                    {module.title}
                  </div>
                  {module.dateInfo && (
                    <div className="text-xs text-gray-500 mt-0.5">{module.dateInfo}</div>
                  )}
                </div>

                {module.badgeType === 'count' ? (
                  <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium ml-2 shrink-0">
                    {module.badgeCount || 1}
                  </span>
                ) : (
                  <svg className="w-5 h-5 text-gray-700 flex-shrink-0 ml-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                )}
              </button>
            );
          })
        )}
      </nav>
    </aside>
  );
};
