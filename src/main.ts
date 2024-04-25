import Handlebars from 'handlebars'
import { Login } from '@/pages/login'
import { SignIn } from '@/pages/sign-in'

document.addEventListener('DOMContentLoaded', () => {
  console.log(SignIn)
  const root = document.querySelector('#root')!
  // const signInTemplate = Handlebars.compile(SignIn())
  const loginTemplate = Handlebars.compile(Login())
  // root.innerHTML = signInTemplate({})
  root.innerHTML = loginTemplate({})
})
