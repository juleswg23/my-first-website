const button = document.getElementById("myButton");
button.addEventListener("mouseover", mouseoverButton);

function mouseoverButton() {
    alert('Don\'t click the button');
    button.removeEventListener("mouseover", mouseoverButton);
    button.addEventListener("click", alertButton);
}

function alertButton() {
    alert('Why\'d you click it?');
    button.removeEventListener("click", alertButton);
    button.addEventListener("click", alertButtonTwo);
}

function alertButtonTwo() {
    alert('Stop it!');
}

