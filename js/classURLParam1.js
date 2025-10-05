class URLParam {
  setURL(btnArray, param) {
    let [windowPath, params] = this.getURL(); // destructuring
    if (params.has(param)) {
      params.delete(param);
    }
    if (btnArray.querySelector("a.active")) {
      params.set(param, parseInt(btnArray.querySelector("a.active").dataset.value));
      let newURL = `${window.origin}${window.location.pathname}?${params.toString()}`; // using origin and pathname keeps this clean
      window.history.replaceState({}, "", newURL);
    }
  }

  getURL() {
    let windowPath = window.location;
    const params = new URLSearchParams(windowPath.search);
    return [windowPath, params];
  }
}

export const classURLParam = new URLParam();
