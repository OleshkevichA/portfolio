import obj from './translate.js';

let langStorage = 'en';
let themeStorage = 'light';
let hamburger = document.querySelector('#hamburger');
let navMenu = document.querySelector('#nav-menu');
let navItem = document.querySelectorAll('.nav-item');
const portfolioBtns = document.querySelector('.portfolio-buttons');
const portfolioImages = document.querySelectorAll('.image-item');
const portfolioBtnsChanged = document.querySelectorAll('.btn-black');
const langBtns = document.querySelectorAll('label.nav-leng-style');
const langChecked = document.querySelectorAll('.nav-leng-diss');
const theme = document.querySelector('.theme');
const lightThemes = document.querySelectorAll('.light-theme');
const portfolioBtn = document.querySelectorAll('.btn-black');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.querySelector('body');
const hero = document.querySelector('.section-hero-name');
const heroMerch = document.querySelector('.section-hero-merch');
const superButtons = document.querySelectorAll('.btn-gold');

window.addEventListener('load', getLocalStorage)
hamburger.addEventListener('click', toggleMenu);
portfolioBtns.addEventListener('click', changeImage);
portfolioBtnsChanged.forEach(elem => elem.addEventListener('click', changeBtn));
langBtns.forEach(elem => elem.addEventListener('click', getLang));
theme.addEventListener('click', getChangedTheme);
superButtons.forEach(elem => elem.addEventListener('click', getSuperButton));
window.addEventListener('beforeunload', setLocalStorage);

const seasons = ['winter', 'spring', 'summer', 'autumn'];
// preload Images
function preloadImages() {
  seasons.forEach( season => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${season}/${i}.jpg`;
    }
  })
}
preloadImages();
// set Local Storages
function setLocalStorage(){
  localStorage.setItem('lang', langStorage);
  localStorage.setItem('theme', themeStorage)
}
// get Local Storages
function getLocalStorage() {
  if(localStorage.getItem('lang')) {
    langStorage = localStorage.getItem('lang');
    getTranslate(langStorage);
  }
  if(localStorage.getItem('theme')) {
    themeStorage = localStorage.getItem('theme');
    setTheme(themeStorage);
  }
}
// get Language
function getLang(event){
  const chosenLang = event.target.textContent;
  getTranslate(chosenLang);
}
// set Theme
function setTheme(themeStorage){
  if (themeStorage === 'light'){
    getChangedTheme();
  }
}
// open Menu
function toggleMenu(){
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
}
// close Menu
function closeMenu(event){
  if (event.target.classList.contains('nav-link')){
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
  }
}
for (let elem of navItem){
  elem.addEventListener('click', closeMenu);
}
// change Images
function changeImage (event){
  if (event.target.classList.contains('btn-black')){
    portfolioImages.forEach( (img, index) =>  img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
  }
}
// change Buttons
function changeBtn (event) {
  portfolioBtnsChanged.forEach(elem => elem.classList.remove('btn-active'));
  event.target.classList.add('btn-active');
}
// change Language 
function getTranslate(enteredLang){
  if (enteredLang === 'ru'){
    const rus = document.querySelector('#rus');
    const eng = document.querySelector('#eng');
    rus.checked = true;
    eng.checked = false;
  }
  const elemToTrans = document.querySelectorAll('[data-obj]');
  elemToTrans.forEach( (elem) => elem.placeholder? elem.placeholder = (obj[enteredLang][elem.dataset.obj]) : elem.textContent = (obj[enteredLang][elem.dataset.obj]));
  langStorage = enteredLang;
}
// change Theme
function getChangedTheme (){
  theme.classList.toggle('light');
  if (theme.classList.contains('light')){
    themeStorage = 'light';
  }
  else themeStorage = 'dark';
  lightThemes.forEach(elem => elem.classList.toggle('light'));
  portfolioBtn.forEach(elem => elem.classList.toggle('light'));
  navMenu.classList.toggle('light');
  hamburger.classList.toggle('light');
  navLinks.forEach(elem => elem.classList.toggle('light'));
  body.classList.toggle('light');
  hero.classList.toggle('light');
  heroMerch.classList.toggle('light')
}
// get Button with effects
function getSuperButton(e) {
  const x = e.pageX
  const y = e.pageY
  const buttonTop = e.target.offsetTop
  const buttonLeft = e.target.offsetLeft
  const xInside = x - buttonLeft
  const yInside = y - buttonTop
  const circle = document.createElement('span')
  circle.classList.add('circle')
  circle.style.top = yInside + 'px'
  circle.style.left = xInside + 'px'
  this.appendChild(circle)
  setTimeout(() => circle.remove(), 500)
}

console.log(`Смена изображений в секции portfolio +25
Перевод страницы на два языка +25
Переключение светлой и тёмной темы +25
Дополнительный функционал local storage+5
Дополнительный функционал clever buttons +5
`);
