var x,y;

document.onmousemove = function(e){
    e = e || window.event;
    x = e.clientX;
    y = e.clientY;
    //console.log(x,y);
};

function elementAtMousePosition() {
    return document.elementFromPoint(x,y);
}