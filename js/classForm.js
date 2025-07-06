
class formMain {
    proForm (selectElm) {
        let industryOpt = [ "Technology", "Finance", "Healthcare", "Education", "Manufacturing", "Consulting", "Other"];        
        let focusAreaOpt = ["AI & Innovation", "Cybersecurity", "Strategy & Leadership", "Digital Transformation", "Change Management", "Other"]

        industryOpt.forEach(industry => {
            let opt = document.createElement("option");
            opt.textContent = industry;
            opt.setAttribute("value", industry);
            selectElm.appendChild(opt);
        })

    }
}

export const formClass = new formMain;