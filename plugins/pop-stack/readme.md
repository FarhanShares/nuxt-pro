# PopStack Plugin

**Description: A highly customizable & flexible Higher Order Component (HOC) for Popups with Composition API, Superb control and a handful of features.**

**Author: Farhan Israq <farhan.israq.bd@gmial.com>**

# PopStack Docs & User Guide

**Having a state is optional but highly recommended:**
`const modalState = ref(false) // initial state`

Then you are good to go with your modal with as minimum as this after importing the component (_importing component is optional but highly recommended_ to get better IDE integration)

```jsx
<PopStack id="helloPopStack" v-model="modalState" @close="modalState = false">
    Hello from PopStack!
</PopStack>
```

## You can use popstack Composition API to control the PopStack from anywhere in the target scope.

```ts
const popStack = usePopStack()

popStack.open('helloPopStack')
popStack.close('helloPopStack')
popStack.toggle('helloPopStack')
```

## Behind the scene we use event bus (using mitt) so a handful of events are emitted that you can listen to as well and intercept. E.g.

`popStack.bus.on(popStack.getEventName('opening', 'helloPopStack'), () => {})`

## The bus events are as follows (sequentially emitted for each actions)

### Action: Open

- opening
- open
- opened

### Action: Close

- closing
- close
- closed

### Action: Toggle

- toggling
  - opening, open, opened
  - closing, close, closed
- toggled

**See the PopStack.vue -> control() function : bufferTimes object to get the timing.**

## Props

```typescript
  id: string
  modelValue?: boolean
  debug?: boolean
  width?: number | 'auto'
  height?: number | 'auto'
  sizeUnit?: 'px' | 'pt' | 'em' | 'rem'
  animation?:
    | false
    | 'door'
    | 'fade'
    | 'flip'
    | 'rotate'
    | 'shake'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'slideUp'
    | 'zoom'
  animationDuration?: number
  mask?: boolean // overlay
  closeButton?: boolean
  closeOnPressEsc?: boolean
  closeOnClickMask?: boolean
  customClass?: string
  customStyle?: CSSProperties
  customMaskClass?: string
  customMaskStyle?: CSSProperties
  customBodyClass?: string
  customBodyStyle?: CSSProperties
}
```

# Events

- `@close -> ` emitted when clicked on close button (no close action is actually been made inside the component, you need to handle what happens when clicked on close button. E.g. `@close="onCloseModal"`)

- `@update:modelValue -> ` emitted each time the state is changed
