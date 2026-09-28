export interface TopicItem {
  id: string;
  title: string;
  type: 'link' | 'document' | 'video' | 'quiz' | 'assignment';
  url?: string;
  completed: boolean;
  description?: string;
  deadline?: string;
  details?: {
    overview?: string;
    instructions?: string[];
    resources?: { label: string; url: string; icon?: string }[];
    deadline?: string;
  };
}

export interface CourseModule {
  id: string;
  title: string;
  dateInfo?: string;
  completed: boolean;
  badgeCount?: number;
  badgeType?: 'count' | 'check';
  contentSummary?: {
    startsAt?: string;
    notes?: string[];
    password?: string;
    gitCommand?: string;
  };
  topics: TopicItem[];
}

export interface UserNotification {
  id: string;
  title: string;
  time: string;
  read: boolean;
  category: 'announcement' | 'grade' | 'content';
  detail: string;
}

export interface UserMessage {
  id: string;
  sender: string;
  avatar: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
}
