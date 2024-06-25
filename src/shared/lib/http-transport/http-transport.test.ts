import { HTTPTransport } from './http-transport'

describe('HttpTransport', () => {
  const endpoint = 'https://jsonplaceholder.typicode.com'
  let http: HTTPTransport

  beforeEach(() => {
    http = new HTTPTransport(endpoint)
  })

  it('should be instance of HTTPTransport', () => {
    expect(http).toBeInstanceOf(HTTPTransport)
  })

  it('should GET request correctly', async () => {
    const { responseText } = await http.get('/posts/1')
    const post = JSON.parse(responseText).id
    expect(post).toEqual(1)
  })

  it('should POST request correctly', async () => {
    const { responseText } = await http.post('/posts', {
      data: { title: 'foo', body: 'bar', userId: 1 },
    })
    const post = JSON.parse(responseText)
    expect(post).toEqual({ title: 'foo', body: 'bar', userId: 1, id: 101 })
  })

  it('should PUT request correctly', async () => {
    const { responseText } = await http.put('/posts/1', {
      data: { id: 1, title: 'foo', body: 'bar', userId: 1 },
    })
    const post = JSON.parse(responseText)
    expect(post).toEqual({ id: 1, title: 'foo', body: 'bar', userId: 1 })
  })

  it('should DELETE request correctly', async () => {
    const { responseText } = await http.delete('/posts/1')
    expect(JSON.parse(responseText)).toEqual({})
  })
})
