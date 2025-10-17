document.addEventListener("DOMContentLoaded", () => {
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
  // (async function() {
  //   const data = {
  //     labels: [
  //       'Industry Professionals',
  //       'Academic Community',
  //       'Entrepreneurs & Innovators'
  //     ],
  //     datasets: [{
  //       data: [45, 30, 25],
  //       backgroundColor: [
  //         '#474e93',
  //         '#7e5cad',
  //         '#a294f9'
  //       ],
  //       hoverOffset: 4
  //     }]
  //   };
  
  //   new Chart(
  //     document.getElementById('who-chart'),
  //     {
  //       type: 'pie',
  //       data: data,
  //     }
  //   );

    
  // })();

     animate(".title-wrap .title", {
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
})