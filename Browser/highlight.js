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
  e.innerHTML = e.innerText+"<br>";
}

function highlight_next(e_list, next, prev = null) {
      // perform the highlighting of the text
      highlight_element(e_list[next]);
      // perform the removal of highlighting
      if (prev != null) {
        remove_inner_tags(e_list[prev]);
      }
}