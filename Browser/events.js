// TODO: make the concrete variables in the websocket executable and tobii script work

// the css pixels are generally bigger than the physical pixels
px_ratio = window.devicePixelRatio; // the pixel ratio from the physical device to the css pixels

var tobii_offset_x = 0; // the difference between the tobii and browser coord system
var tobii_offset_y = 0;

var tobii_x; //raw tobii coordinates
var tobii_y;

var browser_x; // raw browser coordinates after the translation
var browser_y;

var line;

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

  tobii_x = m.x
  tobii_y = m.y

  // vertical mode

  // horizontal mode

  // have to wait for calibration
  if (tobii_offset_x || tobii_offset_y) {
    browser_x = (tobii_x/px_ratio) - tobii_offset_x
    browser_y = (tobii_y/px_ratio) - tobii_offset_y
    line = document.elementFromPoint(browser_x, browser_y); //get the line using mouse coordinates
  } else {
    line = document.elementFromPoint(m.x, m.y); //get the line using mouse coordinates
  }
    track(line)
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

// create calibration modes for the different reading modes
// testing getting elements with mouse click
// using this to calibrate
document.addEventListener("click", function(e){

    // calibration lol
    let mouse_x = e.clientX;               // Get the horizontal coordinate
    let mouse_y = e.clientY;               // Get the vertical coordinate

    // client x should be smaller than tobii y
    if (myPort) {

      tobii_offset_x = (tobii_x/px_ratio)- mouse_x
      tobii_offset_y = (tobii_y/px_ratio) - mouse_y

      console.log(tobii_x, mouse_x, tobii_offset_x);
      console.log(tobii_y, mouse_y, tobii_offset_y);
    }

    let line = document.elementFromPoint(mouse_x,mouse_y); //get the line using mouse coordinates
    track(line)
});