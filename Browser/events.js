/** TODO: complete this
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

/**
 * 
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

read(p_test);

