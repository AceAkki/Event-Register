document.addEventListener("DOMContentLoaded", (fn) => {
  $("#header").load("header.html");

  const observer = new MutationObserver(() => {
    console.log("callback that runs when observer is triggered");
  });

  // call `observe()`, passing it the element to observe, and the options object
  observer.observe(document.querySelector("#header"), {
    subtree: true,
    childList: true,
  });
  
});
