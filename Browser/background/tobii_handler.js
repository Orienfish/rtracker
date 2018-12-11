var portFromCS; // the port used to communicate to the content scripts

var x; // TOBII variables
var y;
var tobii_coords;
var evt_counter = 0;

function connected(p) {
    portFromCS = p;
    portFromCS.onMessage.addListener(function (m) {
        console.log(m.greeting);
    });

    // create the websocket
    var wsImpl = window.WebSocket || window.MozWebSocket;
    window.ws = new wsImpl('ws://localhost:8181/');

    ws.onopen = function () {
        portFromCS.postMessage("connection to websocket started");
    };

    ws.onclose = function () {
        portFromCS.postMessage("connection to websocket closed");
    };

    // parse the data, then call the tracking method
    ws.onmessage = function (evt) {
        evt_counter++;
        if (evt_counter == 20) {
            setTimeout(function () {
                if (newState == -1) {
                    alert();
                    portFromCS.postMessage({ "alert": "tobii streaming has stopped" });
                }
            }, 1000);
            tobii_coords = evt.data.split(',');
            raw_x = tobii_coords[0]
            raw_y = tobii_coords[1];

            // send the coordinates to the browser
            portFromCS.postMessage({ "x": raw_x, "y": raw_y });
            evt_counter = 0
        }
    };
}

browser.runtime.onConnect.addListener(connected);