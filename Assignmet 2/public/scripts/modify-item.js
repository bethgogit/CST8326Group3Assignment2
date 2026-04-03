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
    console.log(option);
    return option.length > 0;
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
let imageError = document.getElementById("invalid-img");
imageDropdown.addEventListener("change", (event) => {
    imageURL.value = "";
    displayImage.setAttribute("src","/img/"+imageDropdown.value+".png");
    imageError.hidden = validatePredefinedImage(imageDropdown.value);
});
imageURL.addEventListener("change", (event) => {
    imageDropdown.value = "";
    let isValid = validateImageUrl(imageURL.value);
    displayImage.setAttribute("src",isValid ? imageURL.value : "");
    imageError.hidden = isValid;
});

let itemName = document.getElementById("modify-item-name");
let itemNameError = document.getElementById("invalid-name");
itemName.addEventListener("change", (event) => {
    itemNameError.hidden = validateName(itemName.value);
});

let itemDesc = document.getElementById("modify-item-description");
let itemDescError = document.getElementById("invalid-desc");
itemDesc.addEventListener("input", (event) => {
    itemDescError.hidden = validateDescription(itemDesc.value);
});

function getFormItemObject() {
    let toppings = [];
    for (item of document.querySelectorAll("#modify-item-toppings>input")) {
        if (item.checked) toppings.push(item.name);
    }
    let imgSrc = validatePredefinedImage(imageDropdown.value) ? "/img/"+imageDropdown.value+".png" : imageURL.value;
    return {
        imgSrc: imgSrc,
        name: itemName.value,
        description: itemDesc.value,
        size: document.getElementById("modify-item-size").value,
        crust: document.getElementById("modify-item-crust").value,
        toppings: toppings
    }
}

document.getElementById("save").addEventListener("click", async (event) => {
    imageError.hidden = validateImageUrl(imageURL.value) || validatePredefinedImage(imageDropdown.value);
    itemNameError.hidden = validateName(itemName.value);
    itemDescError.hidden = validateDescription(itemDesc.value);
    //I don't want the default form submission to occur in either case.
    event.preventDefault();
    if ((imageError.hidden && itemNameError.hidden && itemDescError.hidden)) {
        let msg = document.getElementById("modify-item-result");
        msg.textContent = "Talking to the server...";

        let response = await fetch(itemName.disabled ?  "/modify" : "/save",{
            method: itemName.disabled ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getFormItemObject())
        });

        if (response.ok) {
            let operation = itemName.disabled ? "updated" : "saved";
            msg.textContent = `Item ${operation} successfully!`;
            itemName.disabled = true;
        } else {
            let result = await response.json();
            msg.textContent = "An error occurred! "+result.message;
        }
        console.log("response is "+response);
    }
});