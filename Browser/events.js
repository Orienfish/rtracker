// TODO: make the concrete variables in the websocket executable and tobii script work

// the css pixels are generally bigger than the physical pixels
px_ratio = window.devicePixelRatio; // the pixel ratio from the physical device to the css pixels

var tobii_offset_x = 0; // the difference between the tobii and browser coord system
var tobii_offset_y = 0;


var calibration_mode = false; // different modes
var free_gaze = true;
var smooth_reader = false;  // smooth reader variables
var start_reached = false;
var end_reached = false;
var start_px = 400;
var end_px = 1200;
var curr_pos = null;
var prev_pos = null;


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
var modal = document.getElementById('myModal');

myPort.onMessage.addListener(function(m) {

  // don't process any other messages
  if (typeof m === 'string'){
      console.log(m)

  // handle tobii highlighting
  } else if ('x' in m){
    console.log('converting tobii coords');

    console.log(m)
    tobii_x = m.x
    tobii_y = m.y

    // have to wait for calibration
    if (tobii_offset_x || tobii_offset_y) {
      browser_x = (tobii_x/px_ratio) - tobii_offset_x
      browser_y = (tobii_y/px_ratio) - tobii_offset_y

      // keep track of state updates for the smooth reader
      if (browser_x < start_px && !end_reached) {
        start_reached = true;
      }
      else if (end_px < browser_x  && start_reached) {
        end_reached = true;
      }

      line = document.elementFromPoint(browser_x, browser_y); //get the line using mouse coordinates
    } else {
      line = document.elementFromPoint(m.x, m.y); //get the line using raw coordinates
    }

    // check for either free gaze or the smooth reader
    if (free_gaze) {
      track(line)
    } else if (smooth_reader) {
      console.log('inside smooth reader mode');
      // get the index of the line
      // move to the next line if it is within one bound
      other_lines = get_others(line);
      console.log(other_lines);

      if (other_lines) {
        curr_pos = get_line_pos(line, other_lines);
        console.log('the current line pos: ' + curr_pos);
      
        // if the line to be read is below or above
        if( (prev_pos - curr_pos == -1) || (prev_pos - curr_pos == 1) || (prev_pos == null)) {
          // check that the start and end of line have been reached
          if ( (start_reached && end_reached) || prev_pos == null ) {
            console.log('updating the line tracking: ' + curr_pos);

            // allow for the tracked line to be updated
            track(line)

            // reset the state
            start_reached = false;
            end_reached = false;
            prev_pos = curr_pos;
          }
        }
      }
    }

  // handle syllable modal
  } else if ('syllablePopup' in m){
      console.log('info from syllablePopup.js');
      console.log(m['syllablePopup']['word']);
      console.log(m['syllablePopup']['syllables']);
      console.log(m['syllablePopup']['pronunciation']);
      console.log(m['syllablePopup']['definition']);

      // Edit the modal to display the information sent from background scripts
      editModal(m['syllablePopup']['word'], m['syllablePopup']['syllables'],
          m['syllablePopup']['pronunciation'], m['syllablePopup']['definition']);

      modal.style.display = "block";
  } else if ('mode' in m) {
    if (m.mode === 'calibrate') {
      calibration_mode = true;
    } else if (m.mode === 'smooth_mode') {
      smooth_reader = true;
      free_gaze = false;
    } else if (m.mode === 'free_gaze') {
      smooth_reader = false;
      free_gaze = true;
    }
  }
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
  if (calibration_mode) {
    let mouse_x = e.clientX;               // Get the horizontal coordinate
    let mouse_y = e.clientY;               // Get the vertical coordinate

    // client x should be smaller than tobii y
    if (myPort) {

      tobii_offset_x = (tobii_x/px_ratio)- mouse_x
      tobii_offset_y = (tobii_y/px_ratio) - mouse_y

      console.log(tobii_x, mouse_x, tobii_offset_x);
      console.log(tobii_y, mouse_y, tobii_offset_y);
    }

    calibration_mode = false;
  }

});