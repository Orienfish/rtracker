// NOTE: instead of applying the blurring on a line by line basis - may have to do it in groups of lines for speed
// or I could pregenerate all the different possible groupings for a paragraph - this seems to be the fastest
// grouping does not work as this intersects tags of the same type which will cause errors. 
// need to implement blurring using lines

function blur(e) {
  Object.assign(e.style,{"color" : "transparent", "text-shadow" : "0 0 5px rgba(0,0,0,0.5)"});
}

function blur_next(next, prev=0) {
  if (next) {
    blur(next);
  }
  if (prev) {
    unblur(prev);
  }
}

function unblur(e) {
  Object.assign(e.style,{"color" : "initial", "text-shadow" : "none"});
}