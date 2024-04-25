import Handlebars from 'handlebars'
import { Login } from '@/pages/login'
import { SignIn } from '@/pages/sign-in'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')!
  const button = Handlebars.compile(Login())
  root.innerHTML = button({})
})
