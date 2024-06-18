import { ChatsApi } from '@/shared/api'
import { type CreateChatData } from '@/shared/api'

class ChatsController {
  async getChats() {
    try {
      await ChatsApi.getChats()
    } catch (error) {
      console.log(`Error occurred while getting chats`)
    }
  }

  async createChat(data: CreateChatData) {
    try {
      await ChatsApi.createChat(data)
    } catch (error) {
      alert('Не получилось создать чат ')
    }
  }
}

export default new ChatsController()
