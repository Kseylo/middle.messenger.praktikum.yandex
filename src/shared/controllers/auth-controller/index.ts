import { AuthApi } from '@/shared/api'
import type { LoginRequest, SignUpRequest, User } from '@/shared/config'
import { Routes } from '@/shared/config'
import { Router, Store } from '@/shared/lib'

class AuthController {
  async signUp(data: SignUpRequest) {
    try {
      await AuthApi.signup(data)
      await this.getUser()
      Router.go(Routes.Messenger)
    } catch (error) {
      if (error instanceof XMLHttpRequest && error.status === 409) {
        alert('Пользователь с таким логином уже существует')
      }
      console.log(`Error occurred while signup`)
    }
  }

  async login(data: LoginRequest) {
    try {
      await AuthApi.login(data)
      await this.getUser()
      Router.go(Routes.Messenger)
    } catch (error) {
      console.log(`Error occurred while login`)
    }
  }

  async logout() {
    try {
      await AuthApi.logout()
      Router.go(Routes.Login)
    } catch (error) {
      console.log(`Error occurred while logout`)
    }
  }

  async getUser() {
    const { response } = await AuthApi.getUser()
    Store.setState('user', JSON.parse(response) as User)
  }
}

export default new AuthController()
