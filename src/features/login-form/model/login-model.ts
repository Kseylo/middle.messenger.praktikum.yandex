import { authApi, type LoginRequest } from '@/shared/api'
import { Routes } from '@/shared/config'
import Router from '@/shared/lib'

class LoginModel {
  async login(data: LoginRequest) {
    try {
      await authApi.login(data)
      Router.go(Routes.SelectChat)
    } catch (error) {
      console.log(`Error occurred while login`)
    }
  }
}

export default new LoginModel()
