import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/products/:slug'],
  ignoredRoutes: ['/api/sheet', '/api/google']
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};
