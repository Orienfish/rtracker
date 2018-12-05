// Add modal (and button for now) to the page
document.body.innerHTML += //'<button id="myBtn">Open Modal</button>\n' +
'<div id="myModal" class="modal">\n' + '<div class="modal-content">\n' +
'  <div class="modal-header">\n' + '    <span class="close">&times;</span>\n'+
'    <h2>unsuccessful</h2>\n' + '  </div>\n' +
'  <div class="modal-body">\n' + '    <p>un * suc * cess * ful</p>\n' +
'  </div>\n' + '  <div class="full-word">\n' +
'    <h3>1. not achieving or not attended with success</h3>\n' + '  </div>\n' +
'</div>\n' + '</div>\n';

//browser.body.innerHTML += '<p id="WordToSearch"></p>';

// Get the modal
var modal = document.getElementById('myModal');

var syllablePort = browser.runtime.connect({name:"port-from-syllable"});
syllablePort.onMessage.addListener(function(m) {
    if ('syllablePopup' in m){
        console.log('opening modal');
        console.log('info from syllablePopup.js');
        console.log(m['syllablePopup']['word']);
        console.log(m['syllablePopup']['syllables']);
        console.log(m['syllablePopup']['pronunciation']);
        //TODO: add code to change the elements of the modal
        modal.style.display = "block";
    }
  });

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
/*btn.onclick = function() {
    modal.style.display = "block";
}*/

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    console.log('closing modal from <span> click');
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        console.log('closing modal from clicking outside it');
        modal.style.display = "none";
    }
}
/*document.addEventListener("click", function(e) {
    if (!e.target.classList.contains("page-choice")) {
      return;
    }
  
    var chosenPage = "https://" + e.target.textContent;
    browser.tabs.create({
      url: chosenPage
    });
  
  });*/