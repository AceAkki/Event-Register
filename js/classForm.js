export class DynamicFormValidator {
    constructor({formElem, progressSection, progressSelector, errFieldClass, errMessageClass}) {
        this.form = formElem;
        this.sectionParent = progressSection;
        this.sectionSelector = progressSelector;
        this.errClass = errFieldClass || "error-field";
        this.errMsgClass = errMessageClass || ".error-msg";
    }

    initForm() {
        let radioCheckboxGroups = this.initializeRadioCheckboxEvents(this.form);
        this.initializeFormProgress({})
        this.form.addEventListener("submit", (event)=> {
            this.validateForm({section: this.form, bool: true, func: this.preventFormSumbmission, funcParams:event, radioArr: radioCheckboxGroups.get("radio"), checkboxArr:radioCheckboxGroups.get("checkbox")});
        })
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
                        checkBox.checked = !checkBox.checked;
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
    
    validateForm({section, bool, func, funcParams, checkboxArr, radioArr}) {
        if (typeof(func) !== "function") { console.log("func parameter should be a function"); return }
        let isValid = true;                
        const fields = section.querySelectorAll("input, select");
        fields.forEach((field) => {
            let hasError = false;
            let isEmptyOption = false;
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
            if (hasError && field.type !== "radio") {
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
              isEmptyOption = true;   
            }

            // if error exists and options are empty then runs provided function
            if (bool && hasError && isEmptyOption) {
                func(funcParams);
            }
      
        })

        if (radioArr) {
            this.validateGroupSection(radioArr, emptyOption);
        }
        
        if (checkboxArr) {
            this.validateGroupSection(checkboxArr, emptyOption);
        }
        
        // if all is valid and bool is false
        if (isValid && !bool) {
            func(funcParams);
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
        let navBtn = document.createElement("div");
        navBtn.classList.add("btn", type);
        navBtn.textContent = type;
        section.appendChild(navBtn);
        if (type.toLowerCase() === "next") {
            navBtn.addEventListener("click", ()=> {
                this.validateForm({section:section, bool: false, func:this.goToNextSection, funcParams:{btn: navBtn}, radioArr: radioCheckboxGroups.get("radio"), checkboxArr:radioCheckboxGroups.get("checkbox") })
            })
        } else if (type.toLowerCase() === "previous") {
            navBtn.addEventListener("click", ()=> {
                navBtn.parentNode.classList.add("hide");
                navBtn.parentNode.previousElementSibling.classList.remove("hide");
            })  
        }

    }
    
    // helper method being used in createNavigationBtn
    goToNextSection({btn}){
        btn.parentNode.classList.add("hide");
        btn.parentNode.nextElementSibling.classList.remove("hide");
    }

    validateGroupSection(arrayGroup, flag) {
        arrayGroup.forEach(arrGrp => {
            let checkedElem = arrGrp.find(elem => elem.hasAttribute("checked"));
            let grpParent = arrGrp[0].parentNode.parentNode;
            if (checkedElem && grpParent.classList.contains(this.errClass)) {
                grpParent.classList.remove(this.errClass);
                grpParent.querySelector(this.errMsgClass).remove();
            }

            if (!checkedElem) {
                flag = true;
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