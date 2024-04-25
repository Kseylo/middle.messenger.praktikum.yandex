import Handlebars from 'handlebars'
import { SignIn } from './pages/sign-in'
import { Button } from './shared/ui'

const source = `
  <div class="entry">
    <h1>{{title}}</h1>
    <div class="body">
      {{body}}
    </div>
  </div>`

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')!
  const template = Handlebars.compile(source)
  console.log(template({ title: 'Hello', body: 'World' }))
  root.innerHTML = template({ title: 'Hello', body: 'World' })
})
