document.addEventListener("DOMContentLoaded", (fn) => {
  let param = "track";
  setURL();
  checkURL();

  function checkURL() {
     // destructuring to get the params
    let [windowPath, params] = getURL();
    const selectCards = document.querySelector("#select-cards");
    const docPro = document.querySelector("#Professional");
    const docStud = document.querySelector("#Student");
    const docStart = document.querySelector("#Startup");

    const docMap = {
      Pros: document.querySelector("#Professional"),
      Students: document.querySelector("#Student"),
      StartUps: document.querySelector("#Startup"),
    };

    Object.values(docMap).forEach((doc) => {
      if (!doc.classList.contains("hidden")) {
        doc.classList.add("hidden");
      }
    });

    if (params.has(param)) {
      let value = params.get(param);
      let selectedDoc = docMap[value];
      if (selectedDoc) {
        selectedDoc.classList.remove("hidden");
        selectCards.classList.add("hidden");
      }
    } else {
      if (selectCards.classList.contains("hidden")) {
        selectCards.classList.remove("hidden");
      }
    }
  }

  function setURL() {
    // destructuring to get the params
    let [windowPath, params] = getURL();

    // maps with buttons 
    const btnMap = {
      Pros: document.querySelector("#Pros"),
      Students: document.querySelector("#Students"),
      StartUps: document.querySelector("#StartUps"),
    };

    // gets all keys of btnMap
    Object.keys(btnMap).forEach((key) => {
      // adds event listener to all buttons
      btnMap[key].addEventListener("click", () => {
        // sets URL param with destructured getURL()
        params.set(param, key);
        // gets window.origin, pathname and params
        const newURL = `${window.origin}${window.location.pathname}?${params}`;
        // replaces url with newURL
        window.history.replaceState({}, "", newURL);
        // runs check URL
        checkURL();
      });
    });
  }


  // gets the current URL
  function getURL() {
    // gets the location, gets search params
    return [window.location, new URLSearchParams(window.location.search)];
  }

  const swiperSelect = new Swiper(".select-wrap", {
    slidesPerView: 3,
    spaceBetween: 60,
    speed: 1200,
    grabCursor: true,
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
      1280: {
        slidesPerView: 3,
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

  
  Array.from(document.querySelectorAll(".select-card")).forEach((card) => {
    let title = card.querySelector(".card-title");
    //let glow = card.querySelector(".card-glow");
    let bgImage = card.querySelector(".img-wrap");
    let mainImage = card.querySelector(".img");
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
      scale: { from: 0, to: 1 },
      rotate: 360,
      ease: "inOutCirc",
      duration: 2500,
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
