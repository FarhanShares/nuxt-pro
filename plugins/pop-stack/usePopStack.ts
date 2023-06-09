/* eslint-disable no-console */
import mitt from 'mitt'

export const popStackBus = mitt()

// Interfaces & types
export type TEventNameWhitelists =
  | 'opening'
  | 'open'
  | 'opened'
  | 'closing'
  | 'close'
  | 'closed'
  | 'toggling'
  | 'toggle'
  | 'toggled'
  | 'confirmFirst'

export interface IPopStack {
  id: string
  debug: boolean
  bus: typeof popStackBus
  open(id: string): void
  close(id: string): void
  toggle(id: string): void
  shouldConfirm(id: string): void
  shouldNotConfirm(id: string): void
  getEventName(type: TEventNameWhitelists, id: string | null): string
}

export type IEventNameMap = {
  [key in TEventNameWhitelists]: string
}

/**
 * This class is for maintaining states of EdgeStack component easily
 * This is not a npm plugin, rather a local plugin for the app.
 */
export class PopStack implements IPopStack {
  public id: string = 'default'
  public debug: boolean = false
  public bus = popStackBus

  constructor() {
    this.debug && console.log({ PopStackEvents: this.bus.all })
  }

  // Emit events
  open(id: string): void {
    const e = this.getEventName('open', id)

    this.bus.emit(e)
    this.debug && console.log({ PopStackOpener: e })
  }

  close(id: string): void {
    const e = this.getEventName('close', id)

    this.bus.emit(e)
    this.debug && console.log({ PopStackCloser: e })
  }

  toggle(id: string): void {
    const e = this.getEventName('toggle', id)

    this.bus.emit(e)
    this.debug && console.log({ PopStackToggler: e })
  }

  // TODO: implement in the component
  shouldConfirm(id: string): void {
    const e = this.getEventName('confirmFirst', id)

    this.bus.emit(e, {
      confirmFirst: true,
    })
    this.debug &&
      console.log({
        PopStackConfirmFirst_Yes: e,
      })
  }

  shouldNotConfirm(id: string): void {
    const e = this.getEventName('confirmFirst', id)

    this.bus.emit(e, {
      confirmFirst: false,
    })
    this.debug &&
      console.log({
        PopStackConfirmFirst_No: e,
      })
  }

  // Get event name
  getEventName(type: TEventNameWhitelists, id: string | null = null): string {
    const prefixMap = {
      opening: 'ps-opening:',
      open: 'ps-open:',
      opened: 'ps-opened:',

      closing: 'ps-closing:',
      close: 'ps-close:',
      closed: 'ps-closed:',

      // this also emits opening, opened, closing, closed etc events
      // that is why there is no 'ps-toggle' event emitted,
      // in that time it actually calls open / close.
      // it also emits toggled event with data { to: bool, from: bool, isForced: bool }
      toggling: 'ps-toggling:',
      toggle: 'ps-toggle:',
      toggled: 'ps-toggled:',

      confirmFirst: 'ps-confirm-first:',
    }

    if (prefixMap[type]) {
      const theId = id || this.id
      return prefixMap[type].concat(theId)
    }

    this.debug && console.warn('ps-trying-to-get-unknown-event-type')
    return 'ps-trying-to-get-unknown-event-type'
  }
}

export const popStack = new PopStack()
export const usePopStack = () => popStack
