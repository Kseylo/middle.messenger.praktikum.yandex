import * as Pages from '@/pages'
import { protectedRoutes, Routes } from '@/shared/config'
import { AuthController } from '@/shared/controllers'
import Router, { type Page } from '@/shared/lib/router'

const pages: Record<Routes, Page> = {
  [Routes.Login]: { block: Pages.Login },
  [Routes.SignUp]: { block: Pages.SignUp },
  [Routes.Messenger]: { block: Pages.MessengerPage },
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
    await AuthController.getUser()
    Router.start()
    if (!isRouteProtected) {
      Router.go(Routes.Messenger)
    }
  } catch (error) {
    Router.start()
    if (isRouteProtected) {
      Router.go(Routes.Login)
    }
  }
})
