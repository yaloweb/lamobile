function getCurrentInnerHeight () {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

getCurrentInnerHeight()

window.addEventListener('resize', getCurrentInnerHeight)
