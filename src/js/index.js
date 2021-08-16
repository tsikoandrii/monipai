if (window.innerWidth <= 800) {
  var dealsSlider = new Swiper("#deals", {
    slidesPerView: "auto",
    spaceBetween: 16,
  });
}
if (window.innerWidth <= 1060) {
  var setsSlider = new Swiper("#sets", {
    slidesPerView: "auto",
    spaceBetween: 16,
  });
}

var cartSlider = new Swiper("#cartItems", {
  slidesPerView: 1,
  spaceBetween: 40,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: "auto",
      spaceBetween: 16,
    },
    800: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1060: {
      slidesPerView: 3,
      spaceBetween: 40,
    },

  }
});

if (cartSlider.slides[3]) {
  cartSlider.slides[3].classList.add('opacity')
}

cartSlider.on('slideChange', (slider) => {
  const current = slider.activeIndex + 1;
  const slides = slider.slides;

  slides.forEach((el) => el.classList.remove('opacity'))

  const prev = slides[current - 2]
  const next = slides[current + 2]

  if (next) {
    next.classList.add('opacity')
  }
  if (prev) {
    prev.classList.add('opacity')
  }
})

const cartItemsSliders = new Swiper('.cart .mini-slider', {
  slidesPerView: 7,
  spaceBetween: 9,
  navigation: {
    nextEl: ".mini-slider__right",
    prevEl: ".mini-slider__left",
  },
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
  breakpoints: {
    320: {
      slidesPerView: 6,
      spaceBetween: 8,
    },
    500: {
      slidesPerView: 7,
      spaceBetween: 9,
    }
  }
})

const miniSliders = new Swiper('.cart-item .mini-slider', {
  slidesPerView: 6,
  spaceBetween: 9,
  navigation: {
    nextEl: ".mini-slider__right",
    prevEl: ".mini-slider__left",
  },
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
})

const productSlider = new Swiper('.product-block .mini-slider', {
  slidesPerView: 7,
  spaceBetween: 8,
  navigation: {
    nextEl: ".mini-slider__right",
    prevEl: ".mini-slider__left",
  },
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
  breakpoints: {
    320: {
      slidesPerView: 6,
    },
    475: {
      slidesPerView: 4,
    },
    1060: {
      slidesPerView: 7,
    },
  }
})

// Menu
const nav = document.querySelector('.mb-menu')
const openMenu = document.querySelector('.mb-burger')
const closeMenu = document.querySelector('.mb-close-button')
const backdrop = document.querySelector('.backdrop')

openMenu.addEventListener('click', () => {
  nav.classList.add('active')
  backdrop.classList.add('active')
})

closeMenu.addEventListener('click', () => {
  nav.classList.remove('active')
  nav.classList.add('closed')
  backdrop.classList.remove('active')
})

backdrop.addEventListener('click', () => {
  nav.classList.remove('active')
  nav.classList.add('closed')
  backdrop.classList.remove('active')
})


// Popup Functional
const searchPopup = document.querySelector('#first-popup')
const closePopup = document.querySelector('.default-popup__close')
const openPopup = document.querySelector('.search-bar')
const popupBackdrop = document.querySelector('.popup-backdrop')

if (searchPopup) {
  openPopup.addEventListener('click', () => {
    searchPopup.classList.add('active');
    popupBackdrop.classList.add('active')
  });

  closePopup.addEventListener('click', () => {
    searchPopup.classList.remove('active');
    popupBackdrop.classList.remove('active')
  });

  popupBackdrop.addEventListener('click', () => {
    searchPopup.classList.remove('active');
    popupBackdrop.classList.remove('active')
  })
}



// Tabs Functional
const tabs = document.querySelectorAll('.default-tabs__item')
const tabsContent = document.querySelectorAll('.search-popup__col')

if (tabs) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const contentID = tab.dataset.content;

      tabs.forEach(el => el.classList.remove('active'))
      tabsContent.forEach(content => {
        content.classList.remove('active')
        if (content.dataset.tab === contentID) {
          content.classList.add('active')
          tab.classList.add('active')
        }
      })

    })
  })
}


// Cart Functional
const cart = document.querySelector('[data-component="cart"]')
const closeCart = document.querySelector('.cart-btn__close')
const openCart = document.querySelector('#cartBtn')
const cartBackdrop = document.querySelector('.cart-backdrop')

if (cart) {
  openCart.addEventListener('click', () => {
    cart.classList.add('active');
    cartBackdrop.classList.add('active')
  });

  closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
    cartBackdrop.classList.remove('active')
  });

  cartBackdrop.addEventListener('click', () => {
    cart.classList.remove('active');
    cartBackdrop.classList.remove('active')
  })
}