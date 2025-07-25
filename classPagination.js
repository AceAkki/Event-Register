import {classURLParam} from "./classURLParam1.js";

export class Pagination {
  constructor({pageSize, maxPageNum, enableSortList, itemCreator, itemClassSelector, headerClassSelector, param}) {
    this.pageSize = pageSize || 10;   // page elements count
    this.currentPage = 0; // starts with 0    
    this.defaultPage = 1;  
    this.maxPageNum = maxPageNum || 4;  // max page numbers visible to users    
    this.enableSortList = enableSortList || false;
    this.itemClassSelector = itemClassSelector || "univ-list-item"; //class
    this.headerClass = headerClassSelector || "header-box";
    this.param = param || "page";
    this.itemCreator = itemCreator;

    this.paginatedData = [];
    this.navigationArrays = [];  
  }

  // -----------------------------------------------------------------------------------------

  // parameters - data (array), navigation element, container to display data
  initiatePagination(data, pageNavElm, container) {
    this.paginatedData = [];
    this.navigationArrays = [];  
    if ((Array.isArray(data)) && data.length > 0 ) {
      (this.enableSortList) ? this.sortList(data) : console.log("Data Not Sorted, Enable with [ enableSortList:true ]"); 
      for (let i = 0; i < data.length; i += this.pageSize) {
        // creates and pushes mini array's of data to paginatedData
        this.paginatedData.push(data.slice(i, i + this.pageSize));
      }
      // populates all elements, navigation
      this.populateAll(pageNavElm, container);
      this.checkURL(pageNavElm, container);  
    } else {
      console.log(`Failed to load Data - ${data}`)
    }
  }

  sortList(data) {
    let getKeys = Object.keys(data[0]);
    let stringKey = getKeys.find(key => {
      return typeof(key) === "string" && !(data[0][key].includes("/")) 
    })
    if (stringKey) {
      data.sort((a, b) => a[stringKey].localeCompare(b[stringKey]) );
    } else {
      console.log("No Valid String found to sort the data")
    }
  }

  checkURL(pageNavElm, container) {
    let [windowPath, params] = classURLParam.getURL();
    if (params.has(this.param)) {
      let currentParam = parseInt(params.get(this.param));
      isNaN(currentParam) || currentParam < 0 ? currentParam = 1 : currentParam = currentParam;
      let getActivePage = Array.from(pageNavElm.querySelectorAll("li a.page-num")).find(elm => parseInt(elm.dataset.value) === currentParam);
      if (getActivePage) {
        pageNavElm.querySelectorAll("a.active").forEach((elm) => elm.classList.remove("active"));
        getActivePage.classList.add("active");  
        classURLParam.setURL(pageNavElm, this.param);
        this.populateItems(container, currentParam);
        this.scrollToElement(container.querySelector(`.${this.itemClassSelector}`));
      };
      if (currentParam && !(getActivePage)) {
        if (!(currentParam > this.paginatedData.length)) {
          let tempNum = currentParam - 1;
          let indexNum;
          Array.from(this.navigationArrays.map(arr => arr.indexOf(tempNum))).forEach((elem, index) => {
            if (elem > -1) {
              indexNum = index;
            }
          });
          this.populateSections(pageNavElm, container, indexNum, parseInt(params.get(this.param)));
        } else {
          classURLParam.setURL(pageNavElm, this.param);
          this.populateSections(pageNavElm, container, this.currentPage, this.currentPage);
        }
      };
    }
  }

  populateSections (pageNavElm, container, indexNum, indexNum1) {
    this.populateItems(container, indexNum1);
    this.populatePageNums(pageNavElm, indexNum);
    this.addEventListenerPageNav(pageNavElm, container);
    this.checkURL(pageNavElm, container);  
    this.scrollToElement(container.querySelector(`.${this.itemClassSelector}`));
  }

  populateAll(pageNavElm, container) {
    // adds prev Nav button
    this.addPrevNav(pageNavElm);
    for (let i = 0; i < this.paginatedData.length; i += this.maxPageNum) {
      // creates array from length size of paginatedData then pushes mini array's to navigationArrays
      this.navigationArrays.push(Array.from(Array(this.paginatedData.length).keys()).slice(i, i + this.maxPageNum));
    }
    // pageNums are created, initiatin with 0
    this.populatePageNums(pageNavElm, this.currentPage);
    // unis are poppulated based on the number provided by active class's textcontent
    this.populateItems(container, parseInt(pageNavElm.querySelector("a.active").dataset.value));
    // adds page Nav
    setTimeout( ()=>{ this.addEventListenerPageNav(pageNavElm, container)}, 100 );
  }

