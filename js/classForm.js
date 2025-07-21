
class formMain {
    proForm (selectElm, checkboxGrp) {
        let industryOpt = [ "Technology", "Finance", "Healthcare", "Education", "Manufacturing", "Consulting", "Other"];        
        let focusAreaOpt = ["AI & Innovation", "Cybersecurity", "Strategy & Leadership", "Digital Transformation", "Change Management", "Other"]

      
        if (selectElm.tagName === "SELECT") {
            industryOpt.forEach(industry => {
                let opt = document.createElement("option");
                opt.textContent = industry;
                opt.setAttribute("value", industry);
                selectElm.appendChild(opt);
            })           
        }

        if (checkboxGrp.tagName === "DIV") {
            focusAreaOpt.forEach(focus => {
                let div = document.createElement("div");
                div.classList.add("checkbox-grp-wrap");
                let checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                let label = document.createElement("label");
                label.textContent = focus;
                label.setAttribute("for", focus.toLowerCase().replace(/\s+/g,""));
                checkBox.setAttribute("id", focus.toLowerCase().replace(/\s+/g,""));
                checkboxGrp.appendChild(div);
                div.appendChild(checkBox);
                div.appendChild(label);
            })
        }



    }
}

export const formClass = new formMain;