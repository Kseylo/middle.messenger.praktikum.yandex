import { store } from '@/shared/lib'

export class LoginModel {
  static login() {
    store.setState('login', {
      login: 'test',
      password: 'test',
    })
  }
}
