import $ from "jquery";
window.jQuery = $;
window.$ = $;
import Swiper from "swiper/bundle";
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";
require("./modules/bvi");
require("./theta-carousel.min");

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

  document.addEventListener("click", function (e) {
    const target = e.target;
    const its_menu = target == searcForm || searcForm.contains(target);
    // const its_btnMenu = target == btnMenu;
    const menu_is_active = searcForm.classList.contains("search-form--open");

    if (!its_menu && menu_is_active) {
      searchFormToggle.classList.remove("search-form__toggle-btn--open");
      searcForm.classList.remove("search-form--open");
    }
  });

  const yearsBtn = document.querySelector(".years-toggle");

  if (yearsBtn) {
    yearsBtn.addEventListener("click", () => {
      yearsBtn.nextElementSibling.classList.toggle("years-list--active");
    });
  }

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

          // console.log(x);
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

  const collectionFavorites = new Swiper(".main-collection__swiper-slider", {
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 1,
    slidesPerView: 1,

    navigation: {
      nextEl: ".main-collection__swiper-slider-button--next",
      prevEl: ".main-collection__swiper-slider-button--prev",
    },
  });

  const personsSlider = new Swiper(".department__header-slider", {
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 1,
    slidesPerView: 1,
    pagination: {
      el: ".department__header-slider-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".department__header-slider-next",
      prevEl: ".department__header-slider-prev",
    },
  });

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
  let swiper = Swiper;
  let init = false;

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

  const columnSlider = document.querySelectorAll(".column-content");

  columnSlider.forEach((element) => {
    const sliderTop = new Swiper(element.querySelector(".gallery-top"), {
      spaceBetween: 0,
      navigation: {
        nextEl: element.querySelector(".swiper-button-next"),
        prevEl: element.querySelector(".swiper-button-prev"),
      },
      pagination: {
        el: element.querySelector(".swiper-pagination"),
        clickable: true,
      },
      loop: false,
      autoHeight: false,
    });

    const sliderThumbs = new Swiper(element.querySelector(".gallery-thumbs"), {
      spaceBetween: 0,
      centeredSlides: false,
      slidesPerView: "auto",
      touchRatio: 0.2,
      slideToClickedSlide: true,
      loop: false,
      autoHeight: false,
    });
    sliderTop.controller.control = sliderThumbs;
    sliderThumbs.controller.control = sliderTop;
  });

  const gallerySlider = new Swiper(".gallery-slider", {
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

  const collectionSlider = document.querySelectorAll(
    ".collections__items-slider"
  );

  collectionSlider.forEach((element) => {
    const slider = new Swiper(element.querySelector(".swiper-container"), {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: element.querySelector(".swiper-button-next"),
        prevEl: element.querySelector(".swiper-button-prev"),
        disabledClass: "swiper-button-disable",
      },
      pagination: {
        el: element.querySelector(".swiper-pagination"),
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1025: {
          slidesPerView: 3,
          spaceBetween: 61,
        },
      },
    });
  });

  const personSlider = document.querySelectorAll(".department__person-photo");

  personSlider.forEach((element) => {
    const sliderTop = new Swiper(
      element.querySelector(".department__person-slider"),
      {
        initialSlide: 0,
        spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true,
        simulateTouch: true,
        loop: false,
        navigation: {
          nextEl: element.querySelector(".swiper-button-next"),
          prevEl: element.querySelector(".swiper-button-prev"),
        },
        autoHeight: false,
        thumbs: {
          swiper: sliderTop,
        },
      }
    );

    const sliderThumbs = new Swiper(
      element.querySelector(".department__person-slider-thumbs"),
      {
        initialSlide: 0,
        slidesPerView: "auto",
        spaceBetween: 17,
        slideToClickedSlide: true,
        autoHeight: false,
        centeredSlides: false,
        pagination: {
          el: element.querySelector(".swiper-pagination"),
          clickable: true,
        },
        loop: false,
        slideToClickedSlide: true,
      }
    );
    sliderTop.controller.control = sliderThumbs;
    sliderThumbs.controller.control = sliderTop;
  });

  const catalogDirectoryBtn = document.querySelector(
    ".directory__switcher-btn--category"
  );
  const catalogAlphabetBtn = document.querySelector(
    ".directory__switcher-btn--alphabet"
  );
  const alphabetFilterList = document.querySelector(
    ".directory__alphabet-list"
  );
  const alphabetList = document.querySelector(".directory__alphabet-main-list");
  const categoryList = document.querySelector(".directory__category-main-list");

  if (catalogDirectoryBtn) {
    catalogDirectoryBtn.addEventListener("click", () => {
      catalogDirectoryBtn.classList.remove("directory__switcher-btn--active");
      catalogAlphabetBtn.classList.add("directory__switcher-btn--active");
      alphabetFilterList.classList.add("directory__alphabet-list--hide");
      alphabetList.classList.add("directory__alphabet-main-list--hide");
      categoryList.classList.remove("directory__category-main-list--hide");
    });
  }

  if (catalogAlphabetBtn) {
    catalogAlphabetBtn.addEventListener("click", () => {
      catalogAlphabetBtn.classList.remove("directory__switcher-btn--active");
      catalogDirectoryBtn.classList.add("directory__switcher-btn--active");
      alphabetFilterList.classList.remove("directory__alphabet-list--hide");
      alphabetList.classList.remove("directory__alphabet-main-list--hide");
      categoryList.classList.add("directory__category-main-list--hide");
    });
  }

  // $(".filter__form__custom-select").each(function () {
  //   var classes = $(this).attr("class"),
  //     id = $(this).attr("id"),
  //     name = $(this).attr("name");
  //   var template = '<div class="' + classes + '">';
  //   template +=
  //     '<span class="filter__form__custom-select-trigger">' +
  //     $(this).attr("data-placeholder") +
  //     "</span>";
  //   template += '<div class="filter__form__custom-options">';
  //   $(this)
  //     .find("option")
  //     .each(function () {
  //       // template +=
  //       //   '<span class="filter__form__custom-option ' +
  //       //   $(this).attr("class") +
  //       //   '" data-value="' +
  //       //   $(this).attr("value") +
  //       //   '">' +
  //       //   $(this).html() +
  //       //   "</span>";
  //       template +=
  //         '<a class="filter__form__custom-option ' +
  //         $(this).attr("class") +
  //         'href="' +
  //         $(this).attr("value") +
  //         '">' +
  //         $(this).html() +
  //         "</a>";
  //     });
  //   template += "</div></div>";

  //   $(this).wrap('<div class="filter__form__custom-select-wrapper"></div>');
  //   $(this).hide();
  //   $(this).after(template);
  // });
  // $(".filter__form__custom-option:first-of-type").hover(
  //   function () {
  //     $(this).parents(".filter__form__custom-options").addClass("option-hover");
  //   },
  //   function () {
  //     $(this)
  //       .parents(".filter__form__custom-options")
  //       .removeClass("option-hover");
  //   }
  // );
  // $(".filter__form__custom-select-trigger").on("click", function () {
  //   $("html").one("click", function () {
  //     $(".filter__form__custom-select").removeClass("opened");
  //   });
  //   $(this).parents(".filter__form__custom-select").toggleClass("opened");
  //   event.stopPropagation();
  // });
  // $(".filter__form__custom-option").on("click", function () {
  //   $(this)
  //     .parents(".filter__form__custom-select-wrapper")
  //     .find("select")
  //     .val($(this).data("value"));
  //   $(this)
  //     .parents(".filter__form__custom-options")
  //     .find(".filter__form__custom-option")
  //     .removeClass("selection");
  //   $(this).addClass("selection");
  //   $(this).parents(".filter__form__custom-select").removeClass("opened");
  //   $(this)
  //     .parents(".filter__form__custom-select")
  //     .find(".filter__form__custom-select-trigger")
  //     .text($(this).text());
  // });

  //аккордеон
  (function ($) {
    $.fn.vmenuModule = function (option) {
      var obj, item;
      var options = $.extend(
        {
          Speed: 220,
          autostart: true,
          autohide: 1,
        },
        option
      );
      obj = $(this);

      item = obj.find("ul").parent("li").children("button");
      item.attr("data-option", "off");

      item.unbind("click").on("click", function (e) {
        e.preventDefault();
        var a = $(this);
        if (options.autohide) {
          a.parent()
            .parent()
            .find("button[data-option='on']")
            .parent("li")
            .children("ul")
            .slideUp(options.Speed / 1.2, function () {
              $(this)
                .parent("li")
                .children("button")
                .attr("data-option", "off");
            });
        }
        if (a.attr("data-option") == "off") {
          a.parent("li")
            .children("ul")
            .slideDown(options.Speed, function () {
              a.attr("data-option", "on");
            });
        }
        if (a.attr("data-option") == "on") {
          a.attr("data-option", "off");
          a.parent("li").children("ul").slideUp(options.Speed);
        }
      });
      if (options.autostart) {
        obj.find("button").each(function () {
          $(this)
            .parent("li")
            .parent("ul")
            .slideDown(options.Speed, function () {
              $(this).parent("li").children("button").attr("data-option", "on");
            });
        });
      }
    };
  })(jQuery);

  //трансформация списка в аккордион в мобиле
  function accordion() {
    var content = $(".accordion--mobile .accordion-content");

    if ($(window).width() < 1024) {
      $(".js-accordion--mobile").vmenuModule({
        Speed: 400,
        autostart: false,
        autohide: true,
      });
      content.removeClass("display");
    } else {
      content.addClass("display");
    }
    $(".js-accordion").vmenuModule({
      Speed: 400,
      autostart: false,
      autohide: true,
    });
  }
  accordion();

  function carouselCreated(e, data) {
    var z = {
      z: -5500,
    };
    $(z).animate(
      {
        z: -1450,
      },
      {
        easing: "easeOutQuad",
        duration: 1000,
        step: function (val) {
          if (isNaN(val)) return; //for some easings we can get NaNs
          $(".theta-carousel").theta_carousel({
            "path.settings.shiftZ": val,
          });
        },
      }
    );
  }
  var container = $("#container");

  // // fade in effect
  // container.css({
  //   opacity: 0,
  // });
  // container.delay(500).animate(
  //   {
  //     opacity: 1,
  //   },
  //   500
  // );

  container.theta_carousel({
    filter: ".ex-item",
    selectedIndex: 0,
    distance: 30,
    designedForWidth: 940,
    designedForHeight: 434,
    distanceInFallbackMode: 300,
    scaleX: 1.7,
    scaleY: 1.9,
    scaleZ: 1.2,
    path: {
      settings: {
        shiftY: 849,
        shiftZ: -5500,
        rotationAngleZY: 54,
        a: 833,
        b: 835,
        endless: true,
      },
      type: "ellipse",
    },
    perspective: 900,
    sensitivity: 0.2,
    fadeAway: true,
    fadeAwayBezierPoints: {
      p1: {
        x: 140,
        y: 100,
      },
      p2: {
        x: 41,
        y: 67,
      },
      p3: {
        x: 45,
        y: 67,
      },
      p4: {
        x: 100,
        y: 33,
      },
    },
    sizeAdjustment: true,
    sizeAdjustmentNumberOfConfigurableElements: 5,
    sizeAdjustmentBezierPoints: {
      p1: {
        x: 0,
        y: 200,
      },
      p2: {
        x: 1,
        y: 61,
      },
      p3: {
        x: 5,
        y: 72,
      },
      p4: {
        x: 100,
        y: 72,
      },
    },
    reflection: false,
  });
  carouselCreated.call(container, null, {
    index: container.theta_carousel("option", "selectedIndex"),
  });
});
