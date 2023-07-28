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

const tabsContainer = document.querySelector('.tabs-container');
const tabsList = tabsContainer.querySelector('ul');
const tabsButtons = tabsList.querySelectorAll('a');
const tabPanels = querySelectorAll('.tabs__panels > div');
tabsList.setAttribute('role', 'tablist');
tabsList.querySelectorAll('li').forEach((listItem) => {
  listItem.setAttribute('role', 'presentation');
});

tabsButtons.forEach((tab, index) => {
  tab.setAttribute('role', 'tab');
  if (index === 0) {
    tab.setAttribute('aria-selected', 'true');
  } else {
    tab.setAttribute('tabindex', '-1');
    tabPanels[index].setAttribute('hidden', '');
  }
});

tabPanels.forEach((panel) => {
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('tabindex', '0');
});

tabsContainer.addEventListener('click', (e) => {
  const clickedTab = e.target.closest('a');
  if (!clickedTab) return;
  e.preventDefault;

  switchTab(clickedTab);
});

tabsContainer.addEventListener('keydown', (e) => {
  switch (e.key) {
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "Home":
      e.preventDefault();
      switchTab(tabsButtons[0]);
      break;
    case "End":
      e.preventDefault();
      switchTab(tabsButtons[tabsButtons.length - 1]);
      break;
  }
});


function moveLeft() {
  const currentTab = document.activeElement;
  if (!currentTab.parentElement.previousElementSibling) {
    switchTab(tabsButtons[tabsButtons.length - 1]);
  } else {
    switchTab(currentTab.parentElement.previousElementSibling.querySelector("a"));
  }
}

function moveRight() {
  const currentTab = document.activeElement;
  if (!currentTab.parentElement.previousElementSibling) {
    switchTab(tabsButtons[0]);
  } else {
    switchTab(currentTab.parentElement.nextElementSibling.querySelector("a"));
  }
}


function switchTab(newTab) {
  const activePanelId = newTab.getAttribute('href');
  const activePanel = tabsContainer.querySelector(activePanelId);

  tabsButtons.forEach((button) => {
    button.setAttribute('aria-selected', false);
    button.setAttribute('tabindex', '-1');
  });

  tabPanels.forEach((panel) => {
    panel.setAttribute('hidden', true);
  });

  activePanel.removeAttribute('hidden', false);

  newTab.setAttribute('aria-selected', true);
  newTab.setAttribute('tabindex', 0);
  newTab.focus();
}
