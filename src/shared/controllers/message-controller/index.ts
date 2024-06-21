import { IChat, User } from '@/shared/config'
import { WSTransport } from '@/shared/lib'

class MessageController {
  private _ws: WSTransport | null = null

  async connect(token: string, userId: User['id'], chatId: IChat['id']) {
    this._ws = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
    )
    await this._ws.connect()
  }

  sendMessage(message: string) {
    if (!this._ws) {
      throw new Error(`Chat is not connected`)
    }
    this._ws.send({ type: 'message', content: message })
  }

  disconnect() {
    this._ws?.disconnect()
  }
}

export default new MessageController()
