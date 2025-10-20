document.addEventListener("DOMContentLoaded", () => {
  
  $("#header").load("header.html", function () {
    let headerHeight = document.querySelector(".container-fluid").getBoundingClientRect().height + 20;
    document.documentElement.style.setProperty("--header-height", `${Math.round(headerHeight)}px`);

    window.addEventListener("scroll", ()=>{
      if (scrollY > 20) {
        this.querySelector(".navbar").classList.add("glass-dark");
      } else {
        this.querySelector(".navbar").classList.remove("glass-dark");        
      }
    })
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
