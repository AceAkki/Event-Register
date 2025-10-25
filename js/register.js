// importing methods from anime.js for smoother animated transitions
import { animate, createTimeline, createTimer, text, stagger} from "https://cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.esm.min.js";
import { URLParam } from "./classURLParam.js";
import { URLBasedContent } from "./classURLBasedContent.js";
import { animeIntiate } from "./animeInIt.js";
import { DynamicFormValidator } from "./classForm.js";
import { Pagination } from "./classPagination.js";

const classURLParam = new URLParam();

(function init() {
  
  document.addEventListener("DOMContentLoaded", async (fn) => {
    const classURLContent = new URLBasedContent({cardsElmSelector:"#select-cards",
      proElmSelector:"#Professional", studElmSelector:"#Student", startElmSelector:"#Startup", hiddenClass:"hidden", 
      proBtnSelector:"#Pros", studBtnSelector:"#Students", startBtnSelector:"#StartUps"});
    classURLContent.initURLTracking();

    fetch(`json/data-JSON.json`)
      .then((response) => response.json())
      .then((data) => {
        const paginationMain = new Pagination({
          pageSize: 8,
          maxPageNum: 3,
          headerClassSelector: "navbar",
          itemClassSelector: "event-item-card",
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
    await loadHTML("./pro-sec.html", "#Professional");
    await loadHTML("./stud-sec.html", "#Student");
    await loadHTML("./startup-sec.html", "#Startup");
    
    initForms({addOptionsSelector:"#formIndustry", checkboxSelector:"#keyFocus", socialSelector: "#socialHandle", socialParent:"#socialGrp"});

    Array.from(document.querySelectorAll(".faq-container")).forEach(container => {
      animateFAQ({
        faqElem: container,
        selectorClass: "faq-item",
        answerClass: "faq-ans",
        hideClass: "hide",
      });
    })
  });


})();

async function loadHTML(apiURL, selector) {
  let htmlTxt = await fetchFile(apiURL);
  document.querySelector(selector).innerHTML = htmlTxt;
}

function initForms({param = "track", addOptionsSelector, checkboxSelector, socialSelector, socialParent }) {
  let [windowPath, params] = classURLParam.getURL();
  if (!params.has(param)) return;
  let formID = params.get(param).toLowerCase();
  const formClass = new DynamicFormValidator({
    formElem: document.querySelector(`#application-form-${formID}`),
    progressSection: document.querySelector(`#application-form-${formID} .comm-form`),
    progressSelector: ".form-section",
  });
  formClass.initForm();

  let industryOpt = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Consulting",
    "Other",
  ];
  let focusAreaOpt = [
    "AI & Innovation",
    "Cybersecurity",
    "Strategy & Leadership",
    "Digital Transformation",
    "Change Management",
    "Other",
  ];

  if (document.querySelector(addOptionsSelector)) {
    formClass.addOptions(document.querySelector(addOptionsSelector), industryOpt);
  }
  if (document.querySelector(checkboxSelector)) {
    formClass.addCheckBox({
      checkboxGrp: document.querySelector(checkboxSelector),
      array: focusAreaOpt,
      name: "focusArea",
    });
  }
  if (document.querySelector(socialSelector) && document.querySelector(socialParent)) {
    formClass.initializeSelectEvent({
      selectElem: document.querySelector(socialSelector),
      parentElem: document.querySelector(socialParent),
    });
  }
  // formClass.addOptions(document.querySelector("#formIndustry"), industryOpt);
  // formClass.addCheckBox({
  //   checkboxGrp: document.querySelector("#keyFocus"),
  //   array: focusAreaOpt,
  //   name: "focusArea",
  // });

  // formClass.initializeSelectEvent({
  //   selectElem: document.querySelector("#socialHandle"),
  //   parentElem: document.querySelector("#socialGrp"),
  // });
}

async function fetchFile(apiURL) {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// callback function to create Items
function generateItems(data) {
  let item = document.createElement("div");
  item.classList.add("col", "col-lg-3", "col-med-3", "col-sm-12", "my-3");
  item.innerHTML = `
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
  `;
  return item;
}


function searchFeature(data, parameter, inputElem, buttonElem) {
  let array = [];
  data.forEach((obj) => {
    //console.log(obj)
    array.push(obj[parameter]);
  });
  let uniqueArray = [...new Set(array)];
  uniqueArray.forEach((arr) => {
    let option = document.createElement("option");
    option.textContent = arr;
    document.querySelector(inputElem).appendChild(option);
  });
  document.querySelector(buttonElem).addEventListener("click", () => {
    let value = document.querySelector(inputElem).value;
    let searchData = data.filter((obj) => obj[parameter] === value);
    console.log(value);
    const paginationMain = new Pagination({
      pageSize: 8,
      maxPageNum: 3,
      headerClassSelector: "navbar",
      itemClassSelector: "event-item-card",
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

function animateFAQ({ faqElem, selectorClass, answerClass, hideClass }) {
  //selects all answer class and except the first one rest are hidden
  Array.from(faqElem.getElementsByClassName(answerClass)).forEach((elem, index) => {
      if (index > 0) elem.classList.add(hideClass);
    }
  );

  // event is deleagated to parent element of faq container
  faqElem.addEventListener("click", (event) => {
    let baseHeight = 20;
    let clickedFAQ = event.target.closest(`.${selectorClass}`);
    //console.log(clickedFAQ, !clickedFAQ.getElementsByClassName(hideClass)[0], hideClass)
    if (clickedFAQ) {
      let mainHeight = Math.round(clickedFAQ.getBoundingClientRect().height);
      let ansElm = clickedFAQ.getElementsByClassName(answerClass)[0];
      let ansHeight;
      let targetHeight = mainHeight + baseHeight;
      // with animejs animates the answer and parent
      if (ansElm.classList.contains(hideClass)) {
        ansElm.classList.remove(hideClass);
        ansHeight = Math.round(ansElm.getBoundingClientRect().height);
        animate(ansElm, {
          opacity: [{ from: 0, to: 1, ease: "inOutCirc", duration: 900 }],
        });
        animate(clickedFAQ, {
          height: [
            {
              from: mainHeight,
              to: targetHeight + ansHeight,
              ease: "inOutSine",
              duration: 700,
            },
          ],
        });
      } 

      Array.from(faqElem.getElementsByClassName(answerClass)).forEach((elem) => {
        let faqItem = elem.closest(`.${selectorClass}`);
        // hides other faq that were open
        if (clickedFAQ !== faqItem) {
          let faqHeight = faqItem.getBoundingClientRect().height;
          let ansHeight = elem.getBoundingClientRect().height;
          let targetHeight = ansHeight === 0 ? faqHeight : faqHeight - ansHeight - baseHeight;
          elem.classList.add(hideClass);
          animate(faqItem, {
            height: [
              {
                to: targetHeight,
                ease: "inOutSine",
                duration: 700,
              },
            ],
          });
        }
      });
    }
  });
}
