import { usePopStack } from '~~/plugins/pop-stack'
export type ModalScreen = 'auth' | 'example'
export type ModalAnimation =
  | 'fade'
  | 'zoom'
  | 'door'
  | 'flip'
  | 'rotate'
  | 'shake'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'slideUp'
  | undefined
export const MODAL_DEFAULT_ANIMATION = 'fade'

export const useAppModal = () => {
  const _key = 'app.modal.component'
  const _state = useState<boolean>('app.modal.state', () => false) // is it open or closed?
  const _screen = useState<ModalScreen>('app.modal.screen', () => 'auth') // the active screen name
  const _animation = useState<ModalAnimation>( // the animation name for modal
    'app.modal.animation',
    () => MODAL_DEFAULT_ANIMATION
  )

  type Open = {
    screen?: ModalScreen
    animation?: ModalAnimation
  }
  const open = (opt = {} as Open) => {
    opt.screen && screen(opt.screen)
    opt.animation && animate(opt.animation)

    _state.value = true
    usePopStack().open(_key)
  }

  type Close = {
    resetAnimation?: boolean
  }
  const close = (opt = { resetAnimation: true } as Close) => {
    typeof opt.resetAnimation === 'boolean' && animate(MODAL_DEFAULT_ANIMATION)

    _state.value = false
    usePopStack().close(_key)
  }
  const screen = (name: ModalScreen) => (_screen.value = name) // set screen name
  const animate = (name: ModalAnimation) => (_animation.value = name) // set animation name

  return {
    open,
    close,
    screen,
    animate,
    get name() {
      return _screen.value
    },
    get state() {
      return _state.value
    },
    get animation() {
      return _animation.value
    },
  }
}
