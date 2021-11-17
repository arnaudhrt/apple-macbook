const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const img = new Image()

img.src = 'animation_images/large_0000.jpg'
img.onload = function () {
   ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
}

function onResize() {
   canvas.width = canvas.getBoundingClientRect().width
   canvas.height = canvas.getBoundingClientRect().height
   ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
}

window.addEventListener('resize', onResize)

onResize()

let counter = 0

function preloadImage(url) {
   const img = new Image()
   img.src = url
   img.onload = () => {
      console.log(counter++)
   }
   return img
}

function preloadImages() {
  const images = []
   for (let i = 0; i < 86; i++) {
      if (i < 10) {
         images[i] = preloadImage(`animation_images/large_000${i}.jpg`)
      } else {
         images[i] = preloadImage(`animation_images/large_00${i}.jpg`)
      }
   }
   return images
}

const images = preloadImages()

let stop = false
let frameCount = 0
let fps, fpsInterval, startTime, now, then, elapsed
let currentImage = 0

// initialize the timer variables and start the animation

function startAnimating(fps) {
   fpsInterval = 1000 / fps
   then = Date.now()
   startTime = then
   animate()
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved

function animate() {
   // request another frame

   requestAnimationFrame(animate)

   // calc elapsed time since last loop

   now = Date.now()
   elapsed = now - then

   // if enough time has elapsed, draw the next frame

   if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval)


      ctx.drawImage(images[currentImage++ % 86], 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
      // Put your drawing code here
   }
}

startAnimating(24)