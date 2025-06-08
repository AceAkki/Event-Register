
  // Populate the Select field
  let statesArry = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Dadra and Nagar Haveli",
    "Daman & Diu",
    "Delhi",
    "Chandigarh",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];
  let statesElem = document.querySelector("#studyState");
  statesArry.forEach((state) => {
    let option = document.createElement("option");
    option.textContent = state;
    option.setAttribute("value", state);
    statesElem.appendChild(option);
  });

  // Add or remove the social handle input
  let socialGrp = document.querySelector("#socialGrp");
  let socialElem = document.querySelector("#socialHandle");
  socialElem.addEventListener("input", (fn) => {
    let value = socialElem.value; // gets value
    addInput(value);
  });

  function addInput(value) {
    if (!(value === "0")) {
      // if element with id of value doesnt exist it creates it
      if (!document.getElementById(value)) {
        // create main div
        let div = document.createElement("div");
        div.classList.add("w25", "w-1200-100");
        socialGrp.parentNode.appendChild(div);
        div.parentNode.insertBefore(div, socialGrp.nextSibling); // insert after the div that exists

        let divGrp = document.createElement("div");
        divGrp.classList.add("form-grp", "inputURL-main");
        div.appendChild(divGrp);
        let divWrap = document.createElement("div");
        divWrap.classList.add("form-field", "inputURL-wrap");
        divGrp.appendChild(divWrap);

        let inputElem = document.createElement("input");
        inputElem.setAttribute("type", "text");
        inputElem.classList.add("form-field");
        inputElem.setAttribute("id", value);
        inputElem.setAttribute("name", value);
        inputElem.setAttribute("placeholder", `Type ${value} URL`);
        let spanElem = document.createElement("span");
        let iElem = document.createElement("i");
        spanElem.setAttribute("title", "Cancel");
        iElem.classList.add("ph", "ph-x-circle");
        divWrap.appendChild(inputElem);
        divWrap.appendChild(spanElem);
        spanElem.appendChild(iElem);

        // animates div on creation
        animate(div, {
          scale: { from: 0.0, to: 1 },
          ease: "outCubic",
          duration: 300,
        });

        spanElem.addEventListener("click", (fn) => {
          // animates div before deletion
          animate(div, {
            scale: { from: 1, to: 0 },
            ease: "outCubic",
            duration: 500,
          });
          // deletes the div soon after
          setTimeout((one) => {
            spanElem.parentNode.parentNode.parentNode.remove();
          }, 200);
        });
        document.getElementById(value).focus();
      }
      // else it focus on that element
      else {
        document.getElementById(value).focus();
        // console.log(document.getElementById(value));
      }
    }
  }
  const { animate, createTimeline, createTimer, createSpring } = anime;

  // let formElem = document.querySelector("#ambform");
  // validateForm(formElem);

  // function to validate Form
  function validateForm(form) {
    form.addEventListener("submit", (event) => {
      let isValid = true;
      const fields = event.target.querySelectorAll("input, select");

      // looping all input and select fields
      fields.forEach((field) => {
        // for url input
        let getParent = field.closest(".inputURL-wrap");
        let hasError = false;

        // checks if empty or 0
        if (field.value.trim() === "" || field.value === "0") {
          hasError = true;
        }
        // for email and tel
        if (!hasError) {
          if (
            field.type === "email" &&
            !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
              field.value
            )
          ) {
            hasError = true;
          }
          if (
            field.type === "tel" &&
            field.value.length <= 10 &&
            !/^[\]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
              field.value
            )
          ) {
            hasError = true;
          }
        }

        // shows error message
        if (hasError) {
          if (!getParent) {
            field.classList.add("error-field");
            if (!field.parentNode.querySelector(".error-msg")) {
              adderrMsg(field);
            }
          }
          if (getParent) {
            getParent.classList.add("error-field");
            if (!getParent.parentNode.querySelector(".error-msg")) {
              adderrMsg(field, field.type, getParent);
            }
          }
        }

        // on input removes the error message
        field.addEventListener("input", () => {
          if (!(field.value.trim() === "")) {
            if (field.classList.contains("error-field")) {
              field.classList.remove("error-field");
            }
            if (field.parentNode.querySelector(".error-msg")) {
              field.parentNode.querySelector(".error-msg").remove();
            }
            if (getParent) {
              field.parentNode.classList.remove("error-field");
              getParent.parentNode.parentNode
                .querySelector(".error-msg")
                .remove();
            }
          }
        });
      });

      // checks if error exist, focuses on that elem and flags invalid, error
      if (event.target.querySelector(".error-field")) {
        event.target.querySelector(".error-field").focus();

        isValid = false;
        hasError = true;
      }

      // prevents submit until condition is met
      if (!isValid && hasError) {
        event.preventDefault();
      }
    });
  }

  // adds error message - form validation
  function adderrMsg(field, fieldtype, getParent) {
    fieldtype = field.type;
    let errMsg = document.createElement("p");
    errMsg.classList.add("error-msg");
    if (field.value === "0") {
      // errMsg.textContent = field.querySelector("option").textContent.trim();
      errMsg.textContent = "Please select one option";
    } else {
      // placeholder text warning
      // errMsg.textContent = field.getAttribute("placeholder");
      // generic warning
      errMsg.textContent = "Please fill out this field.";
    }
    if (fieldtype === "tel") {
      errMsg.textContent = "Type Correct Mobile Number";
    }
    if (fieldtype === "email") {
      errMsg.textContent = "Type Correct Email ID";
    }
    if (getParent) {
      getParent.parentNode.appendChild(errMsg);
    } else {
      field.parentNode.appendChild(errMsg);
    }
  }

  
  let msg = document.querySelector("#lblmsg");  
  setTimeout(()=> {
    //msg.textContent = "Form Submitted Successfully!"
    if (msg.textContent.length > 1) {
      scrollTo(msg);
    }
  },1000);

  function scrollTo(element) {
    if (element) {
      var headerOffset =
        document.querySelector(".header-box").getBoundingClientRect().height +
        200;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }