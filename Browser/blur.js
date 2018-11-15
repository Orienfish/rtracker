// NOTE: instead of applying the blurring on a line by line basis - may have to do it in groups of lines for speed
// or I could pregenerate all the different possible groupings for a paragraph - this seems to be the fastest

p_one = ps[1];

/**
 * Apply CSS stylings to blur the content on the webpage
 */
function blur_element(e) {
  Object.assign(e.style,{"color" : "transparent", "text-shadow" : "0 0 5px rgba(0,0,0,0.5)"});
}

/**
 * Blur up to the line before and the next line.
 * @param {*} next - blur  
 * @param {*} prev -
 */
function blur_next(next, prev=0) {
  // essentially, need to de blur everything except for current, prev, and next
  Object.assign(next.style,{"color" : "transparent", "text-shadow" : "0 0 5px rgba(0,0,0,0.5)"});
}

// blur_element(p_one);