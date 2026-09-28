import React from 'react';
import { 
  Calendar, 
  MessageSquare, 
  FileText, 
  HelpCircle, 
  Award, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { CourseModule, TopicItem } from '../types/course';

interface ViewProps {
  onSelectModule?: (moduleId: string) => void;
  onOpenTopic?: (topic: TopicItem) => void;
}

export const HomeView: React.FC<ViewProps> = ({ onSelectModule }) => {
  return (
    <div className="flex-1 px-12 py-8 max-w-5xl space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-medium text-gray-900 tracking-tight">
          MGMT6108-G1 Decision Architecture (AY26/27)
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Welcome back, Ashwin. Current focus: <strong className="text-blue-700">Week 6 AI-augmented Product Building</strong>.
        </p>
      </div>

      {/* Hero Welcome banner */}
      <div className="bg-gradient-to-r from-[#152b52] to-[#0a1e3f] text-white p-6 rounded-lg shadow-sm">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Active Milestone</span>
          <h2 className="text-xl font-bold">Week 6: Individual Term Paper &amp; AI Prototype</h2>
          <p className="text-xs text-gray-200 leading-relaxed">
            All teams must review the Term Paper briefing notes and configure their GitHub PAT workflow.
            Please test Vercel hobby deployment before Week 7 lab session.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onSelectModule && onSelectModule('week-6')}
              className="px-4 py-2 bg-[#006fbf] hover:bg-blue-600 text-white rounded text-xs font-medium transition-colors cursor-pointer"
            >
              Open Week 6 Module →
            </button>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">Latest Course Announcements</h3>
        <div className="space-y-3">
          <div className="p-4 border border-gray-200 rounded-md bg-white hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="font-semibold text-gray-800">Prof. Linus Tan</span>
              <span>Sep 27, 2026 8:30 PM</span>
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              Week 6 Materials &amp; Slide Password Announced
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Slides for Week 6 AI-augmented Product Building are now online. The slides password is &apos;insightful!&apos;.
              Make sure to configure your GitHub personal access token (PAT) for git push commands.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-md bg-white hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="font-semibold text-gray-800">Teaching Assistant · Sarah Lim</span>
              <span>Sep 20, 2026 4:15 PM</span>
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              Assignment 1 Grades &amp; Rubric Feedback Available
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Grades for the Cognitive Bias Audit have been published in the Gradebook. You may check the grading rubric under Tools &gt; Grades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DiscussionsView: React.FC = () => {
  const threads = [
    {
      title: 'Week 6 Discussion Catalyst: Nudge Architecture vs Algorithmic Manipulation',
      author: 'Prof. Linus Tan',
      replies: 18,
      unread: 3,
      lastPost: '2 hours ago by Ashwin Mahesh Kumar'
    },
    {
      title: 'Term Paper Prototype: Best Practices for Gemini Structured JSON Outputs',
      author: 'Chloe Wong',
      replies: 7,
      unread: 0,
      lastPost: 'Yesterday by Darren Teo'
    },
    {
      title: 'Git Push HTTPS 403 Authentication Error with PAT Troubleshooting',
      author: 'Ashwin Mahesh Kumar',
      replies: 12,
      unread: 1,
      lastPost: 'Yesterday by TA Sarah Lim'
    },
    {
      title: 'Week 2 Reflection: Goal Gradients and Streaks in Health Apps',
      author: 'Marcus Lee',
      replies: 24,
      unread: 0,
      lastPost: 'Sep 12, 2026'
    }
  ];

  return (
    <div className="flex-1 px-12 py-8 max-w-5xl space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-medium text-gray-900 tracking-tight">Course Discussions</h1>
          <p className="text-sm text-gray-600 mt-1">Participate in weekly debate prompts and technical troubleshooting.</p>
        </div>
        <button 
          type="button"
          onClick={() => alert('New Discussion Thread form opened.')}
          className="px-4 py-2 bg-[#006fbf] text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors cursor-pointer"
        >
          + Start New Thread
        </button>
      </div>

      <div className="border border-gray-200 rounded divide-y divide-gray-200 bg-white">
        {threads.map((t, idx) => (
          <div key={idx} className="p-4 hover:bg-gray-50 flex items-center justify-between transition-colors cursor-pointer">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-blue-700 hover:underline">{t.title}</h3>
              <div className="text-xs text-gray-500">
                Started by {t.author} · Last post {t.lastPost}
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-600 shrink-0">
              <div className="text-right">
                <div className="font-semibold text-gray-800">{t.replies} replies</div>
                {t.unread > 0 && (
                  <span className="text-[11px] text-blue-600 font-medium">{t.unread} new</span>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AssignmentsView: React.FC = () => {
  return (
    <div className="flex-1 px-12 py-8 max-w-5xl space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-medium text-gray-900 tracking-tight">Assignments &amp; Submissions</h1>
        <p className="text-sm text-gray-600 mt-1">Track deadlines, submission requirements, and grading statuses.</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 border border-blue-200 rounded-lg bg-blue-50/40 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Final Deliverable</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[11px] font-semibold">35% Weight</span>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mt-1">
              Individual Term Paper: AI-Augmented Decision Architecture Prototype
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Submit your Vercel prototype URL, GitHub repository link, and 8-10 page PDF synthesis.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>Due: November 15, 2026 23:59 SGT</span>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => alert('Opening Term Paper submission dropbox.')}
            className="px-4 py-2 bg-[#006fbf] text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors shrink-0 cursor-pointer"
          >
            Submit Dropbox
          </button>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Assignment 1</span>
              <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 text-[11px] font-semibold">Graded: A (89/100)</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mt-1">
              Cognitive Bias Audit in Modern Fintech Interfaces
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Individual audit report analyzing default effects, framing, and mental accounting in Robo-advisory platforms.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => alert('Viewing feedback for Assignment 1: Excellent theoretical grounding and empirical critique.')}
            className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition-colors shrink-0 cursor-pointer"
          >
            View Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export const QuizzesView: React.FC = () => {
  return (
    <div className="flex-1 px-12 py-8 max-w-5xl space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-medium text-gray-900 tracking-tight">Quizzes &amp; Knowledge Checks</h1>
        <p className="text-sm text-gray-600 mt-1">Weekly self-assessments on behavioral decision models and choice architecture.</p>
      </div>

      <div className="border border-gray-200 rounded divide-y divide-gray-100 bg-white text-xs">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Quiz 1: Dual-Process Theory &amp; Cognitive Load</h4>
            <div className="text-gray-500 mt-0.5">Completed Aug 30, 2026 · Score: 10/10 (100%)</div>
          </div>
          <span className="text-green-700 font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Passed</span>
          </span>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Quiz 2: Prospect Theory &amp; Reference Points</h4>
            <div className="text-gray-500 mt-0.5">Completed Sep 20, 2026 · Score: 9/10 (90%)</div>
          </div>
          <span className="text-green-700 font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Passed</span>
          </span>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Quiz 3: AI Product Architecture &amp; Prompt Engineering</h4>
            <div className="text-gray-500 mt-0.5">Available Sep 28, 2026 · 15 Questions · 25 Minutes</div>
          </div>
          <button 
            type="button"
            onClick={() => alert('Quiz 3 opened: 15 multiple choice questions on prompt design and choice architecture.')}
            className="px-3 py-1.5 bg-[#006fbf] text-white rounded font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export const BookmarksView: React.FC<ViewProps> = ({ onSelectModule, onOpenTopic }) => {
  return (
    <div className="flex-1 px-12 py-8 max-w-5xl space-y-6">
      <div className="border-b border-gray-200 pb-4 flex items-center space-x-2">
        <Bookmark className="w-6 h-6 text-[#006fbf]" />
        <div>
          <h1 className="text-3xl font-medium text-gray-900 tracking-tight">Saved Bookmarks</h1>
          <p className="text-sm text-gray-600 mt-0.5">Quick access to your saved topics and course resources.</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 border border-gray-200 rounded-md bg-white hover:border-blue-400 transition-colors flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-blue-700 uppercase">Week 6 AI-augmented Product Building</span>
            <h4 className="text-sm font-semibold text-gray-900 mt-0.5">MGMT6108_Week06_Term_Paper_Briefing</h4>
            <p className="text-xs text-gray-500 mt-0.5">Briefing document &amp; grading rubrics for individual prototype</p>
          </div>
          <button
            type="button"
            onClick={() => onSelectModule && onSelectModule('week-6')}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-medium cursor-pointer"
          >
            Go to Module
          </button>
        </div>

        <div className="p-4 border border-gray-200 rounded-md bg-white hover:border-blue-400 transition-colors flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-blue-700 uppercase">Week 6 AI-augmented Product Building</span>
            <h4 className="text-sm font-semibold text-gray-900 mt-0.5">Google AI Studio</h4>
            <p className="text-xs text-gray-500 mt-0.5">Prototyping environment for testing Gemini models &amp; prompt design</p>
          </div>
          <button
            type="button"
            onClick={() => onSelectModule && onSelectModule('week-6')}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-medium cursor-pointer"
          >
            Go to Module
          </button>
        </div>
      </div>
    </div>
  );
};

export const CourseScheduleView: React.FC<ViewProps> = ({ onSelectModule }) => {
  return (
    <div className="flex-1 px-12 py-8 max-w-5xl space-y-6">
      <div className="border-b border-gray-200 pb-4 flex items-center space-x-2">
        <Calendar className="w-6 h-6 text-[#006fbf]" />
        <div>
          <h1 className="text-3xl font-medium text-gray-900 tracking-tight">Course Schedule</h1>
          <p className="text-sm text-gray-600 mt-0.5">AY2026/27 Term 1 Academic Calendar &amp; Weekly Milestones.</p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
            <tr>
              <th className="py-3 px-4">Week</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Topic / Focus</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            <tr>
              <td className="py-3 px-4 font-medium">Week 1</td>
              <td className="py-3 px-4">Aug 24, 2026</td>
              <td className="py-3 px-4">Introduction to Behavioral Decision Making</td>
              <td className="py-3 px-4"><span className="text-green-700 font-medium">Completed</span></td>
              <td className="py-3 px-4 text-right">
                <button onClick={() => onSelectModule && onSelectModule('week-1')} className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium">Week 2</td>
              <td className="py-3 px-4">Aug 31, 2026</td>
              <td className="py-3 px-4">Goal Setting &amp; Implementation Intentions</td>
              <td className="py-3 px-4"><span className="text-green-700 font-medium">Completed</span></td>
              <td className="py-3 px-4 text-right">
                <button onClick={() => onSelectModule && onSelectModule('week-2')} className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium">Week 3</td>
              <td className="py-3 px-4">Sep 7, 2026</td>
              <td className="py-3 px-4">Expectation, Confirmation Bias, &amp; Motivated Reasoning</td>
              <td className="py-3 px-4"><span className="text-amber-700 font-medium">Due soon</span></td>
              <td className="py-3 px-4 text-right">
                <button onClick={() => onSelectModule && onSelectModule('week-3')} className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium">Week 4-5</td>
              <td className="py-3 px-4">Sep 14, 2026</td>
              <td className="py-3 px-4">Core Principles of Behavioral Economics &amp; Choice Architecture</td>
              <td className="py-3 px-4"><span className="text-green-700 font-medium">Completed</span></td>
              <td className="py-3 px-4 text-right">
                <button onClick={() => onSelectModule && onSelectModule('week-4-5')} className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
            <tr className="bg-blue-50/50">
              <td className="py-3 px-4 font-bold text-blue-900">Week 6</td>
              <td className="py-3 px-4 font-medium text-blue-900">Sep 28, 2026</td>
              <td className="py-3 px-4 font-semibold text-blue-900">AI-augmented Product Building</td>
              <td className="py-3 px-4"><span className="text-blue-800 font-semibold bg-blue-100 px-2 py-0.5 rounded">Active Session</span></td>
              <td className="py-3 px-4 text-right">
                <button onClick={() => onSelectModule && onSelectModule('week-6')} className="text-blue-700 font-semibold hover:underline">Open Now →</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
