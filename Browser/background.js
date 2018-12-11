// different menus for tobii
var smooth_checked = false;
var free_checked = true;

// syllable
browser.menus.create({
    id: "syllables",
    title: "Look up syllables",
    contexts: ["selection"]
});

// calibrate
browser.menus.create({
    id: "calibrate",
    title: "Calibrate w/ Tobii",
    contexts: ["all"]
});

// smooth reader
browser.menus.create({
    id: "smooth_mode",
    type: "radio",
    checked: smooth_checked, 
    title: "Tobii Smooth Reader",
    contexts: ["all"]
});

// standard gaze reader
browser.menus.create({
    id: "free_gaze",
    type: "radio",
    checked: free_checked, 
    title: "Tobii Free Gaze",
    contexts: ["all"],
});

browser.menus.onClicked.addListener(contextMenuAction);

function contextMenuAction(info, tab){

    if (info.menuItemId == "syllables") {
      const word = info.selectionText.replace(/\s+/, "");
      // return stored info or look it up
      GetWordFromDict(word, syllableCallback);
    } else if (info.menuItemId == 'calibrate') {
        portFromCS.postMessage({'mode':'calibrate'});
    } else if (info.menuItemId == 'smooth_mode') {
        smooth_checked = true;
        free_checked = false;
        portFromCS.postMessage({'mode':'smooth_mode'});
    } else if (info.menuItemId == 'free_gaze') {
        smooth_checked = false;
        free_checked = true;
        portFromCS.postMessage({'mode':'free_gaze'});
    } 
}

function syllableCallback(value){
    portFromCS.postMessage(value);
}