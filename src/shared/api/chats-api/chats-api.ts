import { BaseAPI } from '../base-api'

export interface CreateChatData {
  title: string
}

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
}

export default new ChatsApi()
