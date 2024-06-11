const DECISION_THRESHOLD = 75
let isAnimating = false
let pullDeltaX = 0 // Distance that the card is being dragged

function startDrag (event) {
    if (isAnimating) return 

    // Get the first article element 
    const actualCard = event.target.closest('article')

    if (!actualCard) return

    // Get initial position of mouse or finger
    const startX = event.pageX ?? event.touches[0].pageX

    // Listen the mouse and touch movements
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)

    document.addEventListener('touchmove', onMove, {passive: true})
    document.addEventListener('touchend', onEnd, {passive: true})

    function onMove (event) {
        // Get current position
        const currentX = event.pageX ?? event.touches[0].pageX
    
        // The distance between the initial and current position
        pullDeltaX = currentX - startX
    
        // No move
        if (pullDeltaX === 0) return 

        // Change the flag to indicate that animation started
        isAnimating = true
        // Calculate the rotation of the card using the distance
        const deg = pullDeltaX / 14
        // Apply transformation to the card
        actualCard.style.transform = `translate(${pullDeltaX}px) 
        rotate(${deg}deg)`
        actualCard.style.cursor = 'grabbing'

        // Change opacity of the choice 
        const opacity = Math.abs(pullDeltaX) / 100
        const isRight = pullDeltaX > 0

        const choiceEl = isRight
            ? actualCard.querySelector('.choice.like')
            : actualCard.querySelector('.choice.nope')
        choiceEl.style.opacity = opacity
    }

    function onEnd (event) {
        // Remove the event listeners
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onEnd)
        document.removeEventListener('touchmove', onMove)
        document.removeEventListener('touchend', onEnd)
    
        // Does the user took a decision?
        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD
        if (decisionMade) {
            const goRight = pullDeltaX >= 0
            const goLeft = !goRight
    
            // Add class according to the decision
            actualCard.classList.add(goRight ? 'go-right' : 'go-left')
            // We don't care about the card anymore
            actualCard.addEventListener('transtionend', () => {
                actualCard.remove()
            }, {once: true}) // Modifier only suscribe once
        } else {
            actualCard.classList.add('reset')
            actualCard.classList.remove('go-right', 'go-left')
            actualCard.querySelector('.choice').forEach(el => {
                el.style.opacity = 0
            })
        }

        // Reset the variables
        actualCard.addEventListener('transitionend', () => {
            actualCard.removeAttribute('style')
            actualCard.classList.remove('reset')
            
            pullDeltaX = 0
            isAnimating = false
        })
    }
}

document.addEventListener('mousedown', startDrag)
// Ignoring event 
document.removeEventListener('touchstart', startDrag, {passive: true})
