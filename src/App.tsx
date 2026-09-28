import React, { useState } from 'react';
import { TopHeader } from './components/TopHeader';
import { Sidebar } from './components/Sidebar';
import { ModuleView } from './components/ModuleView';
import { TopicDetailModal } from './components/TopicDetailModal';
import { InteractiveGitHelper } from './components/InteractiveGitHelper';
import { SlidesModal } from './components/SlidesModal';
import { SupportWidget } from './components/SupportWidget';
import { 
  HomeView, 
  DiscussionsView, 
  AssignmentsView, 
  QuizzesView, 
  BookmarksView, 
  CourseScheduleView 
} from './components/OtherViews';
import { 
  INITIAL_MODULES, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_MESSAGES 
} from './data/courseData';
import { CourseModule, TopicItem, UserNotification, UserMessage } from './types/course';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('Content');
  const [activeModuleId, setActiveModuleId] = useState<string>('week-6');
  const [modules, setModules] = useState<CourseModule[]>(INITIAL_MODULES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<TopicItem | null>(null);
  const [showSlidesModal, setShowSlidesModal] = useState<boolean>(false);
  const [showGitHelper, setShowGitHelper] = useState<boolean>(false);
  const [activeQuickView, setActiveQuickView] = useState<'bookmarks' | 'schedule' | 'all' | null>(null);

  const [notifications, setNotifications] = useState<UserNotification[]>(INITIAL_NOTIFICATIONS);
  const [messages, setMessages] = useState<UserMessage[]>(INITIAL_MESSAGES);
  const [currentCourse, setCurrentCourse] = useState<string>('MGMT6108-G1');

  // Toggle completion of an individual topic
  const handleToggleTopicCompletion = (moduleId: string, topicId: string) => {
    setModules(prev =>
      prev.map(mod => {
        if (mod.id !== moduleId) return mod;
        const updatedTopics = mod.topics.map(t => {
          if (t.id !== topicId) return t;
          return { ...t, completed: !t.completed };
        });
        const allCompleted = updatedTopics.every(t => t.completed);
        return {
          ...mod,
          completed: allCompleted,
          topics: updatedTopics
        };
      })
    );

    // If modal is open for this topic, update selectedTopic too
    if (selectedTopic && selectedTopic.id === topicId) {
      setSelectedTopic(prev => prev ? { ...prev, completed: !prev.completed } : null);
    }
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkMessageRead = (id: string) => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, unread: false } : m))
    );
  };

  const handleSelectModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setActiveQuickView(null);
    if (activeTab !== 'Content') {
      setActiveTab('Content');
    }
  };

  const handleQuickViewSelect = (view: 'bookmarks' | 'schedule' | 'all') => {
    setActiveQuickView(view);
  };

  // Find active module
  const currentModule = modules.find(m => m.id === activeModuleId) || modules[7] || modules[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 antialiased selection:bg-blue-100 font-sans">
      {/* Top Header & Course Navigation Secondary Tabs */}
      <TopHeader
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'Content') {
            setActiveQuickView(null);
          }
        }}
        notifications={notifications}
        messages={messages}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkMessageRead={handleMarkMessageRead}
        currentCourse={currentCourse}
        onSelectCourse={(courseCode) => setCurrentCourse(courseCode)}
      />

      {/* Main Content Container with Left Sidebar & Content Area */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto" data-purpose="course-page-body">
        {/* Left Sidebar always visible for rapid module switching and search */}
        <Sidebar
          modules={modules}
          activeModuleId={activeModuleId}
          onSelectModule={handleSelectModule}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectQuickView={handleQuickViewSelect}
          activeQuickView={activeQuickView}
          bookmarkedCount={2}
        />

        {/* Dynamic Center Stage Content View */}
        {activeQuickView === 'bookmarks' ? (
          <BookmarksView 
            onSelectModule={handleSelectModule} 
            onOpenTopic={(topic) => setSelectedTopic(topic)} 
          />
        ) : activeQuickView === 'schedule' ? (
          <CourseScheduleView 
            onSelectModule={handleSelectModule} 
          />
        ) : activeTab === 'Home' ? (
          <HomeView onSelectModule={handleSelectModule} />
        ) : activeTab === 'Discussions' ? (
          <DiscussionsView />
        ) : activeTab === 'Assignments' ? (
          <AssignmentsView />
        ) : activeTab === 'Quizzes' ? (
          <QuizzesView />
        ) : (
          <ModuleView
            module={currentModule}
            onToggleTopicCompletion={handleToggleTopicCompletion}
            onOpenTopic={(topic) => setSelectedTopic(topic)}
            onOpenSlideViewer={() => setShowSlidesModal(true)}
            onOpenGitHelper={() => setShowGitHelper(true)}
          />
        )}
      </div>

      {/* Floating Support Widget in bottom right */}
      <SupportWidget />

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <TopicDetailModal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
          onToggleComplete={() => handleToggleTopicCompletion(activeModuleId, selectedTopic.id)}
        />
      )}

      {/* Slide Deck Modal with Password Unlock */}
      {showSlidesModal && (
        <SlidesModal onClose={() => setShowSlidesModal(false)} />
      )}

      {/* Interactive Git Push PAT Helper Modal */}
      {showGitHelper && (
        <InteractiveGitHelper onClose={() => setShowGitHelper(false)} />
      )}
    </div>
  );
}
