import { ChatsApi } from '@/shared/api'

class ChatsController {
  async getChats() {
    try {
      await ChatsApi.getChats()
    } catch (error) {
      console.log(`Error occurred while getting chats`)
    }
  }
}

export default new ChatsController()
