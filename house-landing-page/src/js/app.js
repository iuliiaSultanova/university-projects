const burger = document.querySelector('[data-burger]');
const nav = document.querySelector('[data-nav]');
const navItems = nav.querySelectorAll('a');
const body = document.body;

burger.addEventListener('click', () => {
  body.classList.toggle('stop-scroll');
  burger.classList.toggle('burger--active');
  nav.classList.toggle('nav--visible');
})

navItems.forEach(el => {
  el.addEventListener('click', () => {
    body.classList.remove('stop-scroll');
    burger.classList.remove('burger--active');
    nav.classList.remove('nav--visible');
  })
});

const tabs = document.querySelector('.gallery-tabs');
const tabsBtn = document.querySelectorAll('.gallery-tabs__btn');
const tabsContent = document.querySelectorAll('.tabs__content');
console.log("tabs: ", tabs);


tabs.addEventListener('click', (e) => {
    console.log('clicked');
    const tabsPath = e.target.dataset.tabsPath;
    console.log(tabsPath);
    tabsHandler(tabsPath);
});

const tabsHandler = (path) => {
  tabsBtn.forEach(el => {el.classList.remove('gallery-tabs__btn--active')});
  document.querySelector(`[data-tabs-path="${path}"]`).classList.add('gallery-tabs__btn--active');

  tabsContent.forEach(el => {el.classList.remove('tabs__content--active')});
  document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
};
