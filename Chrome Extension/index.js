"use strict";
let test = document.getElementById("test");
const inputBtn = document.getElementById("saveE");
const textInput = document.getElementById("inputE");
const linkList = document.getElementById("linkList");
const deleteBtn = document.getElementById("deleteE");
const tabBtn = document.getElementById("tabE");
let myLinks = [];
let newValue = "";
let linkLocalStorage = JSON.parse(localStorage.getItem("myLinks"));

if (linkLocalStorage) {
  myLinks = linkLocalStorage;
  render(myLinks);
}

function render(links) {
  let listItems = "";
  for (let i = 0; i < links.length; i++) {
    listItems += ` <li>
            <a target='_blank' href='${links[i]}'> ${links[i]} </a>
              </li>`;
  }
  linkList.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  if (textInput.value) {
    myLinks.push(textInput.value);
    textInput.value = "";
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    render(myLinks);
  }
});

deleteBtn.addEventListener("dblclick", function () {
  myLinks = [];
  deleteLinks();
  render(myLinks);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLinks.push(tabs[0].url);
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    render(myLinks);
  });
});

function deleteLinks() {
  localStorage.clear();
}
