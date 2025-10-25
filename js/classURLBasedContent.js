/*
Author : Akshay P
Last Modified On :  2025 OCT 25th 
Last Modified By : Akshay P
Important : 
  - needs constructor parameters filled to work properly
  - needs URL Param class to set and track URL
Comments : provides three methods to hide or show content based on the url param
*/


import { URLParam } from "./classURLParam.js";
const classURLParam = new URLParam();

export class URLBasedContent {
    constructor({urlParam, cardsElmSelector, proElmSelector, studElmSelector, startElmSelector, hiddenClass, proBtnSelector, studBtnSelector, startBtnSelector}){
        this.param = urlParam || "track";
        this.cardsSelector = cardsElmSelector;
        this.proSelector = proElmSelector; 
        this.studSelector = studElmSelector; 
        this.startSelector = startElmSelector;
        this.hideClass = hiddenClass;
        
        this.proBtnSelector = proBtnSelector;
        this.studBtnSelector = studBtnSelector;
        this.startBtnSelector = startBtnSelector;
    }

    // initialize both check and set methods 
    initURLTracking () {
        this.checkTrackURL();
        this.setTrackURL();
    }

    // creates docMap then adds or removed hideClass depending on the URL param
    checkTrackURL() {
        let [windowPath, params] = classURLParam.getURL();
        const selectCards = document.querySelector(this.cardsSelector);
        // maps all elems to corresponding keys
        const docMap = {
          Pros: document.querySelector(this.proSelector),
          Students: document.querySelector(this.studSelector),
          StartUps: document.querySelector(this.startSelector),
        };
        /* 
        Array.from(document.querySelectorAll(contentClass).forEach(elm => {
          elm.getAttribute("id")
        }))
        */
    
        Object.values(docMap).forEach((doc) => {
          if (!doc.classList.contains(this.hideClass)) {
            doc.classList.add(this.hideClass);
          }
        });
    
        if (params.has(this.param)) {
          let value = params.get(this.param);
          console.log(value);
          let selectedDoc = docMap[value];
          if (selectedDoc) {
            selectedDoc.classList.remove(this.hideClass);
            selectCards.classList.add(this.hideClass);
          }
        } else if (selectCards.classList.contains(this.hideClass)) {
          selectCards.classList.remove(this.hideClass);
        }
    }

    setTrackURL() {
        // maps with buttons
        const btnMap = {
          Pros: document.querySelector(this.proBtnSelector),
          Students: document.querySelector(this.studBtnSelector),
          StartUps: document.querySelector(this.startBtnSelector),
        };
    
        // gets all keys of btnMap
        Object.keys(btnMap).forEach((key) => {
          // adds event listener to all buttons
          btnMap[key].addEventListener("click", () => {
            // sets URL param with destructured getURL()
            classURLParam.setURL(this.param, key);
            this.checkTrackURL();
          });
        });
      }
}