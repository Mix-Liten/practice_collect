import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"

const CONTAINER_WIDTH = 100
const CONTAINER_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const containerElem = document.querySelector("[data-container]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

setPixelToContainerScale()
window.addEventListener("resize", setPixelToContainerScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  const collisionCactus = checkLose()
  if (collisionCactus) return handleLose(collisionCactus[0])

  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().find(([_, rect]) => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score).toString().padStart(4, 0)
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupDino()
  setupCactus()
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
}

function handleLose(cactusElem) {
  cactusElem.style.border = "1px solid"
  setDinoLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenElem.classList.remove("hide")
  }, 100)
}

function setPixelToContainerScale() {
  let containerToPixelScale
  if (window.innerWidth / window.innerHeight < CONTAINER_WIDTH / CONTAINER_HEIGHT) {
    containerToPixelScale = window.innerWidth / CONTAINER_WIDTH
  } else {
    containerToPixelScale = window.innerHeight / CONTAINER_HEIGHT
  }

  containerElem.style.width = `${CONTAINER_WIDTH * containerToPixelScale}px`
  containerElem.style.height = `${CONTAINER_HEIGHT * containerToPixelScale}px`
}
