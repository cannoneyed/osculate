import sequencerDOMStore from 'core/stores/sequencer/dom'
import sequencerViewStore from 'core/stores/sequencer/view'
import minimapInteractionStore from 'core/interactions/minimap'

import { getNextScrollPercentX } from './helpers'

export function registerHandlers() {
  const { minimap, minimapScroll } = sequencerDOMStore
  if (minimap && minimapScroll) {
    minimapScroll.onmousedown = (mouseDown: MouseEvent) => {
      let lastX = mouseDown.pageX
      minimapInteractionStore.setIsDragging(true)

      function mouseMove(mouseMove: MouseEvent): void {
        if (!minimap || !minimapScroll) {
          return
        }
        const deltaX = mouseMove.pageX - lastX
        lastX = mouseMove.pageX

        const nextScrollPercentX = getNextScrollPercentX(deltaX)
        sequencerViewStore.setTracksScroll({ x: nextScrollPercentX })
      }

      function mouseUp(mouseUp: MouseEvent): void {
        minimapInteractionStore.setIsDragging(false)
        removeEventHandlers()
      }

      function removeEventHandlers() {
        window.removeEventListener('mouseup', mouseUp)
        window.removeEventListener('mousemove', mouseMove)
      }

      function addEventHandlers() {
        window.addEventListener('mouseup', mouseUp)
        window.addEventListener('mousemove', mouseMove)
      }

      mouseDown.stopPropagation()
      mouseDown.preventDefault()
      addEventHandlers()
    }
  }
}