function togglePaddingOfBody() {
  if (!document.body.classList.contains("no-scroll")) {
    let paddingValue = window.innerWidth - document.documentElement.clientWidth + 'px'
    document.body.style.paddingRight = paddingValue
  } else {
    document.body.style.paddingRight = '0px'
  }
}
//preloader
window.onload = function () {
  setTimeout(() => {
    document.body.classList.add("loaded")
    document.body.classList.remove("no-scroll")
  }, 100);
}
const iconMenu = document.querySelector(".icon-menu");
const navMenuItems = document.querySelectorAll(".menu__item");
//burger menu
iconMenu.addEventListener("click", () => {
  iconMenu.classList.toggle("active");
  navMenuItems.forEach(item => {
    item.classList.toggle("isOpened")
  })
  togglePaddingOfBody()
  document.body.classList.toggle("no-scroll")
})
//toggle activ menu item
const navMenuLink = document.querySelectorAll(".nav-header__link--has-subnavs");
if (document.querySelector(".subnavs")) {
  navMenuLink.forEach(item => {
    item.addEventListener("click", () => {
      if (item.classList.contains("active")) {
        item.classList.remove("active")
      } else {
        navMenuLink.forEach(el => {
          el.classList.remove("active")
        })
        item.classList.add("active")
      }
    })
  })
}
//main swiper
if (document.querySelector(".hero__swiper")) {
  const heroSwiper = new Swiper('.hero__swiper', {
    slidesPerView: 1,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".hero__pagination",
      type: "bullets",
      clickable: true,
    },
    speed: 1500
  });
  heroSwiper.on('slideChange', function () {
    const heroPage = document.querySelector(".hero__pagination")
    const heroBullet = Array.from(heroPage.childNodes)
    heroBullet.forEach(item => {
      item.classList.remove("prev-next-bullets")
    })
    if (heroSwiper.realIndex == 0 || heroSwiper.realIndex == heroBullet.length - 1) {
      return
    } else {
      heroBullet[heroSwiper.realIndex-1].classList.add("prev-next-bullets")
      heroBullet[heroSwiper.realIndex+1].classList.add("prev-next-bullets")
    }
  });
}
//brand-swiper
let winW = window.innerWidth
if (winW < 993) {
  if (document.querySelector(".brands__swiper")) {
    const brandsSwiper = new Swiper('.brands__swiper', {
      slidesPerView: 1,
      spaceBetween: 2,
      loop: true,
      autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true, 
        disableOnInteraction: false,
      },
      breakpoints: {
        767.98: {
          slidesPerView: 4,
        },
        520.98: {
          slidesPerView: 2,
        }
      },
      pagination: {
        el: ".brands__pagination",
        type: "bullets",
        clickable: true,
      },
      speed: 800
    });
    brandsSwiper.on('slideChange', function () {
      const brandPage = document.querySelector(".brands__pagination")
      const brandBullet = Array.from(brandPage.childNodes)
      brandBullet.forEach(item => {
        item.classList.remove("prev-next-bullets")
      })
      if (brandsSwiper.realIndex == 0 || brandsSwiper.realIndex == brandBullet.length - 1) {
        return
      } else {
        brandBullet[brandsSwiper.realIndex-1].classList.add("prev-next-bullets")
        brandBullet[brandsSwiper.realIndex+1].classList.add("prev-next-bullets")
      }
    });
  }
}
//add animation oon scroll and fixed menu
const header = document.querySelector(".header__top")
window.addEventListener("scroll", () => {
  let windowTop = window.pageYOffset;
  if (windowTop > 168) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed")
  }
  let animate = document.querySelectorAll(".animate");
  animate.forEach(item => {
    if (!item.classList.contains("animated")) {
      item.style.visibility = "hidden"
    }
    function offset(item) {
      let rect = item.getBoundingClientRect();
      let scrollLeft = window.pageXOffsetLeft || document.documentElement.scrollLeft;
      let scrollTop = window.pageYOffsetLeft || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    let itemTop = offset(item).top;
    let itemPoint = Math.abs(window.innerHeight - item.offsetHeight * 0.5);
    if (item.offsetHeight === undefined) {
      let itemParent = item.parentNode;
      itemPoint = window.innerHeight - itemParent.offsetHeight / 2;
    }
    if (windowTop > itemTop - itemPoint) {
      let animation = item.getAttribute("data-animation");
      item.style.visibility = "visible"
      item.classList.add(animation);
      item.classList.add("animated");
    }
  })
})
//change lang of website 
if (document.querySelector(".select-custom")) {
  const selectCustom = document.querySelector('.select-custom');
  const selectCustomSelected = document.querySelector('.select-custom__selected');
  const selectCustomOptions = document.querySelector('.select-custom__options');
  const selectCustomOptionsList = Array.from(selectCustomOptions.children);
  const selectCustomOption = selectCustomOptions.querySelectorAll('.select-custom__option');
  let optionCheckedIndex = 0;
  let optionHoveredIndex = optionCheckedIndex;
  selectCustomSelected.addEventListener("click", () => {
    if (!selectCustomOptions.classList.contains("active")) {
      openSelectCustom()
    } else {
      closeSelectCustom()
    }
  })
  function openSelectCustom() {
    selectCustomOptions.classList.add("active");
    document.addEventListener("click", clickOutside);
  }
  function closeSelectCustom() {
    selectCustomOptions.classList.remove("active");
    document.removeEventListener("click", clickOutside);
  }
  function selectHovered(newHoverIndex) {
    selectCustomOptionsList[optionHoveredIndex].classList.remove("hover");
    selectCustomOptionsList[newHoverIndex].classList.add("hover");
    optionHoveredIndex = newHoverIndex;
  }
  function selectChecked(newCheckIndex) {
    let value = selectCustomSelected.innerHTML;
    selectCustomOptionsList[optionCheckedIndex].classList.remove("active");
    selectCustomOptionsList[newCheckIndex].classList.add("active");
    selectCustomSelected.innerHTML = selectCustomOptionsList[newCheckIndex].innerHTML;
    selectCustomOptionsList[newCheckIndex].innerHTML = value;
    optionCheckedIndex = newCheckIndex;
  }
  function clickOutside() {
    document.addEventListener("click", () => {
      if (!selectCustom.contains(event.target)) {
        selectCustomOptions.classList.remove("active");
      }
    });
  }
  selectCustomOption.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      selectChecked(index);
      closeSelectCustom();
    });
  });
}
//footer-menu
function drop(header, body) {
  header.forEach((item, index) => {
    item.addEventListener("click", () => {
      header[index].classList.toggle("active")
      if (!body[index].classList.contains("active")) {
        body[index].classList.add('active');
        body[index].style.height = 'auto';
        let height = body[index].clientHeight + 12 + 'px';
        body[index].style.height = '0px';
        setTimeout(function () {
          body[index].style.height = height;
        }, 0);
      } else {
        body[index].style.height = '0px';
        setTimeout(() => {
          body[index].classList.remove('active');
        }, 500)
      }
    })
  })
}
if (document.querySelector(".top-footer__subnavs")) {
  const footerNav = Array.from(document.querySelectorAll(".top-footer__link--has-subnavs"))
  const footerSubNav = Array.from(document.querySelectorAll(".top-footer__subnavs"))
  if(window.innerWidth < 767.98) {
    drop(footerNav, footerSubNav)
  }
  window.addEventListener("resize", ()=> {
    if(window.innerWidth < 767.98) {
      drop(footerNav, footerSubNav)
    }
  })
}