  // populates all unis
  populateItems(container, num) {
    let itemArray = this.paginatedData[num-1];
    if (itemArray) {
      container.innerHTML = "";
      if(typeof(this.itemCreator) === "function") {
        const fragment = document.createDocumentFragment();
        itemArray.forEach((item) => {

          let createItem = this.itemCreator(item);
          console.log(createItem)
          fragment.appendChild(createItem);
        });
        container.appendChild(fragment);
      } else {
        console.error(`${this.itemCreator} is not a function`)
      }

    };
    // this.paginatedData.forEach((arr, index) => {
    //     // minus 1 from num to compare to index
    //     if (num - 1 === index) {
    //     // removes all current items 
    //     container.querySelectorAll(`.${this.itemClassSelector}`).forEach((uni) => uni.remove());
    //     // creates elements from the array 
    //     arr.forEach((elem) => {
    //       let createA = document.createElement("a");
    //       createA.classList.add(`${this.itemClassSelector}`);
    //       createA.setAttribute("href",`${elem.uniName.toLowerCase().split(" ").join("-")}.html`);
    //       let divLogo = document.createElement("div");
    //       divLogo.classList.add("univ-logo");
    //       let imgLogo = document.createElement("img");
    //       imgLogo.setAttribute("src", elem.imageURL);
    //       let h3Title = document.createElement("h3");
    //       h3Title.classList.add("univ-name");
    //       h3Title.textContent = elem.uniName;
    //       container.appendChild(createA);
    //       createA.appendChild(divLogo);
    //       divLogo.appendChild(imgLogo);
    //       createA.appendChild(h3Title);

    //       ['mouseover', 'touchstart', 'mouseout', 'touchend'].forEach(eventType => {
    //         if (eventType === 'mouseover' || eventType === "touchstart") {
    //           createA.addEventListener(eventType, function() {            
    //             createA.style.boxShadow = '0px 0px 20px 2px rgba(29,66,141,0.25)';
    //           });    
    //         } else {
    //           createA.addEventListener(eventType, function() {
    //             createA.style.boxShadow = '';      
    //           });
    //         }
    //       });
    //     });
    //   }
    // });
  }

  // populate page nums
  populatePageNums(pageNavElm, num) {
    // remove all li elems
    pageNavElm.querySelectorAll("li").forEach((liElm) => liElm.remove());
    let indexNum;
    num < 0 ? indexNum = 0 : indexNum = num;
    console.log(indexNum)
    // if num is bigger add prevNav button    
    if (indexNum > 0) { this.addPrevNav(pageNavElm) };
    // craeted nav from navigationArrays 
    this.navigationArrays[indexNum].forEach((a, index) => {
        this.currentPage = indexNum;
        let createLi = document.createElement("li");
        let createHref = document.createElement("a");
        createLi.style.cursor = "pointer";
        createHref.textContent = a + 1;
        createHref.setAttribute("data-value", a + 1);
        createHref.classList.add("page-num");
        if (index === 0) {
          createHref.classList.add("active");
        } 
        pageNavElm.appendChild(createLi);
        createLi.appendChild(createHref);
    });
    // num + 2 to match 0 index with navigationArrays length, adds next Button 
    if (indexNum + 2 <= this.navigationArrays.length) { this.addNextNav(pageNavElm) };
  }

  // add page navigation
  addEventListenerPageNav(pageNavElm, container)  {
    // selects all li elements of page navigation
    pageNavElm.querySelectorAll("li").forEach((liElm) => {
        // adds click event listener
        liElm.addEventListener("click", () => {        
        // removes all active classes
        pageNavElm.querySelectorAll("a.active").forEach((elm) => elm.classList.remove("active"));
        // if it's left arrow or back arrow
        if (liElm.querySelector("i") && liElm.querySelector("i").classList.contains("ph-arrow-left")) {
            liElm.remove(); // removes it
            // populates all page nums with parameter that minus 1 from current page value        
            this.populatePageNums(pageNavElm, this.currentPage - 1);
            // adds page navigation
            this.addEventListenerPageNav(pageNavElm, container);
            // scrolls to first element of the list
            this.scrollToElement(container.firstElementChild);
        }
        // if it's right arrow or next arrow
        if (liElm.querySelector("i") && liElm.querySelector("i").classList.contains("ph-arrow-right")) {
            liElm.remove();            
            this.populatePageNums(pageNavElm, this.currentPage + 1);
            this.addEventListenerPageNav(pageNavElm, container);
            this.scrollToElement(container.firstElementChild);
        }
        // adds active class to the element
        liElm.querySelector("a").classList.add("active");
        // populate unis based on the active num
        this.populateItems(container, parseInt(pageNavElm.querySelector("a.active").dataset.value));
        this.scrollToElement(container.firstElementChild);
        classURLParam.setURL(pageNavElm, this.param);
        });
    });
  }

  // scrolls to the element
  scrollToElement (element) {
    if (element) {
      var headerOffset = document.querySelector(`.${this.headerClass}`).getBoundingClientRect().height + 10;
      // element's position from top to viewport height
      var elementPosition = element.getBoundingClientRect().top;
      // we get position by minusing element position from header height
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      setTimeout(()=> {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 100)
    } else {
      console.error(`Failed to find element - ${element}`)
    }
  }

  addPrevNav(pageNavElm) {
    let createLi = document.createElement("li");
    createLi.innerHTML = `<a class="nav"><i class="ph ph-arrow-left"></i> </a>`;
    pageNavElm.appendChild(createLi);
  }

  addNextNav(pageNavElm){
    let createLi1 = document.createElement("li");
    createLi1.innerHTML = `<a class="nav"><i class="ph ph-arrow-right"></i></a>`;
    pageNavElm.appendChild(createLi1);
  }

}

