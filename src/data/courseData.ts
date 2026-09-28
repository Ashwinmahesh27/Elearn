import { CourseModule, UserNotification, UserMessage } from '../types/course';

export const INITIAL_MODULES: CourseModule[] = [
  {
    id: 'course-syllabus',
    title: 'Course Syllabus',
    dateInfo: 'Begins August 24',
    completed: true,
    badgeType: 'check',
    contentSummary: {
      startsAt: 'Aug 24, 2026 09:00 AM',
      notes: [
        'Welcome to MGMT6108: Decision Architecture & Behavioral Product Design.',
        'Office hours: Wednesdays 3:00 PM - 5:00 PM at School of Social Sciences & Management, Level 4.',
        'Please review the academic integrity policy and group project weightings.'
      ]
    },
    topics: [
      {
        id: 'syl-1',
        title: 'MGMT6108 Course Outline & Assessment Rubric AY26/27',
        type: 'document',
        completed: true,
        description: 'Complete breakdown of grading: 30% Individual term paper, 35% Team AI prototype, 20% Discussion leading, 15% Class participation.'
      },
      {
        id: 'syl-2',
        title: 'Instructor Biography & Office Hours Booking Link',
        type: 'link',
        url: 'https://faculty.smu.edu.sg',
        completed: true
      }
    ]
  },
  {
    id: 'course-readings',
    title: 'Course Readings',
    dateInfo: 'Begins August 24',
    completed: true,
    badgeType: 'check',
    contentSummary: {
      startsAt: 'Aug 24, 2026 09:00 AM',
      notes: [
        'Access all required readings through SMU Library e-Reserves.',
        'Prepare annotations prior to seminar discussions each week.'
      ]
    },
    topics: [
      {
        id: 'read-1',
        title: 'Kahneman & Tversky (1979) - Prospect Theory: An Analysis of Decision under Risk',
        type: 'document',
        completed: true
      },
      {
        id: 'read-2',
        title: 'Thaler & Sunstein (2008) - Nudge: Improving Decisions About Health, Wealth, and Happiness',
        type: 'document',
        completed: true
      },
      {
        id: 'read-3',
        title: 'Amos Tversky (1974) - Judgment under Uncertainty: Heuristics and Biases',
        type: 'document',
        completed: true
      }
    ]
  },
  {
    id: 'week-1',
    title: 'Week 1 Introduction to Behavioral Decision Making',
    dateInfo: 'Begins August 24',
    completed: true,
    badgeType: 'check',
    contentSummary: {
      startsAt: 'Aug 24, 2026 12:00 PM',
      notes: [
        'Introduction to System 1 (fast, instinctive) vs System 2 (slow, deliberative) thinking.',
        'Cognitive load in digital product interfaces and default bias.'
      ]
    },
    topics: [
      {
        id: 'w1-1',
        title: 'Lecture Slides: Foundations of Dual-Process Theory in Product Design',
        type: 'link',
        completed: true
      },
      {
        id: 'w1-2',
        title: 'Case Study: Choice Overload in Modern Subscription Platforms',
        type: 'document',
        completed: true
      }
    ]
  },
  {
    id: 'week-2',
    title: 'Week 2 Goal Setting',
    dateInfo: 'Begins August 31',
    completed: true,
    badgeType: 'check',
    contentSummary: {
      startsAt: 'Aug 31, 2026 12:00 PM',
      notes: [
        'Locke & Latham Goal Setting Theory and implementation intentions (Gollwitzer).',
        'Designing habit loops and feedback mechanisms in behavioral tech.'
      ]
    },
    topics: [
      {
        id: 'w2-1',
        title: 'Week 02 Slides: Goal Gradients, Streaks, and Progress Visualizations',
        type: 'link',
        completed: true
      },
      {
        id: 'w2-2',
        title: 'Interactive Exercise: The Ovsiankina Effect in Task Completion',
        type: 'link',
        completed: true
      }
    ]
  },
  {
    id: 'discussion-roster',
    title: 'Discussion Leading Group Roster',
    completed: true,
    badgeType: 'check',
    contentSummary: {
      notes: [
        'Confirm your group presentation slot for Weeks 3 through 10.',
        'Presenting groups must post 2 discussion catalyst questions 48 hours prior to class.'
      ]
    },
    topics: [
      {
        id: 'roster-1',
        title: 'Discussion Group Schedule & Topic Sign-up Sheet (AY26)',
        type: 'link',
        completed: true
      },
      {
        id: 'roster-2',
        title: 'Peer Evaluation Rubric for Discussion Facilitation',
        type: 'document',
        completed: true
      }
    ]
  },
  {
    id: 'week-3',
    title: 'Week 3 Expectation, Confirmation Bias, & Motivated Reasoning',
    dateInfo: 'Begins September 7',
    completed: false,
    badgeCount: 1,
    badgeType: 'count',
    contentSummary: {
      startsAt: 'Sep 7, 2026 12:00 PM',
      notes: [
        'How prior expectations warp sensory experience and product evaluation.',
        'Motivated cognitive reasoning in recommendation engines and filter bubbles.'
      ]
    },
    topics: [
      {
        id: 'w3-1',
        title: 'Week 03 Lecture Deck: Confirmation Bias & Algorithmic Echo Chambers',
        type: 'link',
        completed: true
      },
      {
        id: 'w3-2',
        title: 'Assignment 1 Submission Dropbox: Cognitive Bias Audit in Fintech Apps',
        type: 'assignment',
        completed: false,
        deadline: 'Sep 13, 2026 11:59 PM'
      }
    ]
  },
  {
    id: 'week-4-5',
    title: 'Week 4 & Week 5 Core Principles & Applications of Behavioral Economics in Managerial Decision Making',
    dateInfo: 'Begins September 14',
    completed: true,
    badgeType: 'check',
    contentSummary: {
      startsAt: 'Sep 14, 2026 12:00 PM',
      notes: [
        'Loss aversion ($\lambda \approx 2.25$), endowment effect, and sunk cost fallacy.',
        'Framing effects and decoy architecture in managerial pricing matrices.'
      ]
    },
    topics: [
      {
        id: 'w4-1',
        title: 'Week 04 Slides: Loss Aversion & Reference Dependence',
        type: 'link',
        completed: true
      },
      {
        id: 'w4-2',
        title: 'Week 05 Slides: Asymmetric Dominance (The Decoy Effect)',
        type: 'link',
        completed: true
      }
    ]
  },
  {
    id: 'week-6',
    title: 'Week 6 AI-augmented Product Building',
    dateInfo: 'Begins September 28',
    completed: true,
    badgeType: 'check',
    contentSummary: {
      startsAt: 'Sep 28, 2026 12:00 PM',
      notes: [
        'Here is the password to the slides: insightful!',
        'Use hobby (free-tier) for Vercel, Team.',
        'How to? git push https::<Your_PAT>@<Your_.git_address>'
      ],
      password: 'insightful!',
      gitCommand: 'git push https::<Your_PAT>@<Your_.git_address>'
    },
    topics: [
      {
        id: 'topic-1',
        title: 'MGMT6108_Week06_Term_Paper_Briefing',
        type: 'link',
        completed: true,
        description: 'Comprehensive briefing guidelines for the MGMT6108 Individual Term Paper and AI Product Prototype. Covers core behavioral decision principles, technical deployment requirements, grading rubrics, and deadlines.',
        details: {
          overview: 'The term paper combines rigorous behavioral decision theory with a live, functional AI-augmented web application prototype.',
          instructions: [
            '1. Select a real managerial or consumer decision failure (e.g. status quo inertia in pension savings, confirmation bias in hiring, impulse micro-transactions).',
            '2. Architect an AI-augmented decision support interface that counters the bias using choice architecture and modern GenAI assistance.',
            '3. Deploy the application live to Vercel (or Cloud Run) using the free hobby tier.',
            '4. Submit your 8-10 page academic synthesis along with the live interactive URL and GitHub repo link.'
          ],
          resources: [
            { label: 'Download Term Paper Briefing PDF', url: '#download' },
            { label: 'Rubric Criteria Matrix', url: '#rubric' },
            { label: 'Example Submissions (High Distinction)', url: '#examples' }
          ],
          deadline: 'November 15, 2026 23:59 SGT'
        }
      },
      {
        id: 'topic-2',
        title: 'Google Stitch',
        type: 'link',
        completed: true,
        description: 'Collaborative UI design and rapid front-end visual prototyping tool for translating behavioral wireframes into production components.',
        details: {
          overview: 'Google Stitch accelerates UI experimentation, allowing rapid prototyping of decision levers, choice framing variants, and user feedback mechanisms.',
          instructions: [
            'Explore Stitch templates tailored for responsive web applications.',
            'Export code snippets or Tailwind CSS layouts directly into your project.'
          ],
          resources: [
            { label: 'Launch Google Stitch Portal', url: 'https://stitch.withgoogle.com' },
            { label: 'Design System Best Practices for Choice Architecture', url: '#guidelines' }
          ]
        }
      },
      {
        id: 'topic-3',
        title: 'Google AI Studio',
        type: 'link',
        completed: true,
        description: 'Web-based developer prototyping environment for testing Gemini 2.5 Flash / Pro models, prompt engineering, system instructions, and structured JSON output.',
        details: {
          overview: 'Google AI Studio provides instant access to Google latest generative AI models with developer API keys and direct code generation in TypeScript, Python, and cURL.',
          instructions: [
            'Create your API key in Google AI Studio.',
            'Test zero-shot, few-shot, and system prompts for your behavioral decision assistant.',
            'Use structured outputs (JSON Schema) to guarantee strict decision feedback.'
          ],
          resources: [
            { label: 'Open Google AI Studio', url: 'https://aistudio.google.com' },
            { label: 'Gemini TypeScript SDK Documentation', url: 'https://ai.google.dev' }
          ]
        }
      },
      {
        id: 'topic-4',
        title: 'Github',
        type: 'link',
        completed: true,
        description: 'Version control and collaboration platform. Step-by-step instructions for creating repositories, authenticating via Personal Access Tokens (PAT), and continuous deployment.',
        details: {
          overview: 'All term paper codebases must be maintained in a GitHub repository with clean commit history, clear documentation, and a working README.',
          instructions: [
            'Generate a classic Personal Access Token (PAT) with "repo" scope in GitHub Settings -> Developer Settings -> Personal access tokens.',
            'Use the command: git push https::<Your_PAT>@<Your_.git_address>',
            'Ensure no private keys or secrets are committed to the repository.'
          ],
          resources: [
            { label: 'Open GitHub.com', url: 'https://github.com' },
            { label: 'Personal Access Tokens (Classic) Documentation', url: 'https://docs.github.com' }
          ]
        }
      },
      {
        id: 'topic-5',
        title: 'Vercel',
        type: 'link',
        completed: true,
        description: 'Zero-configuration cloud platform for hosting static sites and full-stack React / Vite applications with global CDN and automatic CI/CD.',
        details: {
          overview: 'Deploy your interactive AI prototype to the Vercel Hobby (free-tier) team without incurring hosting costs.',
          instructions: [
            'Connect your GitHub repository to Vercel.',
            'Configure framework preset: Vite.',
            'Add your environment variables in Project Settings -> Environment Variables.',
            'Deploy and copy your production URL (e.g. https://my-project.vercel.app).'
          ],
          resources: [
            { label: 'Open Vercel Dashboard', url: 'https://vercel.com' },
            { label: 'Vite on Vercel Quickstart', url: 'https://vercel.com/docs' }
          ]
        }
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: UserNotification[] = [
  {
    id: 'notif-1',
    title: 'Week 6 Materials Published',
    time: '2 hours ago',
    read: false,
    category: 'content',
    detail: 'Slides and Term Paper Briefing for Week 6 AI-augmented Product Building are now available.'
  },
  {
    id: 'notif-2',
    title: 'Assignment 1 Feedback Released',
    time: '1 day ago',
    read: false,
    category: 'grade',
    detail: 'Your cognitive bias audit submission has been graded. Grade: A (89/100). Check comments under Grades tab.'
  },
  {
    id: 'notif-3',
    title: 'Reminder: Term Paper Groups Due',
    time: '3 days ago',
    read: true,
    category: 'announcement',
    detail: 'Please finalize team rosters on the Discussion Leading Group Roster sheet by Friday.'
  }
];

export const INITIAL_MESSAGES: UserMessage[] = [
  {
    id: 'msg-1',
    sender: 'Prof. Linus Tan (Instructor)',
    avatar: 'LT',
    subject: 'Week 6 AI Prototype Consultation',
    preview: 'Hi Ashwin, feel free to drop by office hours this Wednesday if you have questions regarding the Gemini structured output architecture.',
    time: '10:45 AM',
    unread: true
  },
  {
    id: 'msg-2',
    sender: 'Chloe Wong (Group 4 Member)',
    avatar: 'CW',
    subject: 'Slides password & GitHub sync',
    preview: 'Hey Ashwin, just got the slides password insightful! Let me know when you push the repo to GitHub so I can test the Vercel deploy.',
    time: 'Yesterday',
    unread: false
  }
];

export const COURSES_LIST = [
  { code: 'MGMT6108-G1', name: 'Decision Architecture', term: 'AY26/27 Term 1', active: true },
  { code: 'OBHR201-G2', name: 'Organizational Behavior', term: 'AY26/27 Term 1', active: false },
  { code: 'STAT151-G3', name: 'Introduction to Statistical Theory', term: 'AY26/27 Term 1', active: false },
  { code: 'IS415-G1', name: 'Geospatial Analytics for Decision Makers', term: 'AY26/27 Term 1', active: false }
];
