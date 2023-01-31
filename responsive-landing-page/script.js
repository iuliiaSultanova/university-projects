  const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  a11y: {
    paginationBulletMessage: 'Перейти к слайду {{index}}'
  }
});


const tabsBtn = document.querySelectorAll(".work-steps__item");
const tabsItem = document.querySelectorAll(".work__content");

tabsBtn.forEach(function(item) {
  item.addEventListener("click" , function() {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);

    if ( ! currentBtn.classList.contains("active") ) {
      tabsBtn.forEach(function(item) {
        item.classList.remove("active");
      });

      tabsItem.forEach(function(item) {
        item.classList.remove("active");
      });

      currentBtn.classList.add("active");
      currentTab.classList.add("active");

    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.question');

  accordions.forEach(el => {
    el.addEventListener('click', (e) => {
      const self = e.currentTarget;
      const control = self.querySelector('.question__title');
      const content = self.querySelector('.question__content');

      self.classList.toggle('open');

      if (self.classList.contains('open')) {
        control.setAttribute('aria-expanded', true);
        content.setAttribute('aria-hidden', false);
      }
    });
  });
});



function setBurger(params) {
  const btn = document.querySelector(`.${params.btnClass}`);
  const menu = document.querySelector(`.${params.menuClass}`);

  menu.addEventListener("animationend", function () {
    if (this.classList.contains(params.hiddenClass)) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
    }
  });

  btn.addEventListener("click", function () {
    this.classList.toggle(params.activeClass);

    if (
      !menu.classList.contains(params.activeClass) &&
      !menu.classList.contains(params.hiddenClass)
    ) {
      menu.classList.add(params.activeClass);
      document.body.style.overflow = 'hidden';
    } else {
      menu.classList.add(params.hiddenClass);
      document.body.removeAttribute('style');
    }
  });
}

setBurger({
  btnClass: "header__burger",
  menuClass: "header-list__wrap",
  activeClass: "is-opened",
  hiddenClass: "is-closed" 
});


/* function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

openBtn.addEventListener("click", function (evt) {
  this.disabled = true;

  if (
    !search.classList.contains(params.activeClass) &&
    !search.classList.contains(params.hiddenClass)
  ) {
    search.classList.add(params.activeClass);
  }
});

closeBtn.addEventListener('click', function () {
  openBtn.disabled = false;
  search.classList.add(params.hiddenClass);
});


setSearch({
openBtnClass: "js-open-search", // класс кнопки открытия
closeBtnClass: "js-close", // класс кнопки закрытия
searchClass: "js-form", // класс формы поиска
activeClass: "is-opened", // класс открытого состояния
hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});
 */

function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function () {
    if (this.classList.contains(params.hiddenClass)) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
    }
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });
  
  closeBtn.addEventListener('click', function () {
    openBtn.disabled = false;
    search.classList.add(params.hiddenClass);
  });
}

setSearch({
  openBtnClass: "js-open-search", // класс кнопки открытия
  closeBtnClass: "js-close", // класс кнопки закрытия
  searchClass: "js-form", // класс формы поиска
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});



