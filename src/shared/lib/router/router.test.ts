import { describe } from 'node:test'
import { Block } from '@/shared/lib'
import { Route } from './route'
import { Router } from './router'

class TestPage extends Block {
  render() {
    return this.compile('<div>TestPage</div>', this.props)
  }
}

describe('Router', () => {
  const rootQuery = '#root'
  let root: HTMLElement
  let router: Router

  beforeEach(() => {
    document.body.innerHTML = ''
    root = document.createElement('div')
    root.id = rootQuery.slice(1)
    router = new Router(rootQuery)

    // @ts-expect-error - I need to manually clear private _routes,
    // because new Router each time return same instance of router
    router._routes = []
    // @ts-expect-error - I need to manually clear private _currentRoute,
    // because new Router each time return same instance of router
    router._currentRoute = null
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be instance of Router', () => {
    expect(router).toBeInstanceOf(Router)
  })

  it('should create a new route', () => {
    router.use('/test', { block: TestPage })
    const route = router.getRoute('/test')
    expect(route).toBeInstanceOf(Route)
  })

  it('should navigate to a new route', () => {
    router.use('/test', { block: TestPage })
    router.start()
    router.go('/test')
    expect(window.location.pathname).toBe('/test')
  })

  it('should return undefined is route not found', () => {
    router.start()
    router.go('/not-exist')
    const route = router.getRoute('/not-exist')
    expect(route).toBeUndefined()
  })

  it('should return route if exist', () => {
    router.use('/test', { block: TestPage })
    router.start()
    const route = router.getRoute('/test')
    expect(route).toBeDefined()
  })
})
