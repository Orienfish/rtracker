// translate the tobii x,y coordinate system to the system on a webpage

px_ratio = window.devicePixelRatio; // the pixel ratio from the physical device to the css pixels
let device_w = screen.width;        // the local device resolution
let device_h = screen.height;

// TODO: verify that this code does its job
// source: https://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}


// find the x,y coordinates relative to webpage content
// return neg values - not looking at any webpage content
function translate_xy (tobii_x, tobii_y) {
  var browser_top = device_h*px_ratio - getHeight()
  var browser_side = device_w*px_ratio - getWidth()
  return function () {
    return { x : browser_side - tobii_x, y : browser_top - tobii_y };
  }
}

console.log('Width :  ' +  getWidth() );
console.log('Height : ' + getHeight() );
console.log('Ratio : ' + px_ratio );
console.log('Local width : ' + device_w*px_ratio);
console.log('Local hight : ' + device_h*px_ratio);
