// importing methods from anime.js for smoother animated transitions
import { animate, createTimeline, createTimer, text, stagger} from 'https://cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.esm.min.js'; 
import { URLParam } from "./classURLParam.js";
import { animeIntiate } from "./animeInIt.js";
import { DynamicFormValidator } from "./classForm.js";
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

        searchFeature(data, "track", "#eventTrack", `#searchBtn`); 
        searchFeature(data, "category", "#eventCategory", `#searchBtn`); 

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
      speed: 1200,
      grabCursor: true,
      // autoplay: {
      //   delay: 1000,
      //   disableOnInteraction: false,
      // },
      breakpoints: {
        360: {
          slidesPerView: 1,
          spaceBetween: 50,
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

     const formClass = new DynamicFormValidator ({
      formElem :document.querySelector("#application-form"),
      progressSection : document.querySelector("#application-form .comm-form"),
      progressSelector : ".form-section",
    });

    let industryOpt = [ "Technology", "Finance", "Healthcare", "Education", "Manufacturing", "Consulting", "Other"];        
    let focusAreaOpt = ["AI & Innovation", "Cybersecurity", "Strategy & Leadership", "Digital Transformation", "Change Management", "Other"];
    
    formClass.addOptions(document.querySelector("#formIndustry"), industryOpt);
    formClass.addCheckBox({checkboxGrp: document.querySelector("#keyFocus"), array:focusAreaOpt, name:"focusArea"});
    formClass.initializeSelectEvent({selectElem:document.querySelector("#socialHandle"), parentElem:document.querySelector("#socialGrp")})
    formClass.initForm();

    faq({faqElem:document.querySelector(".faq-container"), selectorClass:"faq-item", answerClass:"faq-ans", hideClass:"hide"})
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
      console.log(value)
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
      checkTrackURL ();
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


function searchFeature(data, parameter, inputElem, buttonElem) {
  let array = [];
  data.forEach(obj => {
    //console.log(obj)
    array.push(obj[parameter]);
  });
  let uniqueArray = [...new Set(array)];
  uniqueArray.forEach(arr => {
    let option = document.createElement("option");
    option.textContent = arr;
    document.querySelector(inputElem).appendChild(option)
  })
  document.querySelector(buttonElem).addEventListener("click", ()=> {
    let value = document.querySelector(inputElem).value;
    let searchData = data.filter(obj => obj[parameter] === value);
    console.log(value)
    const paginationMain = new Pagination({
          pageSize: 8,
          maxPageNum: 3,
          headerClassSelector : "navbar",
          itemClassSelector : "event-item-card",
          enableSortList: true,
          itemCreator: generateItems,
        });
    paginationMain.initiatePagination(
          searchData,
          document.querySelector(".pagination"),
          document.querySelector(".event-wrap")
        );
  });
}


function faq({faqElem, selectorClass, answerClass, hideClass}){  
  //selects all answer class and except the first one rest are hidden
  Array.from(faqElem.getElementsByClassName(answerClass)).forEach((elem,index) => { if (index > 0) elem.classList.add(hideClass)});
  // event is deleagated to parent element of faq container
  faqElem.addEventListener("click", (event)=> {
    if (event.target.closest(`.${selectorClass}`)) {
      Array.from(faqElem.getElementsByClassName(answerClass)).forEach(elem => {
        elem.classList.add(hideClass);
        //elem.closest(`.${selectorClass}`).removeAttribute("style");
        animate(elem.closest(`.${selectorClass}`), {
          height:[{to: 86, ease: 'inOutSine', duration: 900 }],
        })
      });
      
      let mainElm = event.target.closest(`.${selectorClass}`);
      let mainHeight = Math.round(mainElm.getBoundingClientRect().height);
      let ansElm = mainElm.getElementsByClassName(answerClass)[0];
      let ansHeight;
      let targetHeight = mainHeight + 20;

      
      if (ansElm.classList.contains(hideClass)) {
        ansElm.classList.remove(hideClass);
        ansHeight = Math.round(ansElm.getBoundingClientRect().height);
        animate(ansElm, {
          opacity:[{from:0, to:1, ease: 'inOutSine', duration: 900 }],
        });
        animate(event.target.closest(`.${selectorClass}`), {
          height:[{from: mainHeight ,to: targetHeight + ansHeight, ease: 'inOutSine', duration: 900 }],
        })
      }  
    }
  });
}
