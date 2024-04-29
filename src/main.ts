import Handlebars from 'handlebars'
import HandlebarsRuntime from 'handlebars/runtime'
import * as Pages from '@/pages'
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
  Chat = '/chat',
  NotFound = '/not-found',
  ServerError = '/server-error',
}

const chats = [
  {
    title: 'Андрей',
    messageTime: '10:49',
    lastMessage: 'Изображение',
    unreadCount: 2,
  },
  {
    title: 'Алексей',
    messageTime: '12:00',
    lastMessage: 'И Human Interface Guidelines и Material Design рекомендуют',
  },
  {
    title: 'Илья',
    messageTime: '15:12',
    lastMessage: 'Друзья, у меня для вас особенный выпуск новостей!',
    unreadCount: 4,
  },
  {
    title: '1,2,3',
    messageTime: 'Пн',
    lastMessage: 'Миллионы россиян ежедневно проводят десятки часов свое',
  },
  {
    title: 'Design Destroyer',
    messageTime: 'Пн',
    lastMessage: 'В 2008 году художник Jon Rafman  начал собирать',
  },
  {
    title: 'Day',
    messageTime: '1 Мая 2020',
    lastMessage: 'Так увлёкся работой по курсу, что совсем забыл его анонсир',
  },
  {
    title: 'Стас Рогозин',
    messageTime: '12 Апр 2020',
    lastMessage: 'Можно или сегодня или завтра вечером',
  },
  {
    title: 'Стас Рогозин',
    messageTime: '12 Апр 2020',
    lastMessage: 'Можно или сегодня или завтра вечером',
  },
  {
    title: 'Стас Рогозин',
    messageTime: '12 Апр 2020',
    lastMessage: 'Можно или сегодня или завтра вечером',
  },
  {
    title: 'Стас Рогозин',
    messageTime: '12 Апр 2020',
    lastMessage: 'Можно или сегодня или завтра вечером',
  },
  {
    title: 'Стас Рогозин',
    messageTime: '12 Апр 2020',
    lastMessage: 'Можно или сегодня или завтра вечером',
  },
  {
    title: 'Стас Рогозин',
    messageTime: '12 Апр 2020',
    lastMessage: 'Можно или сегодня или завтра вечером',
  },
]

export const pages: Record<string, string> = {
  [Routes.Login]: Pages.Login({}),
  [Routes.SignUp]: Pages.SignUp({}),
  [Routes.Chat]: Pages.Chat({
    chats,
  }),
  [Routes.NotFound]: Pages.Error({ code: 404, description: 'Не туда попали' }),
  [Routes.ServerError]: Pages.Error({
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
  const route = pathname

  if (Object.prototype.hasOwnProperty.call(pages, route)) {
    renderPage(pages[route])
  } else {
    renderPage(pages[Routes.NotFound])
  }
}

function renderPage(page: string) {
  const root = document.querySelector('#root')!
  root.innerHTML = Handlebars.compile(page)({})
}
