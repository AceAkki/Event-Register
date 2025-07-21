class URLParam {
  param = "track";
  checkURL() {
     // destructuring to get the params
    let [windowPath, params] = this.getURL();
    const selectCards = document.querySelector("#select-cards");
    const docPro = document.querySelector("#Professional");
    const docStud = document.querySelector("#Student");
    const docStart = document.querySelector("#Startup");

    const docMap = {
      Pros: document.querySelector("#Professional"),
      Students: document.querySelector("#Student"),
      StartUps: document.querySelector("#Startup"),
    };

    Object.values(docMap).forEach((doc) => {
      if (!doc.classList.contains("hidden")) {
        doc.classList.add("hidden");
      }
    });

    if (params.has(this.param)) {
      let value = params.get(this.param);
      let selectedDoc = docMap[value];
      if (selectedDoc) {
        selectedDoc.classList.remove("hidden");
        selectCards.classList.add("hidden");
      }
    } else {
      if (selectCards.classList.contains("hidden")) {
        selectCards.classList.remove("hidden");
      }
    }
  }
  setURL() {
    // destructuring to get the params
    let [windowPath, params] = this.getURL();

    // maps with buttons 
    const btnMap = {
      Pros: document.querySelector("#Pros"),
      Students: document.querySelector("#Students"),
      StartUps: document.querySelector("#StartUps"),
    };

    // gets all keys of btnMap
    Object.keys(btnMap).forEach((key) => {
      // adds event listener to all buttons
      btnMap[key].addEventListener("click", () => {
        // sets URL param with destructured getURL()
        params.set(this.param, key);
        // gets window.origin, pathname and params
        const newURL = `${window.origin}${window.location.pathname}?${params}`;
        // replaces url with newURL
        window.history.replaceState({}, "", newURL);
        // runs check URL
        this.checkURL();
      });
    });
  }
  getURL() {
    // gets the location, gets search params
    return [window.location, new URLSearchParams(window.location.search)];
  }
}

export const URLParamClass = new URLParam ();