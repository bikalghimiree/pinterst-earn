import { create } from 'zustand';
import type { User, Pin, Board, Notification, Collection, Earnings } from '../types';

interface Store {
  user: User | null;
  pins: Pin[];
  boards: Board[];
  collections: Collection[];
  notifications: Notification[];
  earnings: Earnings;
  trendingSearches: string[];
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  addPin: (pin: Pin) => void;
  addBoard: (board: Board) => void;
  createCollection: (collection: Collection) => void;
  savePin: (pinId: string, boardId: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  markNotificationsAsRead: () => void;
}

// Demo user data
const demoUser = {
  id: '1',
  name: 'Bikal Ghimire',
  email: 'bikal@ghimire.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bikal',
  following: [],
};

// Demo notifications
const demoNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'like',
    content: 'John Doe liked your pin',
    isRead: false,
    createdAt: new Date().toISOString(),
    relatedUserId: '2',
    relatedItemId: '1'
  },
  {
    id: '2',
    userId: '1',
    type: 'follow',
    content: 'Jane Smith started following you',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    relatedUserId: '3'
  }
];

const initialEarnings: Earnings = {
  total: 0,
  thisMonth: 0,
  pending: 0,
  history: []
};

export const useStore = create<Store>((set) => ({
  user: null,
  pins: [],
  boards: [],
  collections: [],
  notifications: demoNotifications,
  earnings: initialEarnings,
  trendingSearches: [
    'AI Art Generation',
    'Stable Diffusion',
    'DALL-E Creations',
    'Midjourney Art',
    'Neural Style Transfer',
  ],
  setUser: (user) => set({ user }),
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null
  })),
  addPin: (pin) => set((state) => ({ pins: [...state.pins, pin] })),
  addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
  createCollection: (collection) => set((state) => ({
    collections: [...state.collections, collection]
  })),
  savePin: (pinId, boardId) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? { ...board, pins: [...board.pins, pinId] }
          : board
      ),
    })),
  login: async (email: string, password: string) => {
    if (email === 'bikal@ghimire.com' && password === 'bikalghimire') {
      set({ user: demoUser });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => set({ user: null }),
  markNotificationsAsRead: () => set((state) => ({
    notifications: state.notifications.map(notif => ({ ...notif, isRead: true }))
  })),
}));