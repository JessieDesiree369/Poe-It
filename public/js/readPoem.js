const prevResults = JSON.parse(localStorage.getItem("PoeItResults"));
const urlArray = (document.location.href).split("/");
const cid = +urlArray[urlArray.length-1];


let blockElement = document.getElementById("thebigone");
blockElement.hidden = false;
let tElement = document.getElementById("titleEl");
tElement.textContent = prevResults[cid].title;
let aElement = document.getElementById("authorEl");
aElement.textContent = prevResults[cid].author;
let pElement = document.getElementById("poemText");
pElement.textContent = prevResults[cid].author;