export type Indexed<T = unknown> = {
  [k in string]: T
}

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  phone: string
  login: string
  avatar: string | null
  email: string
}

export interface CreateChatData {
  title: string
}

export interface IChat {
  id: number
  title: string
  avatar: string | null
  created_by: number
  unread_count: number
  last_message: string | null
}

export interface LoginRequest {
  login: string
  password: string
}

export interface SignUpRequest {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  password: string
}

export interface ChangePasswordData {
  oldPassword: string
  newPassword: string
}

export type UpdateProfileData = Omit<User, 'id' | 'avatar'>

export interface DeleteUser {
  chatId: IChat['id']
  users: Array<User['id']>
}

export interface AddUser {
  chatId: IChat['id']
  users: Array<User['id']>
}
