export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  following: string[];
}

export interface Pin {
  id: string;
  title: string;
  description: string;
  image: string;
  userId: string;
  boardId: string;
  saves: number;
  views: number;
  uniqueViews: number;
  paidViews: number;
  earnings: number;
  comments: Comment[];
  createdAt: string;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  userId: string;
  pins: string[];
  isPrivate: boolean;
}

export interface Collection {
  id: string;
  name: string;
  pins: string[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'save' | 'earning';
  content: string;
  isRead: boolean;
  createdAt: string;
  relatedUserId: string;
  relatedItemId?: string;
}

export interface Earnings {
  total: number;
  thisMonth: number;
  pending: number;
  history: EarningTransaction[];
}

export interface EarningTransaction {
  id: string;
  amount: number;
  type: 'view' | 'withdrawal';
  status: 'pending' | 'completed';
  createdAt: string;
  pinId?: string;
}

export interface ViewTracking {
  pinId: string;
  userId?: string;
  ipAddress: string;
  fingerprint: string;
  timestamp: string;
  isPaid: boolean;
}