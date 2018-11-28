// TODO: make the concrete variables in the websocket executable and tobii script work

/** 
 * apply styling to specific line in element
 * @param {*} e - element containing lines to read
 * @param {*} i - the current line to read
 */
function read_line (e, i) {
  spans = p_test.getElementsByTagName("span");
}

/** 
 * applying the styling in a loop using the timer
 * @param {*} e - element containing lines to read
 * @param {*} i - the current line to read
 */
function read (e) {
  setInterval(change_lines(e), 1000)
}


// set up the listener from the background script
var myPort = browser.runtime.connect({name:"port-from-cs"});
myPort.postMessage({greeting: "hello from content script"});

myPort.onMessage.addListener(function(m) {
  console.log("In content script, received message from background script: ");
  console.log(m);
});

document.body.addEventListener("click", function() {
  myPort.postMessage({greeting: "they clicked the page!"});
});

/**
 * TODO: instead of having this work by these events. Have it work by mouse_click then with the tobii reader. 
 * @param {*} e - element containing spans that will be called by the timer to update the highlighting
 * @return a function that changes span styling and innerHTML
 */
function change_lines (e) {
  let i = 0;
  let hl_spans = e.getElementsByClassName('hl');

  return function () {
    // go through each of the lines
    if ( i < hl_spans.length) {

      // perform highlighting and blurring for a given line
      track(hl_spans, i);

      i++;
    }
  }
}

// testing getting elements with mouse click
document.addEventListener("click", function(e){
    let mouse_x = e.clientX;               // Get the horizontal coordinate
    let mouse_y = e.clientY;               // Get the vertical coordinate
    let line = document.elementFromPoint(mouse_x,mouse_y); //get the line using mouse coordinates
    track(line)

});