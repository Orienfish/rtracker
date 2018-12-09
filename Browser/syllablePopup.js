// Add modal (and button for now) to the page
document.body.innerHTML += //'<button id="myBtn">Open Modal</button>\n' +
'<div id="myModal" class="modal">\n' + '<div class="modal-content">\n' +
'  <div class="modal-header">\n' + '    <span class="close">&times;</span>\n'+
'    <h2 id="popup_word">unsuccessful</h2>\n' + '  </div>\n' +
'  <div class="modal-body">\n' + '    <p id="popup_syllables">un * suc * cess * ful</p>\n' +
'  </div>\n' + '  <div class="full-word">\n' +
'    <h3 id="popup_definition">1. not achieving or not attended with success</h3>\n' + '  </div>\n' +
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
        console.log(m['syllablePopup']['definition']);

        // Edit the modal to display the information sent from background scripts
        editModal(m['syllablePopup']['word'], m['syllablePopup']['syllables'],
            m['syllablePopup']['pronunciation'], m['syllablePopup']['definition']);

        modal.style.display = "block";
    }
});

// TODO: add definitions if group wants to do that
function editModal(word, syllables, pronunciation, definition){
    // change the word on the modal
    let current = document.getElementById('popup_word');
    current.innerHTML = word;

    // change the syllables and pronunciations on the modal
    // TODO: MAKE EACH SYLLABLE AN INTERACTIVE BUTTON
    // TODO: ADD TEXT-TO-SPEECH FOR EACH SYLLABLE TO THAT BUTTON
    current = document.getElementById('popup_syllables');
    let str = '';
    if(syllables == undefined){
        str += 'Unable to retrieve syllables.';
    } else{
        for(let i = 0; i < syllables.length; i++){
            for(let j = 0; j < syllables[i].length; j++){
                str += syllables[i][j];
            }
            if(i < syllables.length - 1){
                str += ' * ';
            }
        }
    }
    str += '<br>';
    if(pronunciation == undefined){
        str += 'Unable to retrieve pronunciation.'
    } else{
        for(let i = 0; i < pronunciation.length; i++){
            for(let j = 0; j < pronunciation[i].length; j++){
                str += pronunciation[i][j];
            }
            if(i < pronunciation.length - 1){
                str += ' ·​ ';
            }
        }
    }
    current.innerHTML = str;

    // TODO: add definition information?
    str = '';
    current = document.getElementById('popup_definition');
    if(definition == undefined){
        str = 'Unable to retrieve definition.';
    } else{
        str += 'Definition:<br>'
        for(let i = 0; i < definition.length; i++){
            str += (i+1) + '. '
            str += definition[i];
            if(i < definition.length - 1){
                str += '<br>'
            }
        }
    }
    current.innerHTML = str;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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