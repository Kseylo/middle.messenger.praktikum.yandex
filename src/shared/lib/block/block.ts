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
  private _eventBus: EventBus
  private readonly _id
  readonly props: TypeProps
  children: Record<string, Block>

  constructor(propsWithChildren: TypeProps) {
    this._id = makeUUID()
    const { props, children } = this._getChildrenAndProps(propsWithChildren)
    this.props = this._makePropsProxy({
      ...props,
      _id: this._id,
    } as unknown as TypeProps)
    this.children = children

    this._eventBus = EventBus.getInstance()
    this._registerEvents()
    this._eventBus.dispatch(Block.EVENTS.INIT)
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

  private _makePropsProxy(props: TypeProps) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop as keyof TypeProps]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (target, prop, value) => {
        const prevProps = { ...target }
        target[prop as keyof TypeProps] = value
        this._eventBus.dispatch(Block.EVENTS.FLOW_CDU, prevProps, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  private _registerEvents() {
    this._eventBus.subscribe(Block.EVENTS.INIT, this.init.bind(this))
    this._eventBus.subscribe(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this),
    )
    this._eventBus.subscribe(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this),
    )
    this._eventBus.subscribe(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  compile(template: string, props: TypeProps) {
    const propsAndStubs = { ...(props as BlockProps) }
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })

    const fragment = this._createDocumentElement(
      'template',
    ) as HTMLTemplateElement
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs)

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
      stub?.replaceWith(child.getContent())
    })

    return fragment.content
  }

  init() {
    this._element = this._createDocumentElement()
    this._eventBus.dispatch(Block.EVENTS.FLOW_RENDER)
  }

  private _componentDidMount() {
    this.componentDidMount()
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount()
    })
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus.dispatch(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps: TypeProps, newProps: TypeProps) {
    const isComponentDidUpdate = this.componentDidUpdate(oldProps, newProps)
    if (isComponentDidUpdate) {
      this._eventBus.dispatch(Block.EVENTS.FLOW_RENDER)
    }
  }

  componentDidUpdate(oldProps: TypeProps, newProps: TypeProps) {
    return oldProps !== newProps
  }

  private _render() {
    const block = this.render() as unknown as HTMLElement
    const newElement = block.firstElementChild as HTMLElement
    this._removeEvents()

    if (this._element) {
      this._element.replaceWith(newElement)
      this._element = newElement
    }

    this._addEvents()
  }

  render() {}

  private _createDocumentElement(tagName = 'div') {
    const element = document.createElement(tagName)
    element.dataset.id = this._id
    return element
  }

  setProps(nextProps: TypeProps) {
    Object.assign(this.props, nextProps)
  }

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

  getContent() {
    return this._element!
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}
