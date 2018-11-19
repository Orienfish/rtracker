// test website: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/What_next_

document.body.style.border = "5px solid red";

let id_generator = 0;

let ps = document.getElementsByTagName("p");
let p_test = ps[0];

// generate the ids for each line in p breakdowns
function gen_id () {
  return "line_" + id_generator++;
}



// TODO: create function to generate tags for a given paragraph given the style

// get the lines from a file 
function get_lines(e) {
    // let lines = [
    //     "You don't need any special development or build environment tools to create browser", 
    //     "extensions: It's entirely possible to create great browser extensions with no more than a text",
    //     "editor. However, you may have been developing for the web and have a set of tools and an",
    //     "environment you want to reuse. If you do, you need to be aware of a couple of things. empty stuff",
    //     "You don't need any special development or build environment tools to create browser", 
    //     "extensions: It's entirely possible to create great browser extensions with no more than a text",
    //     "editor. However, you may have been developing for the web and have a set of tools and an",
    //     "environment you want to reuse. If you do, you need to be aware of a couple of things.",
    // ]

    return lines
}


/** NOTE: Include unique id's for the blurring groupings
 * Embed tags for spans related to the different highlighting sections and blurring sections
 * @param {*} p - paragraph elements that will now contain embedded spans 
 */
function span_paragraphs (p) {
  let i;

  lines = get_lines(p);

  // apply the groupings for highlighting
  for (i = 0; i < lines.length; i++) {
    lines[i] = "<span class=hl>" + lines[i] + "</span>"; 
  }

  p.innerHTML = lines.join(" ");
}

// generate the static example
// span_paragraphs(p_test);
