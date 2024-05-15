import * as Pages from '@/pages'
import { Block } from '@/shared/lib/block'

enum Routes {
  Login = '/',
  SignUp = '/sign-up',
  SelectChat = '/chat',
  ChatFeed = '/chat-feed',
  Profile = '/profile',
  Account = '/account',
  NotFound = '/not-found',
  ServerError = '/server-error',
}

export const pages: Record<Routes, Block> = {
  [Routes.Login]: new Pages.Login({}),
  [Routes.SignUp]: new Pages.SignUp({}),
  [Routes.SelectChat]: new Pages.SelectChat({}),
  [Routes.Account]: new Pages.Account({}),
  [Routes.ChatFeed]: new Pages.ChatFeed({}),
  [Routes.Profile]: new Pages.Profile({}),
  [Routes.NotFound]: new Pages.Error({
    code: 404,
    description: 'Не туда попали',
  }),
  [Routes.ServerError]: new Pages.Error({
    code: 500,
    description: 'Мы уже фиксим',
  }),
}

document.addEventListener('DOMContentLoaded', () => {
  handleRouteChange()
  window.addEventListener('popstate', handleRouteChange)
})

function handleRouteChange() {
  const { pathname } = window.location
  const route = pathname as Routes

  if (Object.prototype.hasOwnProperty.call(pages, route)) {
    renderPage(pages[route])
  } else {
    renderPage(pages[Routes.NotFound])
  }
}

function renderPage(page: Block) {
  const root = document.querySelector('#root')!
  root.append(page.getContent())
}
