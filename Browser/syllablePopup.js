// Add modal (and button for now) to the page
document.body.innerHTML += '<button id="myBtn">Open Modal</button>\n' +
'<div id="myModal" class="modal">\n' + '<div class="modal-content">\n' +
'  <div class="modal-header">\n' + '    <span class="close">&times;</span>\n'+
'    <h2>Syllable Breakdown</h2>\n' + '  </div>\n' +
'  <div class="modal-body">\n' + '    <p>Put syllables here</p>\n' +
'  </div>\n' + '  <div class="full-word">\n' +
'    <h3>Put full word here??!?</h3>\n' + '  </div>\n' +
'</div>\n' + '</div>\n';

//browser.body.innerHTML += '<p id="WordToSearch"></p>';

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
document.addEventListener("click", function(e) {
    if (!e.target.classList.contains("page-choice")) {
      return;
    }
  
    var chosenPage = "https://" + e.target.textContent;
    browser.tabs.create({
      url: chosenPage
    });
  
  });