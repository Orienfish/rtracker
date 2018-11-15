// test website: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/What_next_

document.body.style.border = "5px solid red";

let id_generator = 0;

let ps = document.getElementsByTagName("p");
let p_test = ps[1];

// hide most of the elements
/*for (let i = 2; i < ps.length; i++) {
  ps[i].style.display = "none";
}*/

// generate the ids for each line in p breakdowns
function gen_id () {
  return "line_" + id_generator++;
}

// TODO: create function to sep the lines of each function and return an array
function get_lines() {
    let lines = [
        "You don't need any special development or build environment tools to create browser", 
        "extensions: It's entirely possible to create great browser extensions with no more than a text",
        "editor. However, you may have been developing for the web and have a set of tools and an",
        "environment you want to reuse. If you do, you need to be aware of a couple of things. empty stuff",
        "You don't need any special development or build environment tools to create browser", 
        "extensions: It's entirely possible to create great browser extensions with no more than a text",
        "editor. However, you may have been developing for the web and have a set of tools and an",
        "environment you want to reuse. If you do, you need to be aware of a couple of things.",
    ]
    return lines
}


/** NOTE: Include unique id's for the blurring groupings
 * Embed tags for spans related to the different highlighting sections and blurring sections
 * @param {*} p - paragraph elements that will now contain embedded spans 
 */
function span_paragraphs (p) {
  let i;

  lines = get_lines();

  // apply the groupings for highlighting
  for (i = 0; i < lines.length; i++) {
    lines[i] = "<span class=hl>" + lines[i] + "</span>"; 
  }

  // top blur block
  for (i = 3; i < lines.length; i++) {
    lines[0] = "<span class=blur_top>" + lines[0];
    lines[i-2] = lines[i-2] + "</span>"; 
  }

  // bottom blur block - using div otherwise closing tags mess up
  for (i = 0; i < lines.length - 2; i++) {
    lines[i+2] = "<div class=blur_bottom>" + lines[i+2];
    lines[lines.length-1] = lines[lines.length-1] + "</div>"; 
  }

  p.innerHTML = lines.join(" ");
}


// generate the static example
span_paragraphs(p_test);
