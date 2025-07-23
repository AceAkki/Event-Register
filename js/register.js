import { URLParamClass} from "./classURLParam.js";
import { animeIntiate } from "./animeInIt.js";
import { formClass } from "./classForm.js";


(function init () {
  document.addEventListener("DOMContentLoaded", (fn) => { 
    URLParamClass.checkURL();
    URLParamClass.setURL();
    
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

    formClass.proForm(document.querySelector("#formIndustry"), document.querySelector("#keyFocus"));
 
  });

})()
