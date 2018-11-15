// NOTE: instead of applying the blurring on a line by line basis - may have to do it in groups of lines for speed
// or I could pregenerate all the different possible groupings for a paragraph - this seems to be the fastest

// the purpose of this file is to blur the content on a given webpage
// right now this is just a static representation - there is no algorithm performing any functionality

// reformat script is run first - unclear will design this better

// blur the second paragraph

p_one = ps[1];

function blur_element(e) {
  Object.assign(e.style,{"color" : "transparent", "text-shadow" : "0 0 5px rgba(0,0,0,0.5)"});
}

// blur_element(p_one);

// Object.assign(p_one.style,{"color" : "transparent", "text-shadow" : "0 0 5px rgba(0,0,0,0.5)"});