import * as Pages from '@/pages'
import { Block, BlockProps } from '@/shared/lib/block'

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

interface Page<Props extends BlockProps = BlockProps> {
  component: new (props: Props) => Block<Props>
  props?: Props
}

const pages: Record<Routes, Page> = {
  [Routes.Login]: { component: Pages.Login },
  [Routes.SignUp]: { component: Pages.SignUp },
  [Routes.SelectChat]: { component: Pages.SelectChat },
  [Routes.Chat]: { component: Pages.Chat },
  [Routes.Account]: { component: Pages.Account },
  [Routes.Profile]: { component: Pages.Profile },
  [Routes.NotFound]: {
    component: Pages.Error,
    props: { code: 404, description: 'Не туда попали' },
  },
  [Routes.ServerError]: {
    component: Pages.Error,
    props: { code: 500, description: 'Мы уже фиксим' },
  },
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

function renderPage(page: Page) {
  const root = document.querySelector('#root')!
  root.innerHTML = ''
  const pageProps = page.props || {}
  root.append(new page.component(pageProps).getContent())
}
