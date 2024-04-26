import Handlebars from 'handlebars'
import HandlebarsRuntime from 'handlebars/runtime'
import { Error } from '@/pages/error'
import { Login } from '@/pages/login'
// import { SignIn } from '@/pages/sign-in'
import * as UI from '@/shared/ui'

Object.entries(UI).forEach(([name, partial]) =>
  HandlebarsRuntime.registerPartial(name, partial),
)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')!
  // const signInTemplate = Handlebars.compile(SignIn())
  // const loginTemplate = Handlebars.compile(Login())
  const errorTemplate = Handlebars.compile(
    Error({
      code: 404,
      description: 'Страница не найдена',
    }),
  )
  // root.innerHTML = signInTemplate({})
  // root.innerHTML = loginTemplate({})
  root.innerHTML = errorTemplate({})
})
