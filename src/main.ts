import * as Pages from '@/pages'
import AuthApi from '@/shared/api'
import { protectedRoutes, Routes } from '@/shared/config'
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

document.addEventListener('DOMContentLoaded', async () => {
  Object.entries(pages).forEach(([pathname, page]) => {
    Router.use(pathname, page)
  })

  const isRouteProtected = protectedRoutes.includes(
    window.location.pathname as Routes,
  )

  try {
    await AuthApi.getUser()
    Router.start()
    if (!isRouteProtected) {
      Router.go(Routes.SelectChat)
    }
  } catch (error) {
    console.log('hello?')
    Router.start()
    if (isRouteProtected) {
      Router.go(Routes.Login)
    }
  }
})
