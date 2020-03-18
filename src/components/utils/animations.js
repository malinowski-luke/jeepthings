export function slideDown(id) {
  const slidedownForm = document.getElementById(id)
  if (slidedownForm) {
    if (id === 'login')
      slidedownForm.style.animation = 'slideDownLogin 0.5s ease-out forwards'
    else slidedownForm.style.animation = 'slideDown 0.5s ease-out forwards'
    slidedownForm.classList.add('fade-in')
  }
}
