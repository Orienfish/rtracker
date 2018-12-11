browser.menus.create({
    id: "syllables",
    title: "Look up syllables",
    contexts: ["selection"]
});

browser.menus.onClicked.addListener(contextMenuAction);
browser.runtime.onConnect.addListener(connectPopup);

function connectPopup(p) {
    portFromCS = p;
    console.log('background port opened');
}


function contextMenuAction(info, tab){
    if (info.menuItemId == "syllables") {
      const word = info.selectionText.replace(/\s+/, "");
      
      // return stored info or look it up
      GetWordFromDict(word, syllableCallback);
    }
}

function syllableCallback(value){
    portFromCS.postMessage(value);
}