// the purpose of this file is to perform the highlighting functionalities
// right now this is just a static representation - there is no algorithm performing any functionality

// reformat script is run first - unclear will design this better

// highlight the first paragraph
let p_zero = ps[0];


function highlight_element(e) {
  let inner_prev = e.innerHTML;
  e.innerHTML = "<mark>" + inner_prev + "</mark>";;
}

function remove_inner_tags(e) {
  e.innerHTML = e.innerText;
}

function highlight_next(next, prev = 0) {
      // perform the highlighting of the text
      highlight_element(next);
      // perform the removal of highlighting
      if (prev) {
        console.log('removing span highlighting');
        remove_inner_tags(prev);
      }

}

highlight_element(p_zero);