
export class Captcha {
  constructor({cssRelativePath, wrapperSelector, captchaSelector, captchaCanvasID, relodBtnSelector, inputFieldSelector, checkBtnSelector, statusTxtSelector, captchaSuccessMsg, captchaFailedMsg}) {
   this.cssPath = cssRelativePath;
   this.wrapper = document.querySelector(wrapperSelector);
   this.captcha = document.querySelector(captchaSelector);
   this.canvasID = captchaCanvasID;
   this.reloadBtn = document.querySelector(relodBtnSelector);
   this.inputField = document.querySelector(inputFieldSelector);
   this.checkBtn = document.querySelector(checkBtnSelector);
   this.statusTxt = document.querySelector(statusTxtSelector);
   this.successMsg = captchaSuccessMsg;
   this.failedMsg = captchaFailedMsg;
   //storing all captcha characters in array
   this.allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
   'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
   'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
   't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
   this.currentCaptcha = []
  }

 initCaptcha() {
  if (this.captcha === null) return
  // adds the css link to head 
   this.addCSSLink();

   /* Alternate way with setInterval

   // let hiddenId = setInterval(() => {
   //   let emptyInput = Array.from(this.captcha.closest("form").querySelectorAll("input, select")).filter(input => {
   //      if(input.value === "" || input.value === 0) return input
   //   })
   //   console.log(emptyInput)
   //   if (emptyInput.length <= 1) {
   //     clearInterval(hiddenId);
   //     this.wrapper.style.display = "block";
   //   }
   // }, 1000) 
   */
   

  // takes all input elements to check if they are filled - based on that condition displays captcha
   let allElems = Array.from(this.captcha.closest("form").querySelectorAll("input, select"));

   // return empty input array 
   let getEmptyInputArr = () => {
     let emptyInputArr = allElems.filter(input => {
       if(input.value === "" || input.value === 0) return input
    })
    return emptyInputArr
   } 

   allElems.forEach(elm => {
     // in case of captcha input field we return;
     if (elm === this.inputField) return
     // on every input change- we check how many input fields are empty and based on that load captcha elem
     elm.addEventListener("change", () => {
         let emptyInputArray = getEmptyInputArr();
         //console.log(emptyInputArray.length <= 2)
         if (emptyInputArray.length <= 2) {
           this.wrapper.style.display = "block";
           
           requestAnimationFrame(() => {this.fadeInElem(this.wrapper)})
           setTimeout(() => {
            if (this.captcha.querySelector("canvas")) return
             this.generateCaptcha();
           }, 100)
           
         }
      })
  })

   this.checkBtn.addEventListener("click", e =>{
     e.preventDefault(); //preventing button from it's default behaviour
     //adding space after each character of user entered values because I've added spaces while generating captcha
     let inputVal = this.inputField.value.split('').join(' ');
     this.statusTxt.style.display = "block";
     // console.log(inputVal.trim(), this.currentCaptcha.join(' '))
     this.statusTxt.innerText = (inputVal.trim() === this.currentCaptcha.join(' ')) ? this.successMsg : this.failedMsg;
     
   });

   this.reloadBtn.addEventListener("click", ()=>{
     this.removeContent();
     this.generateCaptcha();
   });
 }

 generateCaptcha() {
   this.currentCaptcha = [];
   for (let i = 0; i < 6; i++) { //getting 6 random characters from the array
     let randomCharacter = this.allCharacters[Math.floor(Math.random() * this.allCharacters.length)];
     this.currentCaptcha.push(randomCharacter);
     //this.captcha.innerText += ` ${randomCharacter}`; //passing 6 random characters inside captcha innerText
   }
   this.renderCaptchaCanvas(this.currentCaptcha.join(" "))
 }

 renderCaptchaCanvas(randomchar) {
  // creating and adding
   let canvas = document.createElement("canvas");
   canvas.setAttribute("id", this.canvasID);
   this.captcha.appendChild(canvas);

   // wrapper width and height applied to canvas to avoid overflow
   let {width, height} = this.captcha.getBoundingClientRect();
   canvas.width = width;
   canvas.height = height;

   const ctx = canvas.getContext("2d");

   
   const x = width / 9;
   const y = height / 2 + height / 6;
   const fontSize = height / 2.2;
   //console.log(width, height, x, y, fontSize);

   // noise background fill
  //  for (let x = 0; x < width; x++) {
  //   for (let y = 0; y < height; y++) {
  //     const randomValue = Math.floor(Math.random() * 256);
  //     ctx.fillStyle = `rgba(${randomValue}, ${randomValue}, ${randomValue}, 1)`;
  //     ctx.fillRect(x, y, 1, 1);
  //   }
  // }

  // font styles
  //  ctx.filter = "blur(1px)";
   ctx.font = `bold ${fontSize}px serif`;
   ctx.fillStyle = "grey";
   ctx.fillText(randomchar, x, y);
 }
 
 // resets captcha
 removeContent(){
   this.inputField.value = "";
   this.captcha.querySelector("canvas").remove();
   this.statusTxt.style.display = "none";
  }

 addCSSLink() {
   let head = document.getElementsByTagName("head")[0];
   let link = document.createElement("link");
   link.setAttribute("rel", "stylesheet");
   link.setAttribute("href", this.cssPath);
   head.appendChild(link);
 }

 // helper method for smooth anime
 fadeInElem(element) {
   let opacity = 0;
   element.style.opacity = 0;
   requestAnimationFrame(animate); 

   function animate() {
     opacity += 0.25; 
     element.style.opacity = opacity; 
 
     if (opacity < 1) {
       requestAnimationFrame(animate);
     }
   }
}
}