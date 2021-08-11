import Swiper from "swiper/bundle";

document.addEventListener("DOMContentLoaded", () => {
  require("./modules/main-nav");

  const searchFormToggle = document.querySelector(".search-form__toggle-btn");
  const searcForm = document.querySelector(".search-form");

  searchFormToggle.addEventListener("click", () => {
    let expanded = searchFormToggle.getAttribute("aria-expanded") === "true";
    searchFormToggle.setAttribute("aria-expanded", !expanded);
    searchFormToggle.classList.add("search-form__toggle-btn--open");
    searcForm.classList.add("search-form--open");
  });

  // let currentMousePos = { x: -1, y: -1 };
  // let flesh = document.querySelector('#flesh');
  // flesh.addEventListener('onmousemove', function(e) {

  //   currentMousePos.x = e.pageX;
  //   currentMousePos.y = e.pageY;

  //   let bone = document.querySelector('#bone');
  //   bone.style.maskPositionX = `${currentMousePos.x} - 75`;
  //   bone.style.maskPositionY = `${currentMousePos.y} - 75`;
  //   console.log(currentMousePos.x);
  // });

  var currentMousePos = { x: -1, y: 200 };
  $("#flesh").mousemove(function (e) {
    currentMousePos.x = e.pageX;
    currentMousePos.y = e.pageY;

    $("#bone").css("-webkit-mask-position-x", currentMousePos.x - 75);
    $("#bone").css("-webkit-mask-position-y", currentMousePos.y - 75);
  });

  var svgElement = document.querySelector(".zoom__rect");

  if (svgElement) {
    var maskedElement = document.querySelector("#mask-circle");
    var circleFeedback = document.querySelector("#circle-shadow");
    var svgPoint = svgElement.createSVGPoint();

    function cursorPoint(e, svg) {
      svgPoint.x = e.clientX;
      svgPoint.y = e.clientY;
      return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
    }

    function update(svgCoords) {
      maskedElement.setAttribute("cx", svgCoords.x);
      maskedElement.setAttribute("cy", svgCoords.y);
      circleFeedback.setAttribute("cx", svgCoords.x);
      circleFeedback.setAttribute("cy", svgCoords.y);
    }

    window.addEventListener(
      "mousemove",
      function (e) {
        update(cursorPoint(e, svgElement));
      },
      false
    );

    document.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
        var touch = e.targetTouches[0];
        if (touch) {
          update(cursorPoint(touch, svgElement));
        }
      },
      false
    );
  }

  if (document.querySelector(".promo__title")) {
    setTimeout(() => {
      document.querySelector(".promo__title").addEventListener(
        "mousemove",
        (e) => {
          var w = e.offsetWidth;
          // let x = 360*(e.offsetX/e.offsetY) / w;

          let x = e.offsetX;

          console.log(x);
          const style = `-webkit-linear-gradient(
        45deg,
        rgba(200, 193, 188, 1) ${e.offsetX / e.offsetY}%,
        rgba(185, 154, 133, 1) ${(e.offsetX / e.offsetY) * 3}%,
        rgba(253, 178, 98, 1) ${(e.offsetX / e.offsetY) * 8}%,
        rgba(192, 171, 158, 1) ${(e.offsetX / e.offsetY) * 13}%,
        rgba(200, 193, 188, 1) ${(e.offsetX / e.offsetY) * 18}%
      )`;
          // console.log(style);
          document.querySelector(".promo__title").style.backgroundImage = style;
        },
        100
      );
    });
  }

  const eventsSlider = new Swiper(".events__slider.swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: "auto",
        spaceBetween: 40,
      },
      1025: {
        slidesPerView: 3,
        spaceBetween: 61,
      },
    },
  });

  const collectionFavorites = new Swiper(
    ".main-page-collection__favorites-slider",
    {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      initialSlide: 2,
      slidesPerView: 5,
      coverflowEffect: {
        rotate: 0,
        stretch: 150,
        depth: 200,
        modifier: 3,
        slideShadows: false,
      },

      on: {
        slideChange: function () {
          var activeIndex = this.activeIndex;
          var realIndex = this.slides
            .eq(activeIndex)
            .attr("data-swiper-slide-index");
          $(".swiper-slide").removeClass(
            "swiper-slide-prev-2 swiper-slide-next-2"
          );
          $('.swiper-slide[data-swiper-slide-index="' + realIndex + '"]')
            .prev()
            .prev()
            .addClass("swiper-slide-prev-2");
          $('.swiper-slide[data-swiper-slide-index="' + realIndex + '"]')
            .next()
            .next()
            .addClass("swiper-slide-next-2");
        },
      },
    }
  );

  // (function () {
  //   "use strict";

  //   // breakpoint where swiper will be destroyed
  //   // and switches to a dual-column layout
  //   const breakpoint = window.matchMedia("(min-width:768px)");

  //   // keep track of swiper instances to destroy later
  //   let mySwiper;

  //   //////////////////////////////////////////////////////////////////
  //   //////////////////////////////////////////////////////////////////
  //   //////////////////////////////////////////////////////////////////

  //   const breakpointChecker = function () {
  //     // if larger viewport and multi-row layout needed
  //     if (breakpoint.matches === true) {
  //       // clean up old instances and inline styles when available
  //       if (mySwiper !== undefined) mySwiper.destroy(true, true);

  //       // or/and do nothing
  //       return;

  //       // else if a small viewport and single column layout needed
  //     } else if (breakpoint.matches === false) {
  //       // fire small viewport version of swiper
  //       return enableSwiper();
  //     }
  //   };

  //   //////////////////////////////////////////////////////////////////
  //   //////////////////////////////////////////////////////////////////
  //   //////////////////////////////////////////////////////////////////

  //   const enableSwiper = function () {
  //     mySwiper = new Swiper(".main-page-news__slider.swiper-container", {
  //       loop: true,

  //       slidesPerView: "auto",

  //       centeredSlides: true,

  //       a11y: true,
  //       keyboardControl: true,
  //       grabCursor: true,

  //       // pagination
  //       pagination: ".swiper-pagination",
  //       paginationClickable: true,
  //     });
  //   };

  //   //////////////////////////////////////////////////////////////////
  //   //////////////////////////////////////////////////////////////////
  //   //////////////////////////////////////////////////////////////////

  //   // keep an eye on viewport size changes
  //   breakpoint.addListener(breakpointChecker);

  //   // kickstart
  //   breakpointChecker();
  // })(); /* IIFE end */

  /* Swiper
   **************************************************************/
  var swiper = Swiper;
  var init = false;

  /* Which media query
   **************************************************************/
  function swiperMode() {
    let mobile = window.matchMedia("(min-width: 0px) and (max-width: 767px)");
    let tablet = window.matchMedia("(min-width: 768px)");

    // Enable (for mobile)
    if (mobile.matches) {
      if (!init) {
        init = true;
        swiper = new Swiper(".main-page-news__slider.swiper-container", {
          // centeredSlides: true,
          slidesPerView: "auto",
          loop: true,
          spaceBetween: 56,
          watchSlidesVisibility: true,
          loop: true,
          direction: "horizontal",
          grabCursor: true,
          autoHeight: true,
          loop: false,

          a11y: true,
          keyboardControl: true,
        });
      }
    }

    // Disable (for tablet)
    else if (tablet.matches) {
      for (let i = 0; i < swiper.length; i++) {
        swiper[i].destroy();
      }
      init = false;
    }
  }

  /* On Load
   **************************************************************/
  window.addEventListener("load", function () {
    swiperMode();
  });

  /* On Resize
   **************************************************************/
  window.addEventListener("resize", function () {
    swiperMode();
  });

  var galleryTop = new Swiper(".gallery-top", {
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop: false,
    autoHeight: false,
  });
  var galleryThumbs = new Swiper(".gallery-thumbs", {
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: "auto",
    touchRatio: 0.2,
    slideToClickedSlide: true,
    loop: false,
    autoHeight: false,
  });
  galleryTop.controller.control = galleryThumbs;
  galleryThumbs.controller.control = galleryTop;
});
