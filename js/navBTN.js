class NavBTN {
  
  params = new URLSearchParams(window.location.search);
  param = "nav";
  paramArr = ["highlights", "sectionJoin"];

  check(button) {
    button.addEventListener("click", () => {
      this.params.set(this.param, this.paramArr[0]);
      // if (!(window.location.href.includes("index"))) {
      //   window.location.replace(`index.html?${params}`);
      // } else {
      //   const newURL = `${window.origin}${window.location.pathname}?${params}`;
      //   // replaces url with newURL
      //   window.history.replaceState({}, "", newURL);
      //   paramScroll (params, param, paramArr);
      // }
    });

  }

  paramScroll(params, param, paramArr) {
    if (params.get(param) === paramArr[0]) {
      scrollTo(document.querySelector("#highlights"));
    } else if (params.get(param) === paramArr[1]) {
      scrollTo(document.querySelector("#sectionJoin"));
    }
  }

}

export const NAVBTN = new NavBTN;
