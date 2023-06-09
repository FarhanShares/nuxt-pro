Usage:

```ts
import { useToastStack } from '~/plugins/toast-stack'
useToastStack({ title: 'Test title', message: 'Hello there!' })
```

Use variants

```ts
import { useToastStack } from '~/plugins/toast-stack'
useToastStack({ title: 'Test title!', type: 'warning' })
```

Toast Options:

```ts
type ToastStack = {
  title: string
  message?: string
  //
  type?: ToastTypes
  timeout?: number
  position?: ToastPositions
  progressBar?: boolean
  //
  primaryAction?: string
  secondaryAction?: string
  onPrimaryAction?: VoidFunction
  onSecondaryAction?: VoidFunction
  //
  icon?: boolean
  closeButton?: boolean
  closeOnClick?: boolean
  pauseOnHover?: boolean
  pauseOnFocusLoss?: boolean
}
```

TODO: implement actions UI
action props // UI has not implemented yet
/----------------------------
Toast title
Toast message here

action 1 action 2
/---------------------------
primaryAction: string
secondaryAction: string
onPrimaryAction: () => {}
onSecondaryAction: () => {}
actionsPlacement: 'left' | 'right'
