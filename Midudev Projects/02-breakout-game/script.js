const canvas = document.querySelector('canvas')
// Give canvas the context how we will draw
const ctx = canvas.getContext('2d')

canvas.width = 448
canvas.height = 400


/* This function will be called al the time */
function draw () {

    // Se ejecuta justo antes de que se repinte la ventana
    // Cuando termina programa el siguiente
    window.requestAnimationFrame(draw) // 60fps
}

draw()
