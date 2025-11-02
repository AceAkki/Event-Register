document.addEventListener("DOMContentLoaded", () => {
  var journeySwiper = new Swiper(".journey-wrap", {
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 5200,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },

    breakpoints: {
      360: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      565: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      835: {
        slidesPerView: 3,
        spaceBetween: 30,
      },

      1025: {
        slidesPerView: 3.5,
        spaceBetween: 30,
      },
    },
  });
  var coreSwiper = new Swiper(".core-wrap", {
    slidesPerView: 1,
    spaceBetween: 10,
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

      565: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      835: {
        slidesPerView: 3,
        spaceBetween: 30,
      },

      1025: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

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
  // (async function() {
  //   const data = {
  //     labels: [
  //       'Industry Professionals',
  //       'Academic Community',
  //       'Entrepreneurs & Innovators'
  //     ],
  //     datasets: [{
  //       data: [45, 30, 25],
  //       backgroundColor: [
  //         '#474e93',
  //         '#7e5cad',
  //         '#a294f9'
  //       ],
  //       hoverOffset: 4
  //     }]
  //   };

  //   new Chart(
  //     document.getElementById('who-chart'),
  //     {
  //       type: 'pie',
  //       data: data,
  //     }
  //   );

  // })();

  animate(".title-wrap .title", {
    y: [
      { to: "-2.75rem", ease: "outExpo", duration: 600 },
      { to: 0, ease: "outBounce", duration: 800, delay: 100 },
    ],
    scale: { from: 0, to: 1 },
    ease: "inOutCirc",
    duration: 2000,
    delay: stagger(100),
    autoplay: onScroll({
      enter: "bottom top",
      leave: "top bottom",
      sync: "resume reset",
    }),
  });

  const container = document.getElementById("myCarousel");
  let arr = Array.from({ length: 13 }, (value, index) => index + 2);
  const fragment = new DocumentFragment();
  arr.forEach((elm) => {
    let createNew = document.createElement("div");
    createNew.classList.add("f-carousel__slide");
    createNew.setAttribute("data-fancybox", "gallery");
    createNew.setAttribute("data-src", `img/gallery/${elm}.webp`);
    createNew.setAttribute("data-caption", `img/gallery/${elm}.webp`);
    let img = document.createElement("img");
    img.setAttribute("data-lazy-src", `img/gallery/${elm}-thumb.webp`);
    createNew.appendChild(img);
    fragment.appendChild(createNew);
  });
  container.appendChild(fragment);

  Fancybox.bind("[data-fancybox]", {});

  const mapRange = (
    inputLower,
    inputUpper,
    outputLower,
    outputUpper,
    value
  ) => {
    const INPUT_RANGE = inputUpper - inputLower;
    const OUTPUT_RANGE = outputUpper - outputLower;
    return (
      outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0)
    );
  };
  const options = {
    Autoplay: {
      timeout: 3000,
      progressParentEl: (autoplay) => {
        return autoplay.instance.viewport;
      },
    },

    Dots: false,
    slidesPerPage: 1,
    on: {
      "Panzoom.beforeTransform": (carousel) => {
        carousel.slides.map((slide) => {
          const progress = carousel.getProgress(slide.index);
          const scale = mapRange(0, 1, 1, 1.2, 1 - Math.abs(progress));
          const blur = mapRange(0, 1, 3, 0, 1 - Math.abs(progress));

          slide.el.style.setProperty("--f-translateX", `${progress * -10}%`);
          slide.el.style.setProperty("--f-scale", scale);
          slide.el.style.setProperty("--f-blur", `${blur}px`);
        });
      },
    },
  };

  new Carousel(container, options, { Autoplay });
});
