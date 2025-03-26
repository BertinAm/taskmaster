import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to add security headers and CSRF protection
 */
export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next();
  
  // Add security headers
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `;
  
  // Add security headers
  response.headers.set('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim());
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // For login and authentication routes
  if (request.nextUrl.pathname.startsWith('/api/auth') || 
      request.nextUrl.pathname === '/login' || 
      request.nextUrl.pathname === '/register') {
    // Only allow POST requests from the same origin for auth endpoints
    if (request.method === 'POST') {
      const referer = request.headers.get('referer');
      const origin = request.headers.get('origin');
      
      // Check if the request is from our own site
      const selfOrigin = request.nextUrl.origin;
      if (origin && origin !== selfOrigin) {
        return new NextResponse(null, { status: 403 });
      }
      
      if (referer) {
        try {
          const refererUrl = new URL(referer);
          if (refererUrl.origin !== selfOrigin) {
            return new NextResponse(null, { status: 403 });
          }
        } catch (e) {
          return new NextResponse(null, { status: 403 });
        }
      }
    }
  }
  
  return response;
}

// Configure the middleware to run for specific paths
export const config = {
  matcher: [
    // Apply to all routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 