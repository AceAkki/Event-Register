import { NAVBTN } from "./navBTN.js";

document.addEventListener("DOMContentLoaded", ()=> {
  $("#header").load("header.html", function () {

    //console.log(document.querySelector("#highBtn"));
   // NAVBTN.check(document.querySelector("#highBtn"));
  });

  AOS.init();
});

function scrollTo(element) {
  let headerOffset =
    document.querySelector(".navbar").getBoundingClientRect().height + 10;
  // element's position from top to viewport height
  let elementPosition = element.getBoundingClientRect().top;
  // we get position by minusing element position from header height
  let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

// const observer = new MutationObserver(() => {
//   console.log("callback that runs when observer is triggered");
// });

// observer.observe(document.querySelector("#header"), {
//   subtree: true,
//   childList: true,
// });
