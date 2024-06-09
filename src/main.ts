import * as Pages from '@/pages'
import { type Page, Router } from '@/shared/lib/router'

enum Routes {
  Login = '/',
  SignUp = '/sign-up',
  SelectChat = '/chat',
  Chat = '/chat-feed',
  Profile = '/profile',
  Account = '/account',
  NotFound = '/not-found',
  ServerError = '/server-error',
}

const pages: Record<Routes, Page> = {
  [Routes.Login]: { block: Pages.Login },
  [Routes.SignUp]: { block: Pages.SignUp },
  [Routes.SelectChat]: { block: Pages.SelectChat },
  [Routes.Chat]: { block: Pages.Chat },
  [Routes.Account]: { block: Pages.Account },
  [Routes.Profile]: { block: Pages.Profile },
  [Routes.NotFound]: {
    block: Pages.Error,
    props: { code: 404, description: 'Не туда попали' },
  },
  [Routes.ServerError]: {
    block: Pages.Error,
    props: { code: 500, description: 'Мы уже фиксим' },
  },
}

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#root')
  Object.entries(pages).forEach(([pathname, page]) => {
    router.use(pathname, page)
  })

  router.start()
})
