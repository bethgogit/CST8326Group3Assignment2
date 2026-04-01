function validateImageUrl(url) {
    /*
    Used code snippet from here:
    https://www.geeksforgeeks.org/javascript/how-to-validate-url-using-regular-expression-in-javascript/
    */
   try {
    new URL(url);
   } catch (e) {
    return false;
   }
   return url.match(/.*\.(jpg|png|webp|gif)/);
}

function validatePredefinedImage(option) {
    return option != "";
}

function validateName(name) {
    return name.length > 0 && name.length < 64;
}

function validateDescription(desc) {
    return desc.length > 0 && desc.length < 400;
}

let imageDropdown = document.getElementById("modify-item-image-dropdown");
let imageURL = document.getElementById("modify-item-image-url");
let displayImage = document.querySelector("#modify-item-image>img");
imageDropdown.addEventListener("change", (event) => {
    imageURL.value = "";
    displayImage.setAttribute("src",imageDropdown.value);
});
imageURL.addEventListener("change", (event) => {
    imageDropdown.value = "";
    let isValid = validateImageUrl(imageURL.value);
    displayImage.setAttribute("src",isValid ? imageURL.value : "");
});

document.getElementById("save").addEventListener("click", (event) => {
    let submissionValid = true;

    let predefinedValid = validatePredefinedImage(imageDropdown.value);
    let urlValid = validateImageUrl(imageURL.value);
    if (!predefinedValid && !urlValid) {
        submissionValid = false;
    }

    if (!validateName(document.getElementById("modify-item-name").value)) {
        submissionValid = false;
    }

    if (!validateDescription(document.getElementById("modify-item-description").value)) {
        submissionValid = false;
    }

    if (!submissionValid) {
        event.preventDefault();
    }
});