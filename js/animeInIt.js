
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


class animeInIt {
initiateAnimation () {

animate("#join .title-wrap .title", {
  y: [
    { to: "-2.75rem", ease: "outExpo", duration: 600 },
    { to: 0, ease: "outBounce", duration: 800, delay: 100 },
  ],
  scale: { from: 0, to: 1 },
  ease: "inOutCirc",
  duration: 2000,
  delay: stagger(100),
  autoplay: onScroll({
    enter: "bottom top",
    leave: "top bottom",
    sync: "resume reset",
  }),
});
animate("#join .join-para", {
  scale: { from: 0, to: 1, ease: "inOutCirc", duration: 1000, delay: 500 },
  ease: "inOutCirc",
  duration: 2000,
  delay: 1000,
  autoplay: onScroll({
    enter: "bottom top",
    leave: "top bottom",
    sync: "resume reset",
  }),
});

let secondTitle = document.querySelector("#join .title-que-wrap .title");

animate("#join .title-que-wrap h4", {
  y: { to: "-2.75rem", to: 0, ease: "outExpo", duration: 600 },
  scale: { from: 0, to: 1 },
  ease: "inOutCirc",
  duration: 1000,
  autoplay: onScroll({
    enter: "bottom top",
    leave: "top bottom",
    sync: "resume reset",
  }),
});

Array.from(document.querySelectorAll(".join-card")).forEach((card) => {
  let title = card.querySelector(".card-title");
  //let glow = card.querySelector(".card-glow");
  let bgImage = card.querySelector(".card-image img:nth-child(1)");
  let mainImage = card.querySelector(".card-image img:nth-child(2)");
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
    ease: "inOutCirc",
    duration: 1500,
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

Array.from(document.querySelectorAll(".join-btns .button")).forEach((btn) => {
  animate(btn, {
    y: [{ from: "-2.75rem", to: "0", ease: "outExpo", duration: 600 }],
    scale: { from: 0, to: 1 },
    background: { to: "transparent" },
    "--empty--": [
      "#a294f9",
      "#414a4c",
      "#a294f9",
      "#414a4c",
      "#a294f9",
      "#414a4c",
      "#a294f9",
      "#a294f9",
      "#414a4c",
      "#a294f9",
      "#414a4c",
      "#a294f9",
      "#414a4c",
      "#a294f9",
    ],
    duration: 1500,
    delay: 1000,
    stagger: 100,
    ease: "inOutCirc",
    autoplay: onScroll({
      sync: "resume reset",
    }),
  });
});
}
}
export const animeIntiate = new animeInIt;


