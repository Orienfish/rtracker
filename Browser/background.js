browser.menus.create({
    id: "syllables",
    title: "Look up syllables",
    contexts: ["selection"]
});

browser.menus.create({
    id: "calibrate",
    title: "Calibrate w/ Tobii",
    contexts: ["all"]
});

browser.menus.onClicked.addListener(contextMenuAction);

function contextMenuAction(info, tab){

    if (info.menuItemId == "syllables") {
      const word = info.selectionText.replace(/\s+/, "");
      // return stored info or look it up
      GetWordFromDict(word, syllableCallback);

    } else if (info.menuItemId == 'calibrate') {
        portFromCS.postMessage({'mode':'calibrate'});
    } 
}

function syllableCallback(value){
    portFromCS.postMessage(value);
}