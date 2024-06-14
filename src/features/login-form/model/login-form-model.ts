import { AuthApi, type LoginRequest } from '@/shared/api'
import { Routes } from '@/shared/config'
import Router from '@/shared/lib'

class LoginFormModel {
  async login(data: LoginRequest) {
    try {
      await AuthApi.login(data)
      Router.go(Routes.SelectChat)
    } catch (error) {
      console.log(`Error occurred while login`)
    }
  }
}

export default new LoginFormModel()
