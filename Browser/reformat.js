// TODO: figure out how to do hot reload of the extension development
document.body.style.border = "5px solid red";

let ps = document.getElementsByTagName("p");

// hide most of the elements
for (let i = 4; i < ps.length; i++) {
  ps[i].style.display = "none";
}

// document.getElementById("content").style.display = "none";

console.log("test");