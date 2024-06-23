import { HTTPTransport } from '@/shared/lib'

const BASE_URL = 'https://ya-praktikum.tech/api/v2'
export const RESOURCES_URL = `${BASE_URL}/resources`

export class BaseAPI {
  protected http: HTTPTransport

  constructor(endpoint: string) {
    this.http = new HTTPTransport(`${BASE_URL}/${endpoint}`)
  }
}
