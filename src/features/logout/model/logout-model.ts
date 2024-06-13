import AuthApi from '@/shared/api'
import { Routes } from '@/shared/config'
import Router from '@/shared/lib'

class LogoutModel {
  async logout() {
    try {
      await AuthApi.logout()
      Router.go(Routes.Login)
    } catch (error) {
      console.log(`Error occurred while logout`)
    }
  }
}

export default new LogoutModel()
