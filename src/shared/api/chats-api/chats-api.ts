import type { AddUser, CreateChatData, DeleteUser } from '@/shared/config'
import { BaseAPI } from '../base-api'

class ChatsApi extends BaseAPI {
  constructor() {
    super('chats')
  }

  getChats() {
    return this.http.get('')
  }

  createChat(data: CreateChatData) {
    return this.http.post('', { data })
  }

  deleteUser(data: DeleteUser) {
    const { chatId, users } = data
    return this.http.delete('/users', {
      data: {
        chatId,
        users,
      },
    })
  }

  addUser(data: AddUser) {
    const { chatId, users } = data
    return this.http.put('/users', {
      data: {
        chatId,
        users,
      },
    })
  }
}

export default new ChatsApi()
