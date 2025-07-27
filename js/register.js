import { URLParam } from "./classURLParam.js";
import { animeIntiate } from "./animeInIt.js";
import { formClass } from "./classForm.js";
import { Pagination } from "./classPagination.js";

(function init() {
  const classURLParam = new URLParam ();

  document.addEventListener("DOMContentLoaded", (fn) => {
    checkTrackURL ()
    setTrackURL ()

    fetch(`json/data-JSON.json`)
      .then((response) => response.json())
      .then((data) => {
        const paginationMain = new Pagination({
          pageSize: 8,
          maxPageNum: 3,
          headerClassSelector : "navbar",
          itemClassSelector : "event-item-card",
          enableSortList: true,
          itemCreator: generateItems,
        });

        paginationMain.initiatePagination(
          data,
          document.querySelector(".pagination"),
          document.querySelector(".event-wrap")
        );
      })
      .catch((err) => {
        console.error(`Failed Operations due to : ${err}`);
      });

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

    animeIntiate.animateRegister();

    formClass.proForm(
      document.querySelector("#formIndustry"),
      document.querySelector("#keyFocus")
    );
  });
  
  
  function checkTrackURL (param = "track") {
    let [windowPath, params] = classURLParam.getURL();
    const selectCards = document.querySelector("#select-cards");
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

  function setTrackURL (param = "track") {
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
      classURLParam.setURL(param, key);
    });
  });
  }

})();


// callback function to create Items
function generateItems (data) {
  let item = document.createElement("div");
  item.classList.add("col", "col-lg-3", "col-med-3", "col-sm-12", "my-3");
  item.innerHTML =`
  <div class="event-item-card">
    <h3 class="event-title"> ${data.title}</h3>
      <p class="event-desc">
        ${data.description}
      </p>
      <p>
        <strong> Date:</strong>
        <span class="event-date"> ${data.date} </span>
      </p>
      <div>
        <h4 class="event-speaker">
          ${data.speaker} 
        </h4>
        <p>
          <strong> Track :</strong>
          <span class="track"> ${data.track} </span>
        </p>      
        <h5 class="event-category">
          ${data.category}
        </h5>
      </div>
  </div>
  ` 
  return item;
}


