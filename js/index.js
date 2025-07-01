import { animeIntiate } from "./animeInIt.js";

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

(function init() {
  document.addEventListener("DOMContentLoaded", (fn) => {
    animeIntiate.initiateAnimation();

  
  });

    window.addEventListener("load", (event) => {
     // console.log("page is fully loaded");
     
       document
      .querySelectorAll(".hightlight-cards .text-card")
      .forEach((card) => {
        card.addEventListener("mouseover", () => {
          card.classList.add("glow");
        });
        card.addEventListener("mouseout", () => {
          card.classList.remove("glow");
        });
      });

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
          spaceBetween: 90,
        },

        700: {
          slidesPerView: 2,
          spaceBetween: 90,
        },
        1024: {
          slidesPerView: 4.5,
          spaceBetween: 30,
        },
      },
    });

    const swiperhighlights = new Swiper(".highlights-wrap", {
      effect: "cube",
      loop: true,
      speed: 1200,
      grabCursor: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
    });

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
    });
})();
