document.addEventListener("DOMContentLoaded", (fn) => {
  $("#header").load("header.html");
  AOS.init();

  const observer = new MutationObserver(() => {
    console.log("callback that runs when observer is triggered");
    document.querySelector("#highBtn").addEventListener("click", ()=> {
      scrollTo(document.querySelector("#highlights"));
    })
    document.querySelector("#confBtn").addEventListener("click", ()=> {
      scrollTo(document.querySelector("#sectionJoin"));
    })
  });

  // call `observe()`, passing it the element to observe, and the options object
  observer.observe(document.querySelector("#header"), {
    subtree: true,
    childList: true,
  });



  function scrollTo(element) {
    let headerOffset = document.querySelector(".navbar").getBoundingClientRect().height + 10;
    // element's position from top to viewport height
    let elementPosition = element.getBoundingClientRect().top;
    // we get position by minusing element position from header height
    let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
});
