/**
 *  An array of routes that are accesible to public.
 *  These routes not require authntication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/rides'];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect users to "/profile"
 * @type {string[]}
 */
export const authRoutes = ['/login', '/register'];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes"
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path for logged in users.
 */
export const DEFAULT_LOGIN_REDIRECT = '/profile';
