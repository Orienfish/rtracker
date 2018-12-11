var portFromCS; // the port used to communicate to the content scripts

var x; // TOBII variables
var y;
var tobii_coords;
var evt_counter = 0;

function connected(p) {
    portFromCS = p;
    portFromCS.postMessage({ greeting: "hi there content script!" });
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

// -----------------------------------------------------------------------
// TODO: will this send a message to the current browser tab?
// handle this when the browserAction is clicked
function connectToTab(tabs) {
    if (tabs.length > 0) {
        var examplePort = browser.tabs.connect(
            tabs[0].id,
            { name: "tabs-connect-example" }
        );
        examplePort.postMessage({ greeting: "Hi from background script" });
    }
}

function onError(error) {
    console.log(`Error: ${error}`);
}

browser.browserAction.onClicked.addListener(function () {
    var gettingActive = browser.tabs.query({
        currentWindow: true, active: true
    });
    gettingActive.then(connectToTab, onError);
});

// current section that I am working on
// -----------------------------------------------------------------------

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener(function () {
    portFromCS.postMessage({ greeting: "they clicked the button!" });
});