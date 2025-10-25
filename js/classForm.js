// importing methods from anime.js for smoother animated transitions
import { animate, createTimeline, createTimer, text, stagger} from 'https://cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.esm.min.js'; 

export class DynamicFormValidator {
    constructor({formElem, progressSection, progressSelector, errFieldClass, errMessageClass}) {
        this.form = formElem;
        this.sectionParent = progressSection;
        this.sectionSelector = progressSelector;
        this.errClass = errFieldClass || "error-field";
        this.errMsgClass = errMessageClass || ".error-msg";
    }

    // initializes validation for the form including radio and checkbox events and form progress feature
    initForm() {
        let radioCheckboxGroups = this.initializeRadioCheckboxEvents(this.form);
        this.initializeFormProgress({})
        this.form.addEventListener("submit", (event)=> {
            this.validateForm({section: this.form, onValidFn:this.formSubmission, validfnParam: this.form, onInvalidFn: this.preventFormSumbmission, invalidfnParam:event, radioArr: radioCheckboxGroups.get("radio"), checkboxArr:radioCheckboxGroups.get("checkbox")});
        });

    }

    // creates option elems from array provided
    addOptions (selectElm, array) {
        if (selectElm.tagName === "SELECT") {
            array.forEach(industry => {
                let opt = document.createElement("option");
                opt.textContent = industry;
                opt.setAttribute("value", industry);
                selectElm.appendChild(opt);
            })           
        }
    }

    // creates checkbox elems from array provided
    addCheckBox({checkboxGrp, array, name}) {        
        if (checkboxGrp.tagName === "DIV") {
            array.forEach(focus => {
                let div = document.createElement("div");
                div.classList.add("checkbox-grp-wrap");
                let checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                let label = document.createElement("label");
                label.textContent = focus;
                label.setAttribute("for", focus.toLowerCase().replace(/\s+/g,""));
                checkBox.setAttribute("id", focus.toLowerCase().replace(/\s+/g,""));
                checkBox.setAttribute("name", name)
                checkboxGrp.appendChild(div);
                div.appendChild(checkBox);
                div.appendChild(label);
            })
        }
    }

    initializeSelectEvent({selectElem, parentElem}) {
        selectElem.addEventListener("input", (fn) => {
            let elmValue = selectElem.value; // gets value
            this.addInputField({parentElem:parentElem, value:elmValue});
        });
    }

