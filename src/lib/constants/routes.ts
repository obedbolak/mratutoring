export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/signin",
    LOGOUT: "/api/auth/signout",
    REGISTER: "/api/auth/register",
  },
  USERS: "/api/users",
  POSTS: "/api/posts",
} as const;
