export function slideDown(id) {
  const slidedownElement = document.getElementById(id)
  if (slidedownElement) {
    if (id === 'login')
      slidedownElement.style.animation = 'slideDownLogin 0.5s ease-out forwards'
    else slidedownElement.style.animation = 'slideDown 0.5s ease-out forwards'
    slidedownElement.classList.add('fade-in')
  }
}

export function slideDownPopup(id) {
  const popup = document.getElementById(id)
  if (popup) popup.style.animation = 'slideDownPopup 0.5s ease-out forwards'
}

export function fadeInPopupBackground(id) {
  const popupBackground = document.getElementById(id)
  if (popupBackground) popupBackground.classList.add('fade-in')
}

export function fadeOutPopupBackground(id) {
  const popupBackground = document.getElementById(id)
  popupBackground.classList.remove('fade-in')
  popupBackground.classList.add('fade-out')
}
