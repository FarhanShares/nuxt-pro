type TUseSticky = {
  el: HTMLElement
  offset: number
  className: string
  pseudoElementHeight: number
}

export const useSticky = (
  {
    el,
    offset,
    className = 'sticky',
    pseudoElementHeight = 0,
  } = {} as TUseSticky
) => {
  let eventEncountered = 0
  const pseudoElement = document.createElement('div')
  pseudoElement.style.height = `${pseudoElementHeight}px`

  const onScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop > offset) {
      el.classList.add(className)
      eventEncountered++
      eventEncountered === 1 && el.before(pseudoElement)
    } else {
      el.classList.remove(className)
      if (eventEncountered > 0) {
        eventEncountered = 0
        pseudoElement.remove()
      }
    }
  }

  // lifecycle hooks
  window.addEventListener('scroll', onScroll)
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return {
    onScroll,
  }
}
