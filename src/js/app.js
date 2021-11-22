import { mapRange } from './utils'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const img = new Image()
const sectionAnimationScroll = document.querySelector('.animated-macbook')
const images = preloadImages()
const figures = document.querySelectorAll('.figure')

let currentFrameIndex = 0
let lastFrame = 0
let counter = 0

img.src = 'animation_images/large_0000.jpg'
img.onload = function () {
   ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
}

function onResize() {
   canvas.width = canvas.getBoundingClientRect().width
   canvas.height = canvas.getBoundingClientRect().height
   ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
}

function onScroll() {
   const rect = sectionAnimationScroll.getBoundingClientRect()
   const percentScroll = 100 - ((rect.top + rect.height - window.innerHeight) / (rect.height - window.innerHeight)) * 100
   currentFrameIndex = Math.round(mapRange(0, 80, 0, 86, percentScroll))
   figures.forEach((el) => {
      el.classList.toggle('active', percentScroll > 80)
   })
}

window.addEventListener('resize', onResize)
window.addEventListener('scroll', onScroll)

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

function animate() {
   requestAnimationFrame(animate)
   if (lastFrame != currentFrameIndex && currentFrameIndex >= 0 && currentFrameIndex <= 86) {
      ctx.drawImage(images[currentFrameIndex], 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
      lastFrame = currentFrameIndex
   }
}

onResize()
requestAnimationFrame(animate)
