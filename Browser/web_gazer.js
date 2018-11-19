webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    var xprediction = data.x; //these x coordinates are relative to the viewport 
    var yprediction = data.y; //these y coordinates are relative to the viewport
    console.log('xprediction: ' + xprediction); //elapsed time is based on time since begin was called
    console.log('yprediction: ' + yprediction); //elapsed time is based on time since begin was called

    // on mouse click start to track the given lines
    // another mouse click will toggle the behavior off

}).begin();