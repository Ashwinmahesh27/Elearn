import React, { useState, useRef, useEffect } from 'react';
import { 
  Grid3X3, 
  Mail, 
  MessageSquare, 
  Bell, 
  ChevronDown, 
  ExternalLink,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Settings,
  LogOut,
  User,
  ShieldCheck
} from 'lucide-react';
import { COURSES_LIST } from '../data/courseData';
import { UserNotification, UserMessage } from '../types/course';

interface TopHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notifications: UserNotification[];
  messages: UserMessage[];
  onMarkNotificationRead: (id: string) => void;
  onMarkMessageRead: (id: string) => void;
  currentCourse: string;
  onSelectCourse: (courseCode: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  onTabChange,
  notifications,
  messages,
  onMarkNotificationRead,
  onMarkMessageRead,
  currentCourse,
  onSelectCourse
}) => {
  const [showCourseMenu, setShowCourseMenu] = useState(false);
  const [showMailMenu, setShowMailMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showSubscriptionsMenu, setShowSubscriptionsMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Active dropdown tab
  const [openDropdownTab, setOpenDropdownTab] = useState<string | null>(null);

  const courseMenuRef = useRef<HTMLDivElement>(null);
  const mailMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (courseMenuRef.current && !courseMenuRef.current.contains(target)) {
        setShowCourseMenu(false);
      }
      if (mailMenuRef.current && !mailMenuRef.current.contains(target)) {
        setShowMailMenu(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(target)) {
        setShowNotifMenu(false);
      }
      if (subMenuRef.current && !subMenuRef.current.contains(target)) {
        setShowSubscriptionsMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;
  const unreadMessagesCount = messages.filter(m => m.unread).length;

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40" data-purpose="top-navigation">
      {/* Top Institution & User Bar */}
      <div className="px-6 py-2.5 flex items-center justify-between border-b border-gray-100">
        {/* Left side: SMU Logo and Course Title */}
        <div className="flex items-center space-x-4">
          {/* SMU Logo Badge */}
          <button 
            type="button"
            onClick={() => onTabChange('Home')}
            aria-label="Singapore Management University Home" 
            className="flex items-center space-x-2 focus:outline-none cursor-pointer text-left"
          >
            <svg className="h-9 w-auto text-[#152b52]" fill="currentColor" viewBox="0 0 160 50">
              <path d="M12 4 L28 4 L34 16 L28 36 L12 36 L6 16 Z" fill="#152b52" opacity="0.9"></path>
              <path d="M16 10 L24 10 L27 18 L23 30 L17 30 L13 18 Z" fill="#b9935a"></path>
              <text fill="#152b52" fontFamily="sans-serif" fontSize="20" fontWeight="900" letterSpacing="-0.5" x="44" y="24">SMU</text>
              <text fill="#152b52" fontFamily="sans-serif" fontSize="6.5" fontWeight="600" letterSpacing="0.4" x="44" y="34">SINGAPORE MANAGEMENT</text>
              <text fill="#152b52" fontFamily="sans-serif" fontSize="6.5" fontWeight="600" letterSpacing="0.4" x="44" y="41">UNIVERSITY</text>
            </svg>
          </button>

          {/* Vertical Divider (dotted style) */}
          <div className="h-6 border-r border-dotted border-gray-300"></div>

          {/* Course Code Title with popover selector */}
          <div className="relative" ref={courseMenuRef}>
            <button
              type="button"
              onClick={() => setShowCourseMenu(!showCourseMenu)}
              className="flex items-center space-x-1.5 focus:outline-none text-left group"
              title="MGMT6108-G1-Decision Architecture"
            >
              <h1 className="text-base font-medium text-gray-800 truncate max-w-sm lg:max-w-md cursor-pointer group-hover:underline">
                {currentCourse === 'MGMT6108-G1' ? 'MGMT6108-G1-Decision Architec...' : currentCourse}
              </h1>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-800" />
            </button>

            {/* Course Selector Dropdown */}
            {showCourseMenu && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">My Courses (AY26/27)</span>
                  <span className="text-[11px] text-blue-600 font-medium">Semester 1</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {COURSES_LIST.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onSelectCourse(c.code);
                        setShowCourseMenu(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm flex items-start space-x-2.5 hover:bg-blue-50 transition-colors ${
                        c.code === currentCourse ? 'bg-blue-50/60 font-medium text-blue-800' : 'text-gray-700'
                      }`}
                    >
                      <BookOpen className={`w-4 h-4 mt-0.5 shrink-0 ${c.code === currentCourse ? 'text-blue-600' : 'text-gray-400'}`} />
                      <div className="truncate">
                        <div className="text-[13px]">{c.code}</div>
                        <div className="text-xs text-gray-500">{c.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Apps, Messages, Alerts, User Profile */}
        <div className="flex items-center space-x-5">
          {/* Grid Menu Icon (3x3 dots) */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => setShowCourseMenu(!showCourseMenu)}
              aria-label="Course selector" 
              className="text-gray-600 hover:text-gray-900 p-1.5 focus:outline-none rounded hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h3v3H4zm6 0h3v3h-3zm6 0h3v3h-3zM4 10h3v3H4zm6 0h3v3h-3zm6 0h3v3h-3zM4 16h3v3H4zm6 0h3v3h-3zm6 0h3v3h-3z"></path>
              </svg>
            </button>
          </div>

          <div className="h-5 border-r border-dotted border-gray-300"></div>

          {/* Mail Icon */}
          <div className="relative" ref={mailMenuRef}>
            <button 
              type="button"
              onClick={() => setShowMailMenu(!showMailMenu)}
              aria-label="Messages" 
              className="relative text-gray-600 hover:text-gray-900 p-1.5 focus:outline-none rounded hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
              )}
            </button>

            {/* Mail Dropdown */}
            {showMailMenu && (
              <div className="absolute right-0 mt-2 w-88 bg-white rounded shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">Messages & Inquiries</span>
                  <span className="text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">Compose</span>
                </div>
                <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                  {messages.map((m) => (
                    <div 
                      key={m.id}
                      onClick={() => onMarkMessageRead(m.id)}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${m.unread ? 'bg-blue-50/40' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-medium flex items-center justify-center">
                            {m.avatar}
                          </span>
                          <span className="text-xs font-medium text-gray-900 truncate max-w-[150px]">{m.sender}</span>
                        </div>
                        <span className="text-[11px] text-gray-500">{m.time}</span>
                      </div>
                      <div className="text-xs font-medium text-gray-800 mb-0.5">{m.subject}</div>
                      <p className="text-xs text-gray-500 line-clamp-2">{m.preview}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100 text-center">
                  <button 
                    onClick={() => { setShowMailMenu(false); }}
                    className="text-xs text-blue-600 font-medium hover:underline"
                  >
                    View All in eLearn Mail
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Chat / Subscriptions Icon */}
          <div className="relative" ref={subMenuRef}>
            <button 
              type="button"
              onClick={() => setShowSubscriptionsMenu(!showSubscriptionsMenu)}
              aria-label="Subscriptions" 
              className="text-gray-600 hover:text-gray-900 p-1.5 focus:outline-none rounded hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>

            {/* Subscriptions Dropdown */}
            {showSubscriptionsMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">Discussion Subscriptions</span>
                  <span className="text-[11px] text-gray-500">3 active threads</span>
                </div>
                <div className="p-3 text-xs text-gray-600 space-y-2.5">
                  <div className="p-2 rounded bg-gray-50 border border-gray-100">
                    <div className="font-medium text-gray-800">Week 6 Discussion Catalyst</div>
                    <div className="text-gray-500 text-[11px] mt-0.5">3 new replies on &quot;Cognitive Biases in Prompt Refinement&quot;</div>
                  </div>
                  <div className="p-2 rounded bg-gray-50 border border-gray-100">
                    <div className="font-medium text-gray-800">Term Paper Q&amp;A Thread</div>
                    <div className="text-gray-500 text-[11px] mt-0.5">Prof. Linus Tan answered a question on Vercel hobby limits</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notification Bell Icon (with orange indicator) */}
          <div className="relative" ref={notifMenuRef}>
            <button 
              type="button"
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              aria-label="Notifications" 
              className="text-gray-600 hover:text-gray-900 p-1.5 focus:outline-none rounded hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white pointer-events-none"></span>
            )}

            {/* Notifications Panel */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-84 bg-white rounded shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">Updates & Alerts</span>
                  <span className="text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => onMarkNotificationRead(n.id)}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${!n.read ? 'bg-amber-50/30' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-900">{n.title}</span>
                        <span className="text-[11px] text-gray-500">{n.time}</span>
                      </div>
                      <p className="text-xs text-gray-600">{n.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-5 border-r border-dotted border-gray-300"></div>

          {/* User Profile Badge & Name */}
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2.5 cursor-pointer group focus:outline-none"
            >
              <div className="w-7 h-7 rounded-sm bg-[#005f73] text-white flex items-center justify-center text-xs font-semibold tracking-wider shadow-xs">
                A_
              </div>
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-tight group-hover:underline">
                ASHWIN MAHESH KUMAR_
              </span>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-xl border border-gray-200 py-2 z-50 text-sm">
                <div className="px-4 py-2.5 border-b border-gray-100">
                  <div className="font-semibold text-gray-900 text-xs uppercase">ASHWIN MAHESH KUMAR</div>
                  <div className="text-xs text-gray-500">ashwinmahesh.mec@gmail.com</div>
                  <div className="mt-1 text-[11px] text-blue-700 font-medium">BSc (Information Systems) · Senior</div>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => setShowUserMenu(false)}
                    className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span>Profile & Portfolio</span>
                  </button>
                  <button 
                    onClick={() => setShowUserMenu(false)}
                    className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-gray-500" />
                    <span>Account Settings</span>
                  </button>
                  <button 
                    onClick={() => setShowUserMenu(false)}
                    className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
                    <span>Notifications & Privacy</span>
                  </button>
                </div>
                <div className="border-t border-gray-100 pt-1">
                  <button 
                    onClick={() => setShowUserMenu(false)}
                    className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Navigation Secondary Tabs */}
      <nav aria-label="Course Links" className="px-6 flex items-center space-x-8 text-sm text-gray-700 overflow-x-auto relative">
        <button
          type="button"
          onClick={() => onTabChange('Home')}
          className={`py-3 font-normal transition-colors whitespace-nowrap cursor-pointer hover:text-[#006fbf] ${
            activeTab === 'Home' ? 'text-gray-900 border-b-2 border-[#006fbf] font-medium' : 'text-gray-700 border-b-2 border-transparent'
          }`}
        >
          Home
        </button>

        <button
          type="button"
          onClick={() => onTabChange('Content')}
          className={`py-3 font-normal transition-colors whitespace-nowrap cursor-pointer hover:text-[#006fbf] ${
            activeTab === 'Content' ? 'text-gray-900 border-b-2 border-[#006fbf] font-medium' : 'text-gray-700 border-b-2 border-transparent'
          }`}
        >
          Content
        </button>

        {/* Class Info with dropdown */}
        <div className="relative">
          <button 
            type="button"
            onClick={() => setOpenDropdownTab(openDropdownTab === 'class-info' ? null : 'class-info')}
            className={`py-3 flex items-center space-x-1 font-normal hover:text-[#006fbf] focus:outline-none cursor-pointer whitespace-nowrap ${
              activeTab === 'Class Info' ? 'text-gray-900 font-medium' : 'text-gray-700'
            }`}
          >
            <span>Class Info</span>
            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </button>
          {openDropdownTab === 'class-info' && (
            <div className="absolute left-0 top-full mt-0 w-52 bg-white rounded shadow-lg border border-gray-200 py-1.5 z-50">
              <button 
                onClick={() => { onTabChange('Class Info'); setOpenDropdownTab(null); }}
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50"
              >
                Course Schedule & Milestones
              </button>
              <button 
                onClick={() => { onTabChange('Class Info'); setOpenDropdownTab(null); }}
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50"
              >
                Instructor & TA Office Hours
              </button>
              <button 
                onClick={() => { onTabChange('Class Info'); setOpenDropdownTab(null); }}
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50"
              >
                Class Announcements
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => onTabChange('Discussions')}
          className={`py-3 font-normal transition-colors whitespace-nowrap cursor-pointer hover:text-[#006fbf] ${
            activeTab === 'Discussions' ? 'text-gray-900 border-b-2 border-[#006fbf] font-medium' : 'text-gray-700 border-b-2 border-transparent'
          }`}
        >
          Discussions
        </button>

        <button
          type="button"
          onClick={() => onTabChange('Assignments')}
          className={`py-3 font-normal transition-colors whitespace-nowrap cursor-pointer hover:text-[#006fbf] ${
            activeTab === 'Assignments' ? 'text-gray-900 border-b-2 border-[#006fbf] font-medium' : 'text-gray-700 border-b-2 border-transparent'
          }`}
        >
          Assignments
        </button>

        <button
          type="button"
          onClick={() => onTabChange('Quizzes')}
          className={`py-3 font-normal transition-colors whitespace-nowrap cursor-pointer hover:text-[#006fbf] ${
            activeTab === 'Quizzes' ? 'text-gray-900 border-b-2 border-[#006fbf] font-medium' : 'text-gray-700 border-b-2 border-transparent'
          }`}
        >
          Quizzes
        </button>

        {/* Analytics Dropdown */}
        <div className="relative">
          <button 
            type="button"
            onClick={() => setOpenDropdownTab(openDropdownTab === 'analytics' ? null : 'analytics')}
            className="py-3 flex items-center space-x-1 font-normal text-gray-700 hover:text-[#006fbf] focus:outline-none cursor-pointer whitespace-nowrap"
          >
            <span>Analytics</span>
            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </button>
          {openDropdownTab === 'analytics' && (
            <div className="absolute left-0 top-full mt-0 w-48 bg-white rounded shadow-lg border border-gray-200 py-1.5 z-50">
              <button 
                onClick={() => { onTabChange('Analytics'); setOpenDropdownTab(null); }}
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50"
              >
                Class Progress Tracking
              </button>
              <button 
                onClick={() => { onTabChange('Analytics'); setOpenDropdownTab(null); }}
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50"
              >
                Module Completion Metrics
              </button>
            </div>
          )}
        </div>

        {/* Tools Dropdown */}
        <div className="relative">
          <button 
            type="button"
            onClick={() => setOpenDropdownTab(openDropdownTab === 'tools' ? null : 'tools')}
            className="py-3 flex items-center space-x-1 font-normal text-gray-700 hover:text-[#006fbf] focus:outline-none cursor-pointer whitespace-nowrap"
          >
            <span>Tools</span>
            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </button>
          {openDropdownTab === 'tools' && (
            <div className="absolute left-0 top-full mt-0 w-44 bg-white rounded shadow-lg border border-gray-200 py-1.5 z-50">
              <button 
                onClick={() => { onTabChange('Tools'); setOpenDropdownTab(null); }}
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50"
              >
                Grades &amp; Feedback
              </button>
              <button 
                onClick={() => { onTabChange('Tools'); setOpenDropdownTab(null); }}
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50"
              >
                Student Locker
              </button>
              <button 
                onClick={() => { onTabChange('Tools'); setOpenDropdownTab(null); }}
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50"
              >
                Group Workspaces
              </button>
            </div>
          )}
        </div>

        {/* Links Dropdown */}
        <div className="relative">
          <button 
            type="button"
            onClick={() => setOpenDropdownTab(openDropdownTab === 'links' ? null : 'links')}
            className="py-3 flex items-center space-x-1 font-normal text-gray-700 hover:text-[#006fbf] focus:outline-none cursor-pointer whitespace-nowrap"
          >
            <span>Links</span>
            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </button>
          {openDropdownTab === 'links' && (
            <div className="absolute left-0 top-full mt-0 w-52 bg-white rounded shadow-lg border border-gray-200 py-1.5 z-50">
              <a 
                href="https://library.smu.edu.sg" 
                target="_blank" 
                rel="noreferrer"
                className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50"
              >
                SMU Library e-Reserves
              </a>
              <a 
                href="https://oasis.smu.edu.sg" 
                target="_blank" 
                rel="noreferrer"
                className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50"
              >
                OASIS Student Portal
              </a>
              <a 
                href="https://academicintegrity.smu.edu.sg" 
                target="_blank" 
                rel="noreferrer"
                className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50"
              >
                Academic Integrity Guidelines
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
