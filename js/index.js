document.addEventListener("DOMContentLoaded", (fn) => {
  const swiper = new Swiper(".home-wrap", {
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    speed: 1500,
    loop: true,
    parallax: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".home-pagination",
      type: "bullets",
    },
  });

  const swiperLogo = new Swiper(".logo-wrap", {
    speed: 700,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      480: {
        slidesPerView: 3,
        spaceBetween: 30,
      },

      640: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
    },
  });

  const swiperhighlights = new Swiper(".highlights-wrap", {
    effect:"cube",
    loop: true,
    speed: 1200,
    grabCursor: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
  });

  document.querySelectorAll(".hightlight-cards .text-card").forEach(card => {
    card.addEventListener("mouseover", () => {
      card.classList.add("glow");
    });
    card.addEventListener("mouseout", () => {
      card.classList.remove("glow");
    });
  })

  const swiperJoin = new Swiper(".who-wrap", {
    direction: "vertical",
    slidesPerView: 2.5,
    loop: true,
    autoplay: {
      delay: 6000,
      reverseDirection: true,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      480: {
        slidesPerView: 1.5,
        spaceBetween: 30,
      },

      640: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 70,
      },
    },
  });

  

  const swiperteam = new Swiper(".team-wrap", {
    slidesPerView: 3,
    spaceBetween: 40,
    speed: 1200,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    breakpoints: {
      360: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3.5,
        spaceBetween: 50,
      },
    },
  });

  (async function () {
    const data = {
      labels: [
        "Industry Professionals",
        "Academic Community",
        "Entrepreneurs & Innovators",
      ],
      datasets: [
        {
          data: [45, 30, 25],
          backgroundColor: ["#474e93", "#7e5cad", "#a294f9"],
          hoverOffset: 4,
        },
      ],
    };

    new Chart(document.getElementById("who-chart"), {
      type: "pie",
      data: data,
    });
  })();



//  animate('#join .sec-title', {
//    autoplay: onScroll({
//     scale: [
//     { to: 2.25, ease: 'inOut(3)', duration: 200 },
//   ]
//   })
// });

// // Make the logo draggable around its center
// createDraggable('.logo.js', {
//   container: [0, 0, 0, 0],
//   releaseEase: createSpring({ stiffness: 200 })
// });


  const {
    animate,
    utils,
    createDraggable,
    createSpring,
    createTimer,
    createTimeline,
    onScroll,
    stagger,
    engine,
  } = anime;
  
  animate("#join .title-wrap .title", {
    y: [
      { to: "-2.75rem", ease: "outExpo", duration: 600 },
      { to: 0, ease: "outBounce", duration: 800, delay: 100 },
    ],
    scale: { from: 0, to: 1 },
    ease: "inOutCirc",
    duration: 2000,
    delay: stagger(100),
    autoplay: onScroll({
      enter: 'bottom top',
      leave: 'top bottom',
      sync: 'resume reset',
    }),
  });
  animate("#join .join-para", {
    scale: { from: 0, to: 1,  ease: "inOutCirc", duration: 1000, delay: 500 },
    ease: "inOutCirc",
    duration: 2000,
    delay: 1000,
    autoplay: onScroll({
      enter: 'bottom top',
      leave: 'top bottom',
      sync: 'resume reset',
    }),
  });

  class ElementViewport {
    values(el) {
      return [
        el.getBoundingClientRect(),
        window.innerHeight || document.documentElement.clientHeight,
        window.innerWidth || document.documentElement.clientWidth,
      ];
    }
    onlyValues(el) {
      let [rect, windowHeight, windowWidth] = this.values(el);
      return rect.top + rect.bottom + rect.height;
    }
    boolean(el) {
      let [rect, windowHeight, windowWidth] = this.values(el);
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom + 35 <= windowHeight &&
        rect.right <= windowWidth
      );
    }
  }
  const getViewPort = new ElementViewport();

  Array.from(document.querySelectorAll(".join-card")).forEach((card) => {
    let title = card.querySelector(".card-title");
    //let glow = card.querySelector(".card-glow");
    let bgImage = card.querySelector(".card-image img:nth-child(1)");
    let mainImage = card.querySelector(".card-image img:nth-child(2)");
    animate(title, {
      y: [
        { to: "-2.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      rotate: {
        from: "-1turn",
        ease: "outBounce",
        delay: 0,
      },
      scale: { from: 0, to: 1 },
      ease: "inOutCirc",
      autoplay: onScroll({
        sync: "resume reset",
      }),
    });
    // animate(glow, {
    //   y: [
    //     { to: "-2.75rem", ease: "outExpo", duration: 600 },
    //     { to: 0, ease: "cubicBezier", duration: 1800, delay: 100 },
    //   ],
    //   scale: { from: 0, to: 1 },
    //   ease: "inOutCirc",
    //   autoplay: onScroll({
    //     enter: "bottom top",
    //     leave: "top bottom",
    //     sync: "play resume reset",
    //   }),
    // });
    animate(bgImage, {
      opacity: { from: 0, to: 1 },
      rotate: 360,
      ease: 'out(4)',
      duration: 1500,
      autoplay: onScroll({
        enter: "bottom top",
        leave: "top bottom",
        sync: "resume reset",
      }),
    });
    animate(mainImage, {
      scale: { from: 0, to: 1 },
      ease: "inOutCirc",
      autoplay: onScroll({
        enter: "bottom top",
        leave: "top bottom",
        sync: "resume reset",
      }),
    });
  });
});
