export enum Routes {
  Login = '/',
  SignUp = '/sign-up',
  Messenger = '/messenger',
  Profile = '/profile',
  Account = '/account',
  NotFound = '/not-found',
  ServerError = '/server-error',
}

export const protectedRoutes = [
  Routes.Messenger,
  Routes.Profile,
  Routes.Account,
]
