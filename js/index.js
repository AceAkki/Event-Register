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

  const swiperJoin = new Swiper(".who-wrap", {
    direction: 'vertical',
    slidesPerView: 2.5,
    loop: true,
    autoplay: {
        delay: 1500,
        reverseDirection: true,
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
        spaceBetween: 50,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 90,
      },
    },
  
  });

  const swiperhighlights = new Swiper(".highlights-wrap", {
    speed: 1200,
    grabCursor: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    loop: true,
    effect: 'cube',
    cubeEffect: {
      slideShadows: false,
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



  (async function() {
    const data = {
      labels: [
        'Industry Professionals',
        'Academic Community',
        'Entrepreneurs & Innovators'
      ],
      datasets: [{
        data: [45, 30, 25],
        backgroundColor: [
          '#474e93',
          '#7e5cad',
          '#a294f9'
        ],
        hoverOffset: 4
      }]
    };
  
    new Chart(
      document.getElementById('who-chart'),
      {
        type: 'pie',
        data: data,
      }
    );
  })();
   



});
