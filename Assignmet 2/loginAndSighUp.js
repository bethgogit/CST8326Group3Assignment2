let userEmail = document.querySelector("#ema");
let btnLogin = document.getElementById("login");
let btnSignUp = document.getElementById("signUp");
let passErr = document.getElementById("passError");

function pError(message){
    passErr.textContent = message;
}

function validateEmail(event){
    let emailLabel = document.getElementById("lEma");
    let regexp = /\S+@\S+\.\S{2,3}/;

    if(userEmail.value.trim().length === 0){
        event.preventDefault();
        emailLabel.style.color = "red";
        userEmail.style.borderColor = "red";
        userEmail.setAttribute("placeholder", "Please Enter Email Address");
        
        console.log("this runs");
    }
    else if(!regexp.test(userEmail.value)){
        event.preventDefault();
        emailLabel.style.color = "red";
        userEmail.value = "";
        userEmail.setAttribute("placeholder", "Please Enter a Valid Email Address");
    }
}
function validatePassword(event){
    let pass1 = document.querySelector("#passwd");
    let pass2 = document.querySelector("#rePass");
    let passLabel = document.querySelectorAll(".lPass");

    if(pass1.value.length === 0){
       event.preventDefault();
       passLabel.forEach(label => {label.style.color = "red";})
       pass1.style.borderColor = "red";
       pass2.style.borderColor = "red";
    }
      else if(pass1.value.length < 7){
        event.preventDefault();
        passLabel.forEach(label => {label.style.color = "red";});
        pError("Password must be at lest 7 characters");
        
    }
}
function validateLoginPassword(event){
    let pass = document.querySelector("#passwd");
    let passLabel = document.querySelectorAll(".lPass");

    if(pass.value.length === 0){
       event.preventDefault();
       passLabel.forEach(label => {label.style.color = "red";});
       pass.style.borderColor = "red";
    }
}
function validateName(event){
    let fName = document.querySelector("#firstName");
    let lName = document.querySelector("#lastName");
    let labelFN = document.getElementById("fName");
    let labelLN = document.getElementById("lName");

    if(fName.value.length === 0){
        event.preventDefault();
        labelFN.style.color = "red";
        fName.style.borderColor = "red";
    }
    if(lName.value.length === 0){
        event.preventDefault();
        labelLN.style.color = "red";
        lName.style.borderColor = "red";
    }
}
if(btnLogin){
    btnLogin.addEventListener("click", validateEmail);
    btnLogin.addEventListener("click", validateLoginPassword);
}
if(btnSignUp){
btnSignUp.addEventListener("click", validateEmail);
btnSignUp.addEventListener("click", validatePassword);
btnSignUp.addEventListener("click", validateName);
}