    addInputField({parentElem, value, fieldClasslist, }){
        if (!(value === "0")) {
            // if element with id of value doesnt exist it creates it
            if (!document.getElementById(value)) {
              // create main div
              let div = document.createElement("div");
              div.classList.add("w25", "w-1200-100");
              parentElem.parentNode.appendChild(div);
              div.parentNode.insertBefore(div, parentElem.nextSibling); // insert after the div that exists
      
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
              inputElem.setAttribute("placeholder", `Type ${value} URL/ID`);
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

    // method creates buttons to navigate between forms
    initializeFormProgress({sectionParent, sectionSelector}) {
        let secParent = sectionParent;
        let secSelector = sectionSelector;
        if (this.sectionParent && this.sectionSelector) {
            secParent  = this.sectionParent; 
            secSelector = this.sectionSelector;
        } 
        if(!secParent || !secSelector) return       
        let sectionArray = secParent.querySelectorAll(secSelector);
        sectionArray.forEach((section, index) => {
            //console.log(index < sectionArray.length, index , sectionArray.length, index > 0)
            if (index + 1 < sectionArray.length) {
                this.createNavigationBtn(section, "Next")
            }
            if  (index > 0) {
                this.createNavigationBtn(section, "Previous")
            }
            if (index > 0) {
                section.classList.add("hide")
            }

        })
    }

    // adds event listeners to radio and checkbox and also returns groups
    initializeRadioCheckboxEvents(section) {
        let returnMap = new Map();
        let radioElemArr = [];
        if (section.querySelector("input[type=radio]")) {
            const radioGroups = [...new Set(Array.from(section.querySelectorAll("input[type=radio]")).map(field => field.name))];
            radioGroups.forEach(group => {
                let radioGroup = Array.from(section.querySelectorAll(`input[type=radio][name=${group}]`));
                radioGroup.forEach(radio => {
                    radio.addEventListener("click", ()=> {
                        radioGroup.forEach(radio => radio.checked = false);
                        radio.checked = true;
                    })    
                })
                radioElemArr.push(radioGroup);
            })
            if (radioElemArr.length >= 0) {
                returnMap.set("radio", radioElemArr);
            }
        }
        let checkBoxElemArr = [];
        if (section.querySelector("input[type=checkbox]")) {
            const checkBoxGroups = [...new Set(Array.from(section.querySelectorAll("input[type=checkbox]")).map(field => field.name))];
            checkBoxGroups.forEach(group => {
                let checkBoxGroup = Array.from(section.querySelectorAll(`input[type=checkbox][name=${group}]`));
                checkBoxGroup.forEach(checkBox => {
                    checkBox.addEventListener("click", ()=> {
                        checkBox.checked ? !checkBox.checked : checkBox.checked;
                    })    
                })
                checkBoxElemArr.push(checkBoxGroup);
            })
            if (checkBoxElemArr.length >= 0) {
                returnMap.set("checkbox", checkBoxElemArr);
            }
        }
        return returnMap;
    }
    
    validateForm({section, onValidFn, validfnParam, onInvalidFn, invalidfnParam, checkboxArr, radioArr}) {
        //if (typeof(func) !== "function") { console.log("func parameter should be a function"); return }
        let isValid = true;  

        if (radioArr) {
            this.validateGroupSection(radioArr, isValid);
        }
        if (checkboxArr) {
            this.validateGroupSection(checkboxArr, isValid);
        }
        
        const fields = section.querySelectorAll("input, select");
        fields.forEach((field) => {
            let hasError = false;
            if (field.value.trim() === "" || field.value === "0") {
                hasError = true;
            }            
            // for email and tel
            if (!hasError) {
                if ( field.type === "email" && 
                !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(field.value)) {
                    hasError = true;
                }
                if ( field.type === "tel" && field.value.length !== 10 &&
                !/^[\]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(field.value)) {
                    hasError = true;
                }
            }         

            // shows error message
            if (hasError && field.type !== "radio" && field.type !== "checkbox") {
                field.classList.add(this.errClass);
                if (!field.parentNode.querySelector(this.errMsgClass)) {
                  this.addErrorMessage(field);
                }
            }
            
            // on input removes the error message
            field.addEventListener("input", () => {
                if (!(field.value.trim() === "")) {
                  if (field.classList.contains(this.errClass)) {
                    field.classList.remove(this.errClass);
                  }
                  if (field.parentNode.querySelector(this.errMsgClass)) {
                    field.parentNode.querySelector(this.errMsgClass).remove();
                  }
                }
            });

            // checks if error exist, focuses on that elem and flags invalid, error
            if (section.getElementsByClassName("error-field")[0]) {
              section.getElementsByClassName("error-field")[0].focus();     
              isValid = false;
              hasError = true;
            }            
            // if error exists and options are empty then runs provided function
            if (hasError && onInvalidFn && typeof(onInvalidFn) === "function") {
                onInvalidFn(invalidfnParam);
            }
        });

        if (isValid && onValidFn && typeof(onValidFn) === "function") {
            onValidFn(validfnParam);
        }
    }

    async formSubmission(form) {
        let formData = new FormData(form)
        try {
            const response = await fetch("./json/empty.json", {
              method: "POST",
              body: formData,
            });
            console.log(await response.json());
            if (response.success) {
                console.log("Form submitted successfully!");
            
            } else {
                console.log("Form submission failed. Please try again.");
            }
          } catch (e) {
            console.log("An error occurred. Please try again.");   
          }
    }

    /* 
    --------------------------------------------------------------------
    Helper methods 
    --------------------------------------------------------------------
    */

    // helper method being used in initializeFormProgress to create buttons - next and previous that helps with navigation on form
    createNavigationBtn(section, type) {
        let radioCheckboxGroups = this.initializeRadioCheckboxEvents(section);
        let btnWrap; 
        if (!section.querySelector("btn-wrap")) {
            btnWrap = document.createElement("div");
            btnWrap.classList.add("btn-wrap");
            section.appendChild(btnWrap);
        } else { btnWrap = section.querySelector("btn-wrap") };
        let navBtn = document.createElement("div");
        navBtn.classList.add("btn", type);
        navBtn.textContent = type;
        btnWrap.appendChild(navBtn);
        if (type.toLowerCase() === "next") {
            navBtn.addEventListener("click", ()=> {
                this.validateForm({section:section, onValidFn:this.goToNextSection, validfnParam:{parentElm:section}, radioArr: radioCheckboxGroups.get("radio"), checkboxArr:radioCheckboxGroups.get("checkbox") })
            })
        } else if (type.toLowerCase() === "previous") {
            navBtn.addEventListener("click", ()=> {
                section.classList.add("hide");
                section.previousElementSibling.classList.remove("hide");
            })  
        }

    }
    
    // helper method being used in createNavigationBtn
    goToNextSection({parentElm}){
        parentElm.classList.add("hide");
        parentElm.nextElementSibling.classList.remove("hide");
    }

    validateGroupSection(arrayGroup, flag) {
        arrayGroup.forEach(arrGrp => {
            let checkedElem = arrGrp.find(elem => elem.checked);
            let grpParent = arrGrp[0].parentNode.parentNode;
            if (checkedElem && grpParent.classList.contains(this.errClass)) {
                grpParent.classList.remove(this.errClass);
                grpParent.querySelector(this.errMsgClass).remove();
            }

            if (!checkedElem) {
                flag = false;
                grpParent.classList.add(this.errClass);
                if (!grpParent.querySelector(this.errMsgClass)) this.addErrorMessage(arrGrp[0]);
            }
        })
    }

    // helper method being used for Form Validation to prevent form being submitted
    preventFormSumbmission(event) {
        event.preventDefault();
    }

    // helper method being used in Form Validation method
    addErrorMessage(field) {
        let fieldtype = field.type;
        let errMsg = document.createElement("p");
        errMsg.classList.add("error-msg");
        if (field.value === "0" || fieldtype === "radio" || fieldtype === "checkbox") {
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

        if (fieldtype === "radio" || fieldtype === "checkbox") {
            field.parentNode.parentNode.appendChild(errMsg);
        } else {
            field.parentNode.appendChild(errMsg);
        }

    }
}