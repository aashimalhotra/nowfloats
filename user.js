/*jslint devel: true */
/*jslint browser: true*/
"use strict";
function showAlert(message) {
    "use strict";
    document.querySelector("[data-alert]").style.display = "inline-block";
    document.querySelector("[data-alertMessage]").innerHTML = message;
}

function validateEmail(email) {
    "use strict";
    if (/^\w+([\-.]?\w+)*@\w+([\-.]?\w+)*(.\w{2,3})+$/.test(email)) {
        return true;
    }
    showAlert("You have entered an invalid email address!");
    return false;
}

function hideAlert() {
    "use strict";
    document.querySelector("[data-alert]").style.display = "none";
}

function validateGender(gender) {
    "use strict";
    if (gender.toLowerCase() === "female" || gender.toLowerCase() === "male") {
        return true;
    }
    showAlert("Please enter valid Gender(Male/Female)");
    return false;
}

function validatePhone(phone) {
    "use strict";
    if (/^\(?([0-9]{3})\)?[\-. ]?([0-9]{3})[\-. ]?([0-9]{4})$/.test(phone)) {
        return true;
    }
    showAlert("You have entered an invalid phone number!");
    return false;
}

function addRow(name_data, email_data, gender_data, phone_data) {
    "use strict";
    var name = document.createElement("h1");
    name.innerHTML = name_data;
    var email = document.createElement("p");
    email.innerHTML = email_data;
    var gender = document.createElement("p");
    gender.innerHTML = gender_data;
    var phone = document.createElement("p");
    phone.innerHTML = phone_data;
    var card = document.createElement("div");
    card.className = "card";
    card.appendChild(name);
    card.appendChild(email);
    card.appendChild(gender);
    card.appendChild(phone);
    var row = document.createElement("tr");
    row.appendChild(card);
    document.querySelector("[data-table]").appendChild(row);

}

function filter() {
    "use strict";
    var filterData;
    var cards;
    var name;
    var elements;
    var i;
    var j;
    var count;
    count = 0;
    filterData = document.querySelector("[data-searchTerm]").value.toLowerCase();
    document.querySelector("[data-details]").style.display = "none";
    cards = document.getElementsByTagName("tr");
    for (i = 0; i < cards.length; i += 1) {
        name = cards[i].getElementsByTagName("h1")[0];
        if (name) {
            if (name.innerHTML.toLowerCase().indexOf(filterData) > -1) {
                cards[i].style.display = "";
                count += 1;
                continue;
            } else {
                cards[i].style.display = "none";
            }
        }
        elements = cards[i].getElementsByTagName("p");
        for (j = 0; j < elements.length; j += 1) {
            if (elements[j].innerHTML.toLowerCase().indexOf(filterData) > -1) {
                cards[i].style.display = "";
                count += 1;
                break;
            }
            else {
                cards[i].display = "none";
            }
        }
    }
    if (count === 0) {
        alert("no records found");
        document.querySelector("[data-details]").style.display = "inline";
    }
}

function addRecord() {
    "use strict";
    var name;
    var email;
    var gender;
    var newEntry;
    var phone;
    name = document.querySelector("[data-name]").value;
    email = document.querySelector("[data-email]").value;
    gender = document.querySelector("[data-gender]").value;
    phone = document.querySelector("[data-phone]").value;
    if (!validateEmail(email)) {
        return false;
    }
    if (!validateGender(gender)) {
        return false;
    }
    if (!validatePhone(phone)) {
        return false;
    }
    newEntry = {"name": name, "email": email, "gender": gender, "phone": phone};
    data.push(newEntry);
    document.querySelector("[data-details]").style.display = "none";
    document.querySelector("[data-searchTerm]").value = "";
    addRow(name, email, gender, phone);
    if (localStorage.newData) {
        var current = JSON.parse(localStorage.newData);
        current.push(newEntry);
        localStorage.setItem("newData", JSON.stringify(current));
    } else {
        var newD = [];
        newD.push(newEntry);
        localStorage.setItem("newData", JSON.stringify(newD));
    }
    filter();
}

window.onload = function () {
    "use strict";
    var i;
    if (localStorage.getItem("newData")) {
        for (i = 0; i < JSON.parse(localStorage.newData).length; i += 1) {
            data.push(JSON.parse(localStorage.newData)[i]);
        }
    }
    for (i = 0; i < data.length; i += 1) {
        addRow(data[i].name, data[i].email, data[i].gender, data[i].phone);
    }
}