// provide centralized interface for tracking the current line that the reader is on

/**
 * Perform the blurring and highlighting for a given line in a grouping of elements
 * @param {*} e_list - html elements containing text data - this should be the breakdown of line content 
 * @param {*} i - the index of the
 */
function track (e_list, i) {
      // init blur bottom
      if (i == 0) {
        for (j = 2 ; j < e_list.length ; j++) {
          blur(e_list[j])
        }
      }

      // top blur block
      if (i > 1) {
        blur(e_list[i-2]);
      }

      // bottom blur block
      if (i < e_list.length-1) {
        unblur(e_list[i+1]);
      }

      highlight_next(e_list[i], e_list[i-1])
}
