browser.menus.create({
    id: "syllables",
    title: "Look up syllables",
    contexts: ["selection"]
});

browser.menus.onClicked.addListener(contextMenuAction);
browser.runtime.onConnect.addListener(connectPopup);

function connectPopup(p) {
    portFromCS = p;
    portFromCS.postMessage({ greeting: "hi there content script!" });
    console.log('background port opened');
    /*portFromCS.onMessage.addListener(function (m) {
        console.log(m.greeting);
    });*/
}


function contextMenuAction(info, tab){
    if (info.menuItemId == "syllables") {
      const word = info.selectionText.replace(/\s+/, "");
      AddWordToDict(word);
      let syllableInfo = getSyllables(word);
      if(syllableInfo === undefined){
          console.log('Failed to retrieve syllable content for: ' + word);
      } else{
        console.log('ARPABET test:');
        console.log(arpabetDict[word]);
        portFromCS.postMessage({
            'syllablePopup': {
                'word': word,
                'syllables': syllableInfo['syllables'],
                'pronunciation': syllableInfo['pronunciation']
            }
        });
        /*console.log('info from background.js');
        console.log(word);
        console.log(syllableInfo['syllables']);
        console.log(syllableInfo['pronunciation']);*/
      }
      
    } else {
        console.log('whoops');
    }
}