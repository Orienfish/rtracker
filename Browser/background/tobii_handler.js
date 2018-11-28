// TODO: change this from all to just the tab space


var portFromCS;

function connected(p) {
  portFromCS = p;
  portFromCS.postMessage({greeting: "hi there content script!"});
  portFromCS.onMessage.addListener(function(m) {
    console.log(m.greeting);
  });

  // create the websocket
  var wsImpl = window.WebSocket || window.MozWebSocket;
  window.ws = new wsImpl('ws://localhost:8181/');

  // when the connection is established, this method is called
  ws.onopen = function () {
      portFromCS.postMessage("connection to websocket started");
  };

  // when the connection is closed, this method is called
  ws.onclose = function () {
      portFromCS.postMessage("connection to websocket closed");
  }
}

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener(function() {
  portFromCS.postMessage({greeting: "they clicked the button!"});
});


/*port.onMessage.addListener(function(msg) {
  if (msg.question == "Who's there?")
    port.postMessage({answer: "Madame"});
  else if (msg.question == "Madame who?")
    port.postMessage({answer: "Madame... Bovary"});
});*/











// create the websocket content and initialize 
/*var start = function () {
      var inc = document.getElementById('incomming');
      var form = document.getElementById('sendForm');
      var input = document.getElementById('sendText');
      var x;
      var y;
      var tobii_coords;

      inc.innerHTML += "connecting to server ..<br/>";

      // create a new websocket and connect

      // when data is comming from the server, this metod is called
      ws.onmessage = function (evt) {
          // parse the data, then call the tracking method
          setTimeout(function () {
                  if (newState == -1) {
                      alert('tobii streaming has stopped');
                  }
              }, 1000);
          tobii_coords = evt.data.split(',');
          x = tobii_coords[0];
          y = tobii_coords[1];
          //console.log(x, y);
          let line = document.elementFromPoint(x,y); //get the line using mouse coordinates
          console.log(line)
          inc.innerHTML = evt.data + '<br/>';
      };


      form.addEventListener('submit', function(e){
          e.preventDefault();
          var val = input.value;
          ws.send(val);
          input.value = "";
      });
  }
window.onload = start;*/

// figure out how to sent that content to the events page 

// create the necessary permissions
