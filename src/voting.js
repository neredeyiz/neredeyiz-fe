import Cookies from 'js-cookie';
import { vote } from './api';

const VOTE_COOKIE_NAME = 'has_voted_today';

export function hasUserVoted() {
  return Cookies.get(VOTE_COOKIE_NAME) === 'true';
}

export function markUserAsVoted() {
  // Set cookie that expires at midnight
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  
  Cookies.set(VOTE_COOKIE_NAME, 'true', { 
    expires: midnight,
    sameSite: 'strict'
  });
}

export async function submitVote(placeName) {
  if (hasUserVoted()) {
    console.warn('User has already voted today');
    return;
  }

  try {
    await vote(placeName);
    markUserAsVoted();
  } catch (error) {
    console.error('Failed to submit vote:', error);
    // Silently fail, nothing happens if the process fails
  }
}