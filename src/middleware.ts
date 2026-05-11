import { NextResponse } from 'next/server';

export function middleware() {
  // In a cross-domain setup (Frontend on localhost/Domain A, Backend on Domain B),
  // Next.js middleware cannot access the HttpOnly cookie set by the backend domain.
  // Security and redirects are handled securely on the client-side via DashboardLayout.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
