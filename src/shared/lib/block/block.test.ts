import { Block } from '@/shared/lib'

class TestBlock extends Block {
  render() {
    return this.compile('<div>TestPage</div>', this.props)
  }
}

describe('Block', () => {
  let block: TestBlock

  beforeEach(() => {
    block = new TestBlock({ test: 'test' })
  })

  it('should be an instance of Block', () => {
    expect(block).toBeInstanceOf(Block)
  })

  it('should initialize with provided props', () => {
    expect(block.props.test).toBe('test')
  })

  it('should have a unique ID', () => {
    // @ts-expect-error need for test
    expect(block._id).toBeDefined()
  })

  it('should set new props', () => {
    block.setProps({ newProp: 'new' })
    expect(block.props.newProp).toBe('new')
  })

  it('should call componentDidMount on init', () => {
    const spy = jest.spyOn(block, 'componentDidMount')
    block.dispatchComponentDidMount()
    expect(spy).toHaveBeenCalled()
  })

  it('should render content', () => {
    const content = block.getContent()
    expect(content).toBeInstanceOf(HTMLDivElement)
    expect(content.innerHTML).toBe('TestPage')
  })

  it('should add events', () => {
    const spy = jest.spyOn(HTMLElement.prototype, 'addEventListener')
    const events = { click: () => jest.fn() }
    block.setProps({ events })
    block.addEvents()
    expect(spy).toHaveBeenCalledWith('click', events.click)
  })

  it('should remove events', () => {
    const spy = jest.spyOn(HTMLElement.prototype, 'removeEventListener')
    const events = { click: () => jest.fn() }
    block.setProps({ events })
    block.removeEvents()
    expect(spy).toHaveBeenCalledWith('click', events.click)
  })
})
