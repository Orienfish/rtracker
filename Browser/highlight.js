// the purpose of this file is to perform the highlighting functionalities
// right now this is just a static representation - there is no algorithm performing any functionality

// reformat script is run first - unclear will design this better

// highlight the first paragraph
let p_zero = ps[0];

let inner_prev = p_zero.innerHTML;
p_zero.innerHTML = "<mark>" + inner_prev + "</mark>";;