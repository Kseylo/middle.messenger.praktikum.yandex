export enum Routes {
  Login = '/',
  SignUp = '/sign-up',
  SelectChat = '/chat',
  Chat = '/messenger',
  Profile = '/profile',
  Account = '/account',
  NotFound = '/not-found',
  ServerError = '/server-error',
}

export const protectedRoutes = [
  Routes.SelectChat,
  Routes.Chat,
  Routes.Profile,
  Routes.Account,
]
