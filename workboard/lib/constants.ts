export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
    REGISTER: '/api/auth/register',
  },
  DASHBOARD: '/api/dashboard',
  PROJECTS: '/api/projects',
  PROJECT: (id: string) => `/api/projects/${id}`,
  PROJECT_MEMBERS: (projectId: string) => `/api/projects/${projectId}/members`,
  PROJECT_MEMBER: (projectId: string, userId: string) =>
    `/api/projects/${projectId}/members/${userId}`,
  PROJECT_TASKS: (projectId: string) => `/api/projects/${projectId}/tasks`,
  TASK: (id: string) => `/api/tasks/${id}`,
} as const;

export const JWT_EXPIRES_IN = '7d';
export const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me-in-env';