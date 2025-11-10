import { AnimeMain } from "./classAnime.js";
const classAnime = new AnimeMain();
export class SectionNav {
  constructor({heroSelector, navSelector, sectionsSelector}){
    this.heroSec = heroSelector;
    this.navSec = navSelector;
    this.secSelctor = sectionsSelector;
  }
  initSecNavigation() {
    let aboutSecHeight = document.querySelector(this.heroSec).getBoundingClientRect().height;
    let navWrap = document.querySelector(this.navSec);
    let navSec = Array.from(document.querySelectorAll(this.secSelctor));
    window.addEventListener("scroll", () => {
      this.createSecNavigation(aboutSecHeight, navWrap, navSec);
      this.trackNav(navSec, navWrap);
    });
  }

  trackNav(navArr, navElem) {
    let section = navArr.find((sec) => {
      let secRect = sec.getBoundingClientRect();
      if (secRect.top <= window.innerHeight / 2 &&secRect.bottom >= window.innerHeight / 2) {
        return sec;
      }
    });
    if (section) {
      let secID = section.getAttribute("id");
      //console.log(secID);
      Array.from(navElem.children).forEach((nav) => {
        nav.classList.remove("active");
        if (nav.querySelector("a").getAttribute("href") === `#${secID}`) {
          nav.classList.add("active");
        }
      });
    }
    let activeNav = navElem.querySelector(".active");
    if (activeNav) {
      // Get the position of the active nav item
      const activeNavRect = activeNav.getBoundingClientRect();
      const containerRect = navElem.getBoundingClientRect();
      if (activeNavRect.left < containerRect.left ||activeNavRect.right > containerRect.right) {
        navElem.scrollLeft = activeNavRect.left - containerRect.left - 20 + navElem.scrollLeft;
      }
    }
  }

  createSecNavigation(heroElmHeight, navElem, navArr) {
    //console.log(scrollY >= heroElmHeight && navElem.children.length <= 0);
    if (scrollY >= heroElmHeight && navElem.children.length <= 0) {
      navElem.classList.add("glass-white", "scroll-nav");
      navArr.forEach((sec) => {
        let navDiv = document.createElement("div");
        let navLink = document.createElement("a");
        navLink.setAttribute("href", `#${sec.getAttribute("id")}`);
        navLink.textContent = sec.getAttribute("id");
        navDiv.appendChild(navLink);
        navElem.appendChild(navDiv);
        //console.log(navDiv)
      });
      classAnime.animateFadeIn(navElem, 1000);
    } else if (scrollY <= heroElmHeight && navElem.children.length > 0) {
        console.log(
            'delete'
        )
      classAnime.animateFadeOut(navElem, 100);
      setTimeout(() => {
        navElem.classList.remove("glass-white", "scroll-nav");
        navElem.innerHTML = "";
      }, 400);
    }
  }
}
