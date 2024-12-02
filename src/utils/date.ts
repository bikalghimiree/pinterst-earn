import { formatDistanceToNow as formatDistance } from 'date-fns';

export function formatDistanceToNow(date: string | Date): string {
  return formatDistance(new Date(date), { addSuffix: true });
}