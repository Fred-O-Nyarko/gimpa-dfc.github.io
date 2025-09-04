import { NextRequest } from 'next/server';
import crypto from 'crypto';

// Simple in-memory session store (in production, use Redis or database)
const sessions = new Map<string, { created: number; expires: number }>();

// Session duration: 24 hours
const SESSION_DURATION = 24 * 60 * 60 * 1000;

// Clean expired sessions
export const cleanExpiredSessions = () => {
  const now = Date.now();
  const tokensToDelete: string[] = [];
  
  sessions.forEach((session, token) => {
    if (now > session.expires) {
      tokensToDelete.push(token);
    }
  });
  
  tokensToDelete.forEach(token => sessions.delete(token));
};

// Generate secure session token
export const generateSessionToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Create session
export const createSession = (): string => {
  cleanExpiredSessions();
  
  const sessionToken = generateSessionToken();
  const now = Date.now();
  const expires = now + SESSION_DURATION;
  
  sessions.set(sessionToken, { created: now, expires });
  return sessionToken;
};

// Verify session
export const verifySession = (request: NextRequest): boolean => {
  const sessionToken = request.cookies.get('session')?.value;
  
  if (!sessionToken) {
    return false;
  }

  const session = sessions.get(sessionToken);
  if (!session) {
    return false;
  }

  // Check if session is expired
  if (Date.now() > session.expires) {
    sessions.delete(sessionToken);
    return false;
  }

  return true;
};

// Delete session
export const deleteSession = (request: NextRequest): void => {
  const sessionToken = request.cookies.get('session')?.value;
  
  if (sessionToken && sessions.has(sessionToken)) {
    sessions.delete(sessionToken);
  }
};

export { SESSION_DURATION };