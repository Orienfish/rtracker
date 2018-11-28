// provide centralized interface for tracking the current line that the reader is on
// TODO: only provide the tracking on elements that contain the class hl

// NOTE: THIS COULD BE PROBLEMATIC IF WE ARE TRANSFERRING TO DIFFERENT PARAGRAPHS 
let prev_line_i = null // keep track of the previous line that was highlighted

/** NOTE - MAKE THIS WORK FOR NON SEQUENTIAL LINE TRANSITIONS
 * Perform the blurring and highlighting for a given line in a grouping of elements. Removes Highlighting 
 * from the previous highlighted line.
 * @param {*} e_list - html elements containing text data - this should be the breakdown of line content 
 * @param {*} i - the index of the
 */
function track_index (e_list, i) {

      // unblur below
      if (i < e_list.length-1) {
        unblur(e_list[i+1]);
      }

      // unblur above
      if (i) {
        unblur(e_list[i-1]);
      }

      // top blur block
      if (i) {
        for (let blur_index = 0; blur_index < i-1; blur_index++) {
          blur(e_list[blur_index]);
        }
      }

      // bottom blur block
      if (i < e_list.length + 2) {
        for (let blur_index = e_list.length - 1; blur_index > i+1; blur_index--) {
          blur(e_list[blur_index]);
        }
      }

      // highlight the next block and keep track of the previous highlight
      highlight_next(e_list, i, prev_line_i)
      prev_line_i = i;
}

/**
 * Get the position of an element in a given p
 * @param {e} - DOM element which we want to find the line number of 
 * @param {others} - HTML Collection of the other existing elements
 * @return the index of the element in the parent, or null if does not exist in parent
 */
function  get_line_pos (e, others) {
  let lines = e.parentElement.children
  for (let index = 0; index < lines.length; index++) {
    if(lines[index].innerText == e.innerText)
    return index;
  }
  return null;
}

/**
 * perform the styling on a given line inside a p element
 * @param {e} - element that we want to track for the reader 
 */
function track (e) {
  // check to see if the child element is a line -- otherwise do not do anything
  if (e.className == 'hl') {
    all_lines = e.parentElement.children;
    track_index(all_lines, get_line_pos(e, all_lines));
  }
}