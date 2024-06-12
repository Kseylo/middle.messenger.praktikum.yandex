import * as Pages from '@/pages'
import { Routes } from '@/shared/config'
import Router, { type Page } from '@/shared/lib/router'

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
console.log(Router)
document.addEventListener('DOMContentLoaded', () => {
  Object.entries(pages).forEach(([pathname, page]) => {
    Router.use(pathname, page)
  })

  Router.start()
})
