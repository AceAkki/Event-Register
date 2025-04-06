document.addEventListener("DOMContentLoaded", (fn) => {
  let param = "track";
  setURL();
  checkURL();

  function checkURL() {
    let [windowPath, params] = getURL();
    const selectCards = document.querySelector("#select-cards");
    const docPro = document.querySelector("#Professional");
    const docStud = document.querySelector("#Student");
    const docStart = document.querySelector("#Startup");

    const docMap = {
      Pros: docPro,
      Students: docStud,
      StartUps: docStart,
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
    let [windowPath, params] = getURL();

    const btnMap = {
      Pros: document.querySelector("#Pros"),
      Students: document.querySelector("#Students"),
      StartUps: document.querySelector("#StartUps"),
    };
    Object.keys(btnMap).forEach((key) => {
      btnMap[key].addEventListener("click", () => {
        params.set(param, key);
        const newURL = `${window.origin}${window.location.pathname}?${params}`;
        window.history.replaceState({}, "", newURL);
        checkURL();
      });
    });
  }

  function getURL() {
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
});
