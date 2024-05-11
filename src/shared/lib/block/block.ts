import Handlebars from 'handlebars'
import { v4 as makeUUID } from 'uuid'
import { EventBus } from '@/shared/lib/event-bus'

export type BlockProps = Record<string, unknown> & {
  events?: Record<string, (event: Event) => void>
} & object

export class Block<TypeProps extends BlockProps = BlockProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  private _element: HTMLElement | null = null
  private eventBus: EventBus
  readonly props: TypeProps
  private readonly _id
  children: Record<string, Block>

  constructor(propsWithChildren: TypeProps) {
    const { children, props } = this._getChildrenAndProps(propsWithChildren)
    this.children = children
    this.props = this._makePropsProxy(props as TypeProps)
    this._id = makeUUID()
    this.eventBus = EventBus.getInstance()
    this._registerEvents()
    this.eventBus.dispatch(Block.EVENTS.INIT)
  }

  private _registerEvents() {
    this.eventBus.subscribe(Block.EVENTS.INIT, this.init.bind(this))
    this.eventBus.subscribe(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this),
    )
    this.eventBus.subscribe(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this),
    )
    this.eventBus.subscribe(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _getChildrenAndProps(propsWithChildren: TypeProps) {
    const children = {} as Record<string, Block>
    const props = {} as BlockProps
    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })
    return { props, children }
  }

  compile(template: string, props: TypeProps) {
    const propsAndStubs = { ...(props as BlockProps) }

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })

    const fragment = document.createElement('template')
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs)

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
      stub?.replaceWith(child.getContent())
    })

    return fragment.content
  }

  init() {
    this._element = this._createDocumentElement()
    this.eventBus.dispatch(Block.EVENTS.FLOW_RENDER)
  }

  private _createDocumentElement(tagName = 'div') {
    const element = document.createElement(tagName)
    element.dataset.id = this._id
    return element
  }

  private _componentDidMount() {
    this.componentDidMount()
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount()
    })
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus.dispatch(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps: TypeProps, newProps: TypeProps) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  componentDidUpdate(_oldProps: TypeProps, _newProps: TypeProps) {
    return true
  }

  setProps(nextProps: Partial<TypeProps>) {
    Object.assign(this.props, nextProps)
  }

  private _render() {
    const block = this.render() as unknown as HTMLElement
    const newElement = block.firstElementChild as HTMLElement

    this._removeEvents()

    if (this._element) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement
    this._element.dataset.id = this._id
    this._addEvents()
  }

  render() {}

  private _removeEvents() {
    const { events = {} } = this.props
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName])
    })
  }

  private _addEvents() {
    const { events = {} } = this.props
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  private _makePropsProxy(props: TypeProps) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof TypeProps]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (target, prop, value) => {
        target[prop as keyof TypeProps] = value
        this.eventBus.dispatch(Block.EVENTS.FLOW_CDU, { ...target }, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  getContent() {
    console.log(this._element)
    return this._element!
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}
