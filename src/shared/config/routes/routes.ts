export enum Routes {
  Login = '/',
  SignUp = '/sign-up',
  Chat = '/messenger',
  Profile = '/profile',
  Account = '/account',
  NotFound = '/not-found',
  ServerError = '/server-error',
}

export const protectedRoutes = [Routes.Chat, Routes.Profile, Routes.Account]
