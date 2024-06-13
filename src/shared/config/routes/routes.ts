export enum Routes {
  Login = '/',
  SignUp = '/sign-up',
  SelectChat = '/chat',
  Chat = '/chat-feed',
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
