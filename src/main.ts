import Handlebars from 'handlebars'
import HandlebarsRuntime from 'handlebars/runtime'
import * as Pages from '@/pages'
import { chatsPlaceholderData } from '@/shared/config'
import { Block } from '@/shared/lib/block'
import * as UI from '@/shared/ui'
import * as Widgets from '@/widgets'

Object.entries(UI).forEach(([name, partial]) =>
  HandlebarsRuntime.registerPartial(name, partial),
)

Object.entries(Widgets).forEach(([name, partial]) =>
  HandlebarsRuntime.registerPartial(name, partial),
)

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
  [Routes.Account]: new Pages.Account({}),
  // [Routes.Profile]: new Pages.Profile({}),
  // [Routes.SignUp]: Pages.SignUp({}),
  // [Routes.SelectChat]: Pages.SelectChat({
  //   chats: chatsPlaceholderData,
  // }),
  // [Routes.ChatFeed]: Pages.ChatFeed({ chats: chatsPlaceholderData }),
  // [Routes.Profile]: Pages.Profile({
  //   chats: chatsPlaceholderData,
  // }),
  // [Routes.Account]: Pages.Account({
  //   chats: chatsPlaceholderData,
  // }),
  // [Routes.NotFound]: new Pages.Error({
  //   code: 404,
  //   description: 'Не туда попали',
  // }),
  // [Routes.ServerError]: Pages.Error({
  //   code: 500,
  //   description: 'Мы уже фиксим',
  // }),
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
