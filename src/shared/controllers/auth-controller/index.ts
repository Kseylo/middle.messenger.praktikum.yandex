import { AuthApi, type LoginRequest, SignUpRequest } from '@/shared/api'
import { Routes } from '@/shared/config'
import { Router, Store } from '@/shared/lib'

class AuthController {
  async signUp(data: SignUpRequest) {
    try {
      await AuthApi.signup(data)
      Router.go(Routes.SelectChat)
    } catch (error) {
      console.log(`Error occurred while signup`)
    }
  }

  async login(data: LoginRequest) {
    try {
      await AuthApi.login(data)
      Router.go(Routes.SelectChat)
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
    const user = await AuthApi.getUser()
    Store.setState('user', user)
  }
}

export default new AuthController()
