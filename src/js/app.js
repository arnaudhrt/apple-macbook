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
let currentPercentScroll = 0
let nextPercentScroll = 0

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
   nextPercentScroll = 100 - ((rect.top + rect.height - window.innerHeight) / (rect.height - window.innerHeight)) * 100

   figures.forEach((el) => {
      el.classList.toggle('active', nextPercentScroll > 80)
   })
}

window.addEventListener('resize', onResize)
window.addEventListener('scroll', onScroll)

function preloadImage(url) {
   const img = new Image()
   img.src = url
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

   currentPercentScroll = lerp(currentPercentScroll, nextPercentScroll, 0.08)
   currentFrameIndex = Math.round(mapRange(0, 80, 0, 86, currentPercentScroll))

   if (lastFrame != currentFrameIndex && currentFrameIndex >= 0 && currentFrameIndex <= 86) {
      ctx.drawImage(images[currentFrameIndex], 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
      lastFrame = currentFrameIndex
   }
}

onResize()
requestAnimationFrame(animate)

const lerp = (current, next, amount) => {
   amount = amount < 0 ? 0 : amount
   amount = amount > 1 ? 1 : amount
   return current + (next - current) * amount
}

// Animation Macbook closed

const macbookClosedWrapper = document.querySelector('.animated-macbook-closed')
const leftSide = document.querySelector('.left-side')
const rightSide = document.querySelector('.right-side')

window.addEventListener('scroll', (e) => {
   const rect = macbookClosedWrapper.getBoundingClientRect()
   // let scrollPos = Math.round(((window.innerHeight - rect.top) / window.innerHeight) * 100) - 250
   let scrollPos = Math.round(rect.bottom - innerHeight)
   let neg =- scrollPos
   console.log(neg)
   if (neg > -275 && neg < 0 ) {
      leftSide.style.left = `${neg}px`
      rightSide.style.right = `${neg}px`
   } else if (neg >= 0) {
      leftSide.style.left = `0%`
      rightSide.style.right = `0%`
   }
})

