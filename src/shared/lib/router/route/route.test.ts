import { Block } from '@/shared/lib'
import { Route } from './route'

class TestPage extends Block {
  render() {
    return this.compile('<div>TestPage</div>', this.props)
  }
}

describe('Route', () => {
  const rootQuery = '#root'
  let root: HTMLElement
  let route: Route

  beforeEach(() => {
    root = document.createElement('div')
    root.id = 'root'
    document.body.append(root)

    route = new Route('/', { block: TestPage }, { rootQuery })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should create a new route instance', () => {
    expect(route).toBeInstanceOf(Route)
  })

  it('should match the pathname', () => {
    expect(route.match('/')).toBeTruthy()
    expect(route.match('/test')).toBeFalsy()
  })

  it('should render the page', () => {
    route.render()
    expect(root.innerHTML).toBe('<div>TestPage</div>')
  })

  it('should navigate to a new pathname', () => {
    const spy = jest.spyOn(route, 'render')
    route.navigate('/')
    expect(spy).toHaveBeenCalled()
    expect(route.match('/')).toBeTruthy()
  })
})
