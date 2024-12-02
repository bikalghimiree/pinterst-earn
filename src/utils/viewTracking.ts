import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Cookies from 'js-cookie';
import { ViewTracking } from '../types';

let fpPromise: Promise<any> | null = null;

const getFingerprint = async () => {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load();
  }
  const fp = await fpPromise;
  const result = await fp.get();
  return result.visitorId;
};

export async function trackView(pinId: string): Promise<boolean> {
  const userId = Cookies.get('userId');
  const fpHash = await getFingerprint();
  
  // Simulate IP address for demo (in production, this would come from the server)
  const ipAddress = '127.0.0.1';
  
  const viewKey = `view_${pinId}_${fpHash}_${ipAddress}`;
  const lastView = localStorage.getItem(viewKey);
  const now = new Date();
  
  // Check if this is a paid view
  const paidViewsToday = parseInt(localStorage.getItem(`paid_views_${fpHash}_${now.toDateString()}`) || '0');
  const canEarnFromView = paidViewsToday < 3;
  
  if (lastView) {
    const viewDate = new Date(lastView);
    const hoursSinceLastView = (now.getTime() - viewDate.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceLastView < 24) {
      return false;
    }
  }
  
  const tracking: ViewTracking = {
    pinId,
    userId: userId || undefined,
    ipAddress,
    fingerprint: fpHash,
    timestamp: now.toISOString(),
    isPaid: canEarnFromView,
  };
  
  // Store the view
  localStorage.setItem(viewKey, now.toISOString());
  
  if (canEarnFromView) {
    localStorage.setItem(
      `paid_views_${fpHash}_${now.toDateString()}`,
      (paidViewsToday + 1).toString()
    );
  }
  
  // In a real app, you would send this to your backend
  console.log('View tracked:', tracking);
  
  return canEarnFromView;
